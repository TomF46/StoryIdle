<template>
  <div v-if="taskUnlocked" class="task row center-xs">
    <div class="card col-lg-8 col-xs-10 pointer" @click="runTask" v-tooltip="tooltipOptions">
      <div class="row">
        <div class="col-xs-12 col-sm-2 col-md-1 center-items">
        <img class="icon" :alt="task.name" :src="task.icon"/>
      </div>
      <div class="col-xs-12 col-sm-2 col-md-3">
        <p class="title">{{task.name}} <br><span class="duration">{{duration}} seconds</span><br><span class="detailText">{{earnsText}}</span><br><span class="detailText">{{costsText}}</span></p>
      </div>
      <div class="col-xs-12 col-sm-7 col-md-7 center-items">
        <progress-bar
        ref="progressbar"
        :miliseconds="task.timeToComplete"
        :overrunOwed="owedTime"
        @taskFinished="onTaskFinished"
        ></progress-bar>
      </div>
      <div class="col-xs-12 col-sm-1 center-items"> 
        <!-- <button class="run-button pointer" @click="runTask">Run</button> -->
      </div>
    </div>
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
    },
    userHasRequiredItems(){
      var hasItems = true;

      this.task.consumes.forEach(requiredItem => {
        var item = this.$store.state.playerData.inventory.find(item => item.id == requiredItem.id);
        if(item == null || hasItems == false){
          hasItems = false;
        }else{
          hasItems = item.amount >= requiredItem.amount
        }
      })

      return hasItems;
    },
    duration(){
      return this.task.timeToComplete / 1000;
    },
    earnsText(){
      var text = `Earns: `

      if(this.task.moneyReward > 0) text = text + `£${this.task.moneyReward}`

      this.task.itemRewards.forEach(item => {
        var itemData = this.$itemService.getItem(item.id)
        text = text + ` ${item.amount} ${itemData.name}`
      });

      return text;
    },
    costsText(){
      if(this.task.consumes.length == 0) return ""

      var text = "Costs: "

      this.task.consumes.forEach(requiredItem => {
        var itemData = this.$itemService.getItem(requiredItem.id);
        text = text + ` ${requiredItem.amount} ${itemData.name}`
      })

      return text;
    },
    tooltipText(){
      return this.earnsText + " " + this.costsText;
    },
    tooltipOptions(){
      return { 
        content: this.tooltipText,
      }
    }
  },
  mounted() {
    
  },
  methods: {
    runTask() {
      this.checkCanRunTask() ? this.$refs.progressbar.start() : this.$alerts.notification('Error',"User does not have required items", "");
    },
    onTaskFinished(overrun) {



      if (this.checkTaskIsSuccessful()) {
        this.payUser();
      } else {
        this.$alerts.notification('Error',"Task failed", "");
      }

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
      this.$store.dispatch("incrementTaskStats", this.task);
      this.$store.dispatch("savePlayerData");
    },
    checkTaskIsSuccessful(){
      return this.task.successRate >= Math.random();
    },
    checkCanRunTask(){
      if(!this.userHasRequiredItems) return false;

      this.task.consumes.forEach(requiredItem => {
        this.$store.dispatch("removeFromInventory", {id : requiredItem.id, amount: requiredItem.amount});
      })

      return true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.task {
  margin: 20px 0px;

  .card{
    border-top: 4px solid #31708e;
    border-radius: 5px;
  }

  .duration{
    text-align: center;
    font-size: 0.8rem;
    margin-top: 2px;
  }

  .title{
    margin-top: 0;
    margin-bottom: 0;
  }

  .icon{
    width: 2.5rem;
    margin: 0 auto;
  }

  .detailText{
    text-align: center;
    font-size: 0.8rem;
  }
}
button {
  padding: 5px 10px;
  display: block;
  margin: 0 auto;
  border: 1px solid black;
  background-color: #31708e;
  margin-top: 5px;
}

@media only screen and (min-width: 48em) {
  .center-items{
    position: relative;
    button, .icon{
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%,-50%);
      margin-top: 0;
    }
  }

  .icon{
    width: 100%;
    margin: 0 auto;
  }
}


</style>
