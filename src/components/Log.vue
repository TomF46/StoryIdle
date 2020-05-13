<template>
    <div class="log">
        <p class="center-text">Log</p>
        <ul>
          <li v-for="(log, i) in displayLogs" :key="i">{{log.timestamp.toLocaleString()}} - {{log.text}}</li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'Log',
  computed:{
    logs(){
      return this.$store.state.playerData.log;
    },
    displayLogs(){
      if(this.logs.length < 20) return this.logs;

      return this.logs.slice(this.logs.length - 20, this.logs.length)
    }
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
