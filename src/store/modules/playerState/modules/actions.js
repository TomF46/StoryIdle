import Vue from 'vue'
import StageData from '../../../../data/stages.json'
import LogEnum from '../../../../data/enums/LogItems.Enum'
import Tasks from '../../../../data/tasks.json'


const actions = {
    buyItem({state, commit, dispatch}, request){

      var totalCost = request.item.value * request.amount;

      if(state.money < totalCost){
        Vue.prototype.$alerts.notification('error',"Unable to buy", "You dont have enough money for this item");
        return;
      }

      commit("subtractMoney", totalCost);
      Vue.prototype.$inventoryService.addItemToInventory({id : request.item.id, amount: request.amount})
      dispatch("savePlayerData");
    },
    sellItem({state, commit, dispatch}, request){
      var inventoryItem = state.inventory.find(x => x.id == request.item.id);

      if(inventoryItem == null) return //Probably return error as this shouldnt be possible;

      if(inventoryItem.amount < request.amount){
        Vue.prototype.$alerts.notification('error',"Unable to sell", "You cant sell that many");
        return;
      }

      commit("addMoney", request.item.value * request.amount);
      Vue.prototype.$inventoryService.removeItemFromInventory({id : request.item.id, amount: request.amount})
      dispatch("savePlayerData");
    },
    checkIfLevelUp({state, commit, dispatch}, id){ //Needs refactor

      var itemData = Vue.prototype.$itemService.getItem(id)
      if(!itemData.levelUpRequirement) return;

      var nextStageId = state.currentStage + 1;
      var nextStage = StageData.stages.find(stage => stage.id == nextStageId);
      if(nextStage){
        var levelUp = true;
        nextStage.requirements.forEach(req =>{
          var inventoryItem = state.inventory.find(item => item.id == req.id);
          // Same issue as other file with not being able to skip foreach
          if(!inventoryItem || !levelUp){
            levelUp = false;
          }else if(inventoryItem.amount < req.amount){
            levelUp = false;
          } else {
            levelUp = true;
          }
        })

        if(!levelUp) return;
        commit("moveToNextStage")
        commit("addToLog", { text : nextStage.intro, type: LogEnum.Storyline})

        Vue.prototype.$modal.show('dialog', {
          title: `Unlocked ${nextStage.name}`,
          text: nextStage.intro,
          buttons: [
            {
              title: 'Ok'
            }
         ]
        })

        dispatch("savePlayerData");
      }

    },
    incrementTaskStats({state},task){
      var TaskInStats = state.stats.tasks.find(x => x.id == task.id);
      if(TaskInStats != null){
        TaskInStats.totalComplete++;
        return
      };

      state.stats.tasks.push({id: task.id, name: task.name, totalComplete: 1});
    },
    giveOfflineGains({commit, dispatch, state}){
      if(state.activeTask == null) return;

      var task = Tasks.tasks.find(x => x.id == state.activeTask.id);

      var offlineTime = new Date().getTime() - state.activeTask.startedTime;

      var timesTaskCompleted = Math.floor(offlineTime / task.timeToComplete);

      if(timesTaskCompleted <= 0) return;

      var offlineMoneyGain = task.moneyReward * timesTaskCompleted;

      if(offlineMoneyGain > 0) commit("addMoney", offlineMoneyGain);

      task.itemRewards.forEach(item => {
        Vue.prototype.$inventoryService.addItemToInventory({id: item.id, amount: item.amount * timesTaskCompleted});
      });

      var dialogText = `Whilst you were offline you continued to ${task.name}, you gained`;

      if(offlineMoneyGain > 0) dialogText = dialogText + `, ${Vue.prototype.$currenctFormatter.format(offlineMoneyGain)}`

      if(task.itemRewards.length > 0){
        task.itemRewards.forEach(item => {
          var itemData = Vue.prototype.$itemService.getItem(item.id);
          dialogText = dialogText + `, ${item.amount * timesTaskCompleted} X ${itemData.name}`
        });
      }

      Vue.prototype.$modal.show('dialog', {
        title: "Offline gain",
        text: dialogText,
        buttons: [
          {
            title: 'Ok'
          }
       ]
      });
      
      commit("setActiveTask", null);
      dispatch("savePlayerData");
    },
    loadPlayerData({ commit, dispatch, state }){
      return new Promise((resolve, reject) => {
        Vue.prototype.$storage.get("playerData").then(data => {
          if(data == null){
            dispatch("giveDefaultItems")
            dispatch("savePlayerData");
            resolve();
            return;
          }

          Object.assign(state, data) 
          resolve();
        }).catch(err => {
          console.log(err);
          reject(err);
        })
      });
    },
    savePlayerData({state}){
      return new Promise((resolve, reject) => {
        Vue.prototype.$storage.set("playerData", state).then(data => {
          console.log("Saved");
          resolve();
        }).catch(err => {
          Vue.prototype.$alerts.notification('error',"Unable to determine task level", "Not sure how this has happened");
          reject();
        })
      });
    },
    exportPlayerData(){
      return new Promise((resolve, reject) => {
        Vue.prototype.$storage.get("playerData").then(data => {
          if(data == null){
            reject();
          }
          resolve(window.btoa(JSON.stringify(data)));
        }).catch(err => {
          console.log(err);
          reject(err);
        })
      });
    },
    importPlayerData({state},playerData){
      return new Promise((resolve, reject) => {
        var data = JSON.parse(window.atob(playerData));
        Object.assign(state, data) 
        resolve();
      });
    },
    resetData({dispatch, state}){
      Vue.prototype.$storage.removeAll().then(res => {
        state.money = 0;
        state.log = [];
        state.inventory = [];
        state.currentStage = 1;
        state.stats = {
          tasks: [],
          totalMoneyEarned: 0,
          totalMoneySpent: 0
        };
        Vue.prototype.$alerts.notification('success',"Reset", "Data has been reset");
      }).catch(error =>{
        Vue.prototype.$alerts.notification('error',"Unable to reset data", "Not sure how this has happened");
      });
    },
  }

export default actions;