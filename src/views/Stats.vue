<template>
  <div class="options">
    <div class="row">
      <div class="col-xs-12">
        <p class="page-title">Stats</p>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <p>Money</p>
        <p>
          Total money earnt:
          {{ $currenctFormatter.format(this.stats.totalMoneyEarned) }}
        </p>
        <p>
          Total money spent:
          {{ $currenctFormatter.format(this.stats.totalMoneySpent) }}
        </p>
      </div>
      <div class="col-xs-12">
        <p>Tasks</p>
        <p v-for="(task, i) in stats.tasks" :key="i">
          {{ task.name }} times completed: {{ task.totalComplete }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Options",
  computed: {
    stats() {
      return this.$store.state.playerData.stats;
    },
  },
};
</script>
