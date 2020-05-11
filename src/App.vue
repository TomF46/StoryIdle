<template>
  <div id="app">
    <idle-header></idle-header>
    <router-view/>
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
    };
  },
  mounted(){
    
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
