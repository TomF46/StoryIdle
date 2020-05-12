import Vue from 'vue'
import Tasks from '../../data/tasks.json';

const playerData = {
  state: {
      money: 0,
      taskData: [],
      log: [],
      inventory: [],
      currentStage: 1
  },
  mutations: {
    setPlayerTaskData(state, data){
      state.taskData = data;
    },
    addToLog(state, log){
      var timestamp =  new Date().getTime();
      var logItem = {timestamp : new Date(timestamp), text: log.text, type: log.type};
      state.log.push(logItem);
    },
    addMoney(state, amount){
      state.money += amount;
    },
    subtractMoney(state, amount){
      state.money -= amount;
    }
  },
  actions: {
    addToInventory({state}, item){
        var inventoryItem = state.inventory.find(x => x.id == item.id);
        
        if(inventoryItem){
            inventoryItem.amount+= item.amount
            return;
        }

        state.inventory.push({id : item.id, amount: item.amount});
    },
    buyItem({state, commit, dispatch}, item){
      if(state.money < item.value){
        Vue.prototype.$alerts.notification('error',"Unable to buy", "You dont have enough money for this item");
        return;
      }

      commit("subtractMoney", item.value);
      dispatch("addToInventory", {id : item.id, amount: 1})
      dispatch("savePlayerData");


      
    },
    loadPlayerData({ commit, dispatch, state }){
      return new Promise((resolve, reject) => {
        Vue.prototype.$storage.get("playerData").then(data => {
          if(data == null){
            dispatch("setUserTaskData");
            dispatch("giveDefaultItems")
            dispatch("savePlayerData");
            resolve();
            return;
          }

          Object.assign(state, data) 
          dispatch("setUserTaskData");
          resolve();
        }).catch(err => {
          console.log(err);
          reject(err);
        })
      });
    },
    savePlayerData({state}){
      Vue.prototype.$storage.set("playerData", state).then(data => {
        console.log("Saved");
      }).catch(err => {
        Vue.prototype.$alerts.notification('error',"Unable to determine task level", "Not sure how this has happened");
      })
    },
    setUserTaskData({state}){
      var tasks = Tasks.tasks;

      tasks.forEach((task) => {
        if(state.taskData.some(taskDataItem => taskDataItem.id == task.id) == false){
         var unlocked = task.id == 1;
          state.taskData.push({id: task.id, unlocked: unlocked})
        }
      });
    },
    resetData({dispatch, state}){
      Vue.prototype.$storage.removeAll().then(res => {
        state.money = 0;
        state.taskData = [];
        state.log = [];
        state.inventory = [];
        state.currentStage = 1;
        dispatch("setUserTaskData");
        Vue.prototype.$alerts.notification('success',"Reset", "Data has been reset");
      }).catch(error =>{
        Vue.prototype.$alerts.notification('error',"Unable to reset data", "Not sure how this has happened");
      });
    },
  }
}

export default playerData;

