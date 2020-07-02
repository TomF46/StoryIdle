import Vue from 'vue'
import StageData from '../../data/stages.json'
import ItemData from '../../data/items.json'
import LogEnum from '../../data/enums/LogItems.Enum'

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
    },
    moveToNextStage(state){
      state.currentStage++;
    }
  },
  actions: {
    addToInventory({state, dispatch}, item){
        var inventoryItem = state.inventory.find(x => x.id == item.id);
        var itemData = ItemData.items.find(x => x.id == item.id);
        
        Vue.prototype.$alerts.notification('success',"Obtained item", `${itemData.name} X ${item.amount}`);
        
        if(inventoryItem){
            inventoryItem.amount+= item.amount
            return;
        }

        state.inventory.push({id : item.id, amount: item.amount});

        dispatch("checkIfLevelUp", item.id)
    },
    removeFromInventory({state}, item){
      var inventoryItem = state.inventory.find(x => x.id == item.id);

      if(inventoryItem == null) return //Probably return error as this shouldnt be possible

      inventoryItem.amount-= item.amount;

      if(inventoryItem.amount <= 0){
        var index = state.inventory.indexOf(inventoryItem);
        state.inventory.splice(index,1);
      }
    },
    buyItem({state, commit, dispatch}, request){

      var totalCost = request.item.value * request.amount;

      if(state.money < totalCost){
        Vue.prototype.$alerts.notification('error',"Unable to buy", "You dont have enough money for this item");
        return;
      }

      commit("subtractMoney", totalCost);
      dispatch("addToInventory", {id : request.item.id, amount: request.amount})
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
      dispatch("removeFromInventory", {id : request.item.id, amount: request.amount})
      dispatch("savePlayerData");
    },
    checkIfLevelUp({state, commit, dispatch}, id){ //Needs refactor

      var itemData = ItemData.items.find(item => item.id == id);
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
        dispatch("savePlayerData");
      }

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
        state.taskData = [];
        state.log = [];
        state.inventory = [];
        state.currentStage = 1;
        Vue.prototype.$alerts.notification('success',"Reset", "Data has been reset");
      }).catch(error =>{
        Vue.prototype.$alerts.notification('error',"Unable to reset data", "Not sure how this has happened");
      });
    },
  }
}

export default playerData;

