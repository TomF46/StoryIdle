<template>
  <div v-if="taskUnlocked" class="task row">
    <div class="col-xs-12">
      <p>{{task.name}}</p>
    </div>
    <div class="col-xs-2"> 
      <button @click="runTask">Run</button>
    </div>
    <div class="col-xs-10">
      <progress-bar
      ref="progressbar"
      :miliseconds="task.timeToComplete"
      :overrunOwed="owedTime"
      @taskFinished="onTaskFinished"
    ></progress-bar>
    </div>
  </div>
</template>

<script>
import ProgressBar from "./ProgressBar";
import LogEnum from '../data/enums/LogItems.Enum'

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
    taskUnlocked(){
      var currentStage = this.$store.state.playerData.currentStage;
      return this.task.requiredStage <= currentStage;
    },
    automated(){
      var automated = true;

      // refactor this might not be right function if we cant break
      this.task.automationRequirement.forEach(requirement => {
        var item = this.$store.state.playerData.inventory.find(item => item.id == requirement.id);
        if(item == null || automated == false){
          automated = false;
        }else{
          automated = item.amount >= requirement.amount
        }
      })

      return automated;
    }
  },
  mounted() {
    
  },
  methods: {
    runTask() {
      this.$refs.progressbar.start();
    },
    onTaskFinished(overrun) {
      this.payUser();

      if (!this.automated) return;

      // If overrun is greater than the time to complete a task pay the user for those tasks until the overrun owed is less than the task time
      while (overrun > this.task.timeToComplete) {
        this.payUser();
        overrun = overrun - this.task.timeToComplete;
      }
      this.owedTime = overrun;
      this.runTask();
    },
    payUser() {
      this.task.itemRewards.forEach(item => {
        var rewardPayload = {
          id: item.id,
          amount: item.amount
        };
        this.$store.dispatch("addToInventory", rewardPayload);
      });

      this.$store.commit("addMoney", this.task.moneyReward);
      this.$store.commit("addToLog", { text : `Completed ${this.task.name}`, type: LogEnum.Action});
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
  padding: 10px;
  display: block;
  margin: 0 auto;
  border: 1px solid black;
  background-color: #31708e;
}
</style>
