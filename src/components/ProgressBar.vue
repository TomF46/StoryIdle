<template>
  <div>
    <div class="bar-outline">
      <div class="bar-progress" :style="barStyles"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "progress-bar",
  props: {
    miliseconds: Number,
    overrunOwed: Number,
  },
  data: function() {
    return {
      remainingTime: 0,
      timerIncrement: 10,
      active: false,
      startTime: null,
      totalRunningTime: 0,
      timeout: null,
    };
  },
  computed: {
    barStyles() {
      let timeComplete = this.totalRunningTime - this.remainingTime;
      let percentageComplete = (timeComplete / this.totalRunningTime) * 100;

      if (this.active == false) percentageComplete = 0;

      return {
        width: percentageComplete + "%",
      };
    },
  },
  methods: {
    start() {
      if (this.active == true) {
        this.$emit("taskCancelled");
        this.cancelTimer();
        return;
      }
      this.active = true;
      this.totalRunningTime = this.miliseconds - this.overrunOwed;
      this.remainingTime = this.miliseconds - this.overrunOwed;
      this.$emit("taskStarted");
      this.animateProgress();
      this.runTaskTimer();
    },
    onFinish(overrun) {
      clearTimeout(this.timeout);
      this.active = false;
      this.remainingTime = 0;
      this.$emit("taskFinished", overrun);
    },
    cancelTimer() {
      clearTimeout(this.timeout);
      this.active = false;
      this.remainingTime = 0;
    },
    animateProgress() {
      requestAnimationFrame((timestamp) => {
        this.startTime = timestamp || new Date().getTime(); //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
        this.updateProgress(timestamp);
      });
    },
    updateProgress(timestamp) {
      timestamp = timestamp || new Date().getTime();
      const runtime = timestamp - this.startTime;

      if (runtime < this.totalRunningTime) {
        // if duration not met yet
        this.remainingTime = this.totalRunningTime - runtime;
        requestAnimationFrame((timestamp) => {
          // call requestAnimationFrame again with parameters
          this.updateProgress(timestamp);
        });
      }
    },
    runTaskTimer() {
      const taskStartTime = new Date().getTime();
      this.timeout = setTimeout(() => {
        const finishTime = new Date().getTime();
        const runtime = finishTime - taskStartTime;
        const overrun = runtime - this.totalRunningTime;
        // In background setTimeout may be throttled, so calculate how long its really been running , return this number so we can calculate real complete actions
        this.onFinish(overrun);
      }, this.totalRunningTime);
    },
  },
};
</script>

<style scoped lang="scss">
.bar-outline {
  border: 1px solid #333;
  height: 40px;
  box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
  margin: auto auto;
}
.bar-progress {
  height: 100%;
  background-color: #31708e;
  transition: width linear;
}

@media only screen and (min-width: 48em) {
  .bar-outline {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
}
</style>
