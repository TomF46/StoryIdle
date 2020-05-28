<template>
    <div class="log">
        <p class="side-pane-title">Log</p>
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
.log{
  ul{
    list-style: none;
    padding-left: 6px;
    li{
      margin-bottom: 4px;
      font-size: 0.8rem;
    }
  }
}
</style>
