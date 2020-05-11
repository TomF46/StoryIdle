<template>
  <div id="app">
    <div v-if="loaded">
      <idle-header></idle-header>
      <router-view/>
    </div>
    <notifications group="notify" position="bottom center" />
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'app',
  components:{
    "idle-header" : Header
  },
  data: function() {
    return {
      loaded: false
    };
  },
  mounted(){
    this.$store.dispatch("loadTasks");
    this.$store.dispatch("loadPlayerData").then(res => {
      console.log("loaded")
      this.loaded = true;
    }).catch(err =>{
      console.log(err)
      this.$alerts.notification('error',"Unable to load player data", "Not sure how this has happened");
    });
  }
}
</script>

<style lang="scss">
  /* Import flexgrid css during build */
  @import '../node_modules/flexboxgrid/dist/flexboxgrid.min.css';

  .row{
    max-width: 100vw;
  }

  body, #app{
    margin: 0px;
    min-height: 100vh;
  }
</style>
