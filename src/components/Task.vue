<template>
  <div v-if="userTaskData.unlocked" class="task">
    <p>{{task.name}}</p>
    <progress-bar
      ref="progressbar"
      :miliseconds="task.timeToComplete"
      :overrunOwed="owedTime"
      @taskFinished="onTaskFinished"
    ></progress-bar>
    <button v-if="!userTaskData.automated" @click="runTask">Run</button>
    <!-- <button @click="levelUp">Level up: {{levelUpCostDisplay}}</button>
    <button v-if="!taskData.automated" @click="unlockAutomation">Unlock automation: {{automationCostDisplay}}</button>
    <p v-if="taskData.automated">Task automated</p> -->
  </div>
</template>

<script>
import ProgressBar from "./ProgressBar";


export default {
  name: "task",
  components: {
   ProgressBar
  },
  props: {
    task: Object
  },
  data: function() {
    return {
        owedTime: 0
    };
  },
  computed: {
    userTaskData(){
        var userTaskData = this.$store.state.playerData.taskData.find(task => task.id == this.task.id);
        if(userTaskData == null) this.$alerts.notification('error',"Unable to find user task data", "Not sure how this has happened");
        return userTaskData; 
    }
  },
  mounted(){
    if(this.userTaskData.automated) this.runTask();
  },
  methods: {
    runTask() {
       this.$refs.progressbar.start();
    },
    onTaskFinished(overrun) {
      this.payUser();

      if(!this.userTaskData.automated) return;

      // If overrun is greater than the time to complete a task pay the user for those tasks until the overrun owed is less than the task time
      while(overrun > this.task.timeToComplete){
        this.payUser();
        overrun = overrun - this.task.timeToComplete; 
      }
      this.owedTime = overrun;
      this.runTask();
    },
    payUser(){
        var rewardPayload = {
            id: this.task.rewardId,
            amount: this.task.rewardAmount
        }
      this.$store.dispatch("addToInventory", rewardPayload)
      this.$store.commit("addActionToLog", `Completed ${this.task.name}`)
      this.$store.dispatch("savePlayerData");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.task {
  margin: 20px 0px;
}
button {
  margin: 20px;
  padding: 10px;
  border: 1px solid black;
  background-color: #31708e;
}
</style>
