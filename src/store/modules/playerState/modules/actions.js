import Vue from "vue";
import StageData from "../../../../data/stages.json";
import LogEnum from "../../../../data/enums/LogItems.Enum";
import Tasks from "../../../../data/tasks.json";

const actions = {
  buyItem({ state, commit, dispatch }, request) {
    const totalCost = request.item.value * request.amount;

    if (state.money < totalCost) {
      Vue.prototype.$alerts.notification(
        "error",
        "Unable to buy",
        "You dont have enough money for this item"
      );
      return;
    }

    commit("subtractMoney", totalCost);
    Vue.prototype.$inventoryService.addItemToInventory({
      id: request.item.id,
      amount: request.amount,
    });
    dispatch("savePlayerData");
  },
  sellItem({ state, commit, dispatch }, request) {
    const inventoryItem = state.inventory.find((x) => x.id == request.item.id);

    if (inventoryItem == null) return;

    if (inventoryItem.amount < request.amount) {
      Vue.prototype.$alerts.notification(
        "error",
        "Unable to sell",
        "You cant sell that many"
      );
      return;
    }

    commit("addMoney", request.item.value * request.amount);
    Vue.prototype.$inventoryService.removeItemFromInventory({
      id: request.item.id,
      amount: request.amount,
    });
    dispatch("savePlayerData");
  },
  checkIfLevelUp({ state, commit, dispatch }) {
    const nextStageId = state.currentStage + 1;
    const nextStage = StageData.stages.find((stage) => stage.id == nextStageId);
    if (!nextStage) return;

    const levelUp = Vue.prototype.$inventoryService.checkUserHasItems(
      nextStage.requirements
    );
    if (!levelUp) return;

    commit("moveToNextStage");
    commit("addToLog", { text: nextStage.intro, type: LogEnum.Storyline });

    Vue.prototype.$alerts.dialog(`Unlocked ${nextStage.name}`, nextStage.intro);
    dispatch("savePlayerData");
  },
  incrementTaskStats({ state }, task) {
    const TaskInStats = state.stats.tasks.find((x) => x.id == task.id);
    if (TaskInStats != null) {
      TaskInStats.totalComplete++;
      return;
    }

    state.stats.tasks.push({ id: task.id, name: task.name, totalComplete: 1 });
  },
  giveOfflineGains({ commit, dispatch, state }) {
    if (state.activeTask == null) return;

    const task = Tasks.tasks.find((x) => x.id == state.activeTask.id);

    const offlineTime = new Date().getTime() - state.activeTask.startedTime;

    const timesTaskCompleted = Math.floor(offlineTime / task.timeToComplete);

    if (timesTaskCompleted <= 0) return;

    const offlineMoneyGain = task.moneyReward * timesTaskCompleted;

    if (offlineMoneyGain > 0) commit("addMoney", offlineMoneyGain);

    task.itemRewards.forEach((item) => {
      Vue.prototype.$inventoryService.addItemToInventory({
        id: item.id,
        amount: item.amount * timesTaskCompleted,
      });
    });

    let dialogText = `Whilst you were offline you continued to ${task.name}, you gained`;

    if (offlineMoneyGain > 0)
      dialogText =
        dialogText +
        `, ${Vue.prototype.$currenctFormatter.format(offlineMoneyGain)}`;

    if (task.itemRewards.length > 0) {
      task.itemRewards.forEach((item) => {
        const itemData = Vue.prototype.$itemService.getItem(item.id);
        dialogText =
          dialogText +
          `, ${item.amount * timesTaskCompleted} X ${itemData.name}`;
      });
    }

    Vue.prototype.$alerts.dialog("Offline gain", dialogText);

    commit("setActiveTask", null);
    dispatch("savePlayerData");
  },
  loadPlayerData({ state }) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$storage
        .get("playerData")
        .then((data) => {
          if (data == null) resolve();

          Object.assign(state, data);
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  savePlayerData({ state }) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$storage
        .set("playerData", state)
        .then(() => {
          console.log("Saved");
          resolve();
        })
        .catch(() => {
          Vue.prototype.$alerts.notification(
            "error",
            "Unable to determine task level",
            "Not sure how this has happened"
          );
          reject();
        });
    });
  },
  exportPlayerData() {
    return new Promise((resolve, reject) => {
      Vue.prototype.$storage
        .get("playerData")
        .then((data) => {
          if (data == null) {
            reject();
          }
          resolve(window.btoa(JSON.stringify(data)));
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  importPlayerData({ state }, playerData) {
    return new Promise((resolve) => {
      const data = JSON.parse(window.atob(playerData));
      Object.assign(state, data);
      resolve();
    });
  },
  resetData({ state }) {
    Vue.prototype.$storage
      .removeAll()
      .then(() => {
        state.money = 0;
        state.log = [];
        state.inventory = [];
        state.currentStage = 1;
        state.stats = {
          tasks: [],
          totalMoneyEarned: 0,
          totalMoneySpent: 0,
        };
        Vue.prototype.$alerts.notification(
          "success",
          "Reset",
          "Data has been reset"
        );
      })
      .catch(() => {
        Vue.prototype.$alerts.notification(
          "error",
          "Unable to reset data",
          "Not sure how this has happened"
        );
      });
  },
};

export default actions;
