import Vue from 'vue'
import Vuex from 'vuex'
import Tasks from '../tasks.json';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player:{
      money: 0,
      taskData: [],
      actionLog: []
    },
    tasks: {}
  },
  mutations: {
    setTotalMoney(state, total){
      state.player.money = total;
    },
    addMoney(state, amount){
      state.player.money = state.player.money + amount;
    },
    subtractMoney(state, amount){
      state.player.money = state.player.money - amount;
    },
    setTasks(state, tasks){
      state.tasks = tasks;
    },
    setPlayerTaskData(state, data){
      state.player.taskData = data;
    },
    addActionToLog(state, action){
      var timestamp =  new Date().getTime();
      var logItem = {dateTime : new Date(timestamp), action: action};
      state.player.actionLog.push(logItem);
    }
  },
  actions: {
    loadTasks({commit}){
      return new Promise((resolve, reject) => {
        commit("setTasks", Tasks.tasks);
        resolve();
      });
    },
    loadPlayerData({ commit, dispatch }){
      return new Promise((resolve, reject) => {
        Vue.prototype.$storage.get("playerData").then(data => {
          if(data == null){
            dispatch("setUserTaskData");
            dispatch("savePlayerData");
            resolve();
            return;
          }

          this.state.player = data;
          dispatch("setUserTaskData");
          resolve();
        }).catch(err => {
          console.log(err);
          reject(err);
        })
      });
    },
    savePlayerData(){
      Vue.prototype.$storage.set("playerData", this.state.player).then(data => {
        console.log("Saved");
      }).catch(err => {
        Vue.prototype.$alerts.notification('error',"Unable to determine task level", "Not sure how this has happened");
      })
    },
    setUserTaskData(){
      if(this.state.tasks)

      this.state.tasks.forEach((task) => {
        if(this.state.player.taskData.some(taskDataItem => taskDataItem.id == task.id) == false){
          this.state.player.taskData.push({id: task.id, automated: false ,level : 1, levelUpCost: task.initialLevelUpCost})
        }
      });
    },
    resetData({dispatch}){
      Vue.prototype.$storage.removeAll().then(res => {
        this.state.player.money = 0;
        this.state.player.taskData = [];
        this.state.player.actionLog = [];
        dispatch("setUserTaskData");
        Vue.prototype.$alerts.notification('success',"Reset", "Data has been reset");
      }).catch(error =>{
        Vue.prototype.$alerts.notification('error',"Unable to reset data", "Not sure how this has happened");
      });
    },
  },
  modules: {
  }
})

