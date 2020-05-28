<template>
    <div>
        <div class="bar-outline">
            <div class="bar-progress" :style="barStyles"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'progress-bar',
  props:{
    miliseconds: Number,
    overrunOwed : Number
  },
  data: function() {
    return {
        remainingTime: 0,
        timerIncrement: 10,
        active: false,
        startTime: null,
        totalRunningTime: 0,
        timeout: null
    };
  },
  computed: {
    barStyles(){
    var timeComplete = this.totalRunningTime - this.remainingTime;
    var percentageComplete = (timeComplete / this.totalRunningTime ) * 100;

    if(this.active == false ) percentageComplete = 0;

    return {
        'width' : percentageComplete + '%'
    }
    }
  },
  methods:{
    start(){
        if(this.active == true){
          this.cancelTask();
          return;
        }
        this.active = true;
        this.totalRunningTime = this.miliseconds - this.overrunOwed;
        this.remainingTime = this.miliseconds - this.overrunOwed;
        this.animateProgress();
        this.runTaskTimer();
    },
    onFinish(overrun){
        clearTimeout(this.timeout);
        this.active = false;
        this.remainingTime = 0;
        this.$emit("taskFinished", overrun);
    },
    cancelTask(){
        clearTimeout(this.timeout);
        this.active = false;
        this.remainingTime = 0;
    },
    animateProgress(){
      requestAnimationFrame((timestamp) =>{
          this.startTime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
          this.updateProgress(timestamp) // 400px over 1 second
      })
    },
    updateProgress(timestamp){
      var timestamp = timestamp || new Date().getTime()
      var runtime = timestamp - this.startTime;

      
      if (runtime < this.totalRunningTime){ // if duration not met yet
        this.remainingTime = this.totalRunningTime - runtime;
        requestAnimationFrame((timestamp) => { // call requestAnimationFrame again with parameters
            this.updateProgress(timestamp)
        })
      }
    },
   runTaskTimer(){
     var taskStartTime = new Date().getTime();
     this.timeout = setTimeout(() => {
       var finishTime = new Date().getTime();
       var runtime = finishTime - taskStartTime;
       var overrun = runtime - this.totalRunningTime;
       // In background setTimeout may be throttled, so calculate how long its really been running , return this number so we can calculate real complete actions
       this.onFinish(overrun);
     }, this.totalRunningTime)
   }
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bar-outline{
    border: 1px solid #333;
    width: 60%;
    height: 40px;
    box-shadow: inset 0 -1px 1px rgba(255,255,255,0.3);
    margin: 0 auto;
    margin-bottom: 12px;
}
.bar-progress{
 height: 100%;
 background-color : #31708e;
 transition: width linear;
}
</style>
