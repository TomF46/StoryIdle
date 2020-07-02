<template>
  <div id="app" :class="darkModeClass">
    <div v-if="loaded">
      <idle-header></idle-header>
      <keep-alive>
      <router-view/>
      </keep-alive>
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
  computed:{
    darkModeClass(){
      var isCurrentlyDarkMode = this.$store.state.settingsData.darkMode;

      return isCurrentlyDarkMode ? "dark" : "light";
    }
  },
  mounted(){
    this.$store.dispatch("loadPlayerData").then(res => {
      this.loaded = true;
    }).catch(err =>{
      console.log(err)
      this.$alerts.notification('error',"Unable to load player data", "Not sure how this has happened");
    });
    this.$store.dispatch("loadSettingsData");
  }
}
</script>

<style lang="scss">
  /* Import flexgrid css during build */
  @import '../node_modules/flexboxgrid/dist/flexboxgrid.min.css';


  html, body {
    height:100%
  }

  .row{
    max-width: 100vw;
  }

  body, #app{
    margin: 0px;
    min-height: 100vh;
  }

  .card{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 8px;

    .title{
      text-align: center;
      font-size: 1.25rem;
    }

    button{
      margin: 10px;
      padding: 6px 12px;
      font-size: 1.25rem;
      text-align: center;
      margin:0 auto;
      display:block;
    }
  }

  .center-text{
    text-align: center;
  }

  .page-title {
    text-align: center;
    font-size: 2rem;
  }

  .side-pane-title{
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    font-size: 1.25rem;
  }

  body{
    font-family: 'Roboto', sans-serif;
  }

  .dark{
    background-color: #121212;

    color: #edeeef;

    .log .filter-button, .navigation .navigation-button{
      background-color: #121212 !important;
      color: #edeeef;
    }

    .shop-card, .task-card, .card{
      background-color: #404040;
    }

    .v-select{
      background-color: #edeeef;
    }

    .header{
      background-color: #121212;
      color: #31708e;
    }
  }

  .search-box{
  width: 20%;
  margin-left: 10px;
  height: 90%;
  background-color: #edeeef;
}

</style>
