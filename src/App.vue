<template>
  <div id="app" :class="darkModeClass">
    <div v-if="loaded">
      <idle-header></idle-header>
      <keep-alive>
      <router-view/>
      </keep-alive>
    </div>
    <notifications group="notify" position="bottom center" />
    <v-dialog />
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
  @import './assets/flexHelper.css';

  html, body {
    height:100%;
    margin:0;
    padding:0;
    overflow-x: hidden;
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
      font-size: 1.1rem;
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

  .light{
    background-color: #f0f0f0;

    .log .filter-button, .navigation .navigation-button{
      background-color: #f0f0f0 !important;
    }

    .shop-card, .task-card, .card, .vue-dialog{
      background-color: #fafafa;
    }
  }

  .dark{
    background-color: #121212;

    color: #edeeef;

    .log .filter-button, .navigation .navigation-button{
      background-color: #121212 !important;
      color: #edeeef;
    }

    .shop-card, .task-card, .card, .vue-dialog{
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
  width: 100%;
  margin-left: 10px;
  height: 90%;
  background-color: #edeeef;
  border: 1px solid rgba(60,60,60,.26);
  }

.shelves{
  margin-top: 40px;
}

.pointer{
  cursor: pointer;
}

.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}

.shop {
  margin: 0 5vw;
  .v-select{
    margin-right: 10px;
  }
}

.shop {
  margin: 0 5vw;

  .v-select{
    margin-right: 10px;
  }

  .card-button.cant-sell{
  background-color: #404040;
  }

  .shop-card-icon.inventory-icon{
    padding-bottom: 10px;
  }

}

.shop-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.shop-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding-top: 6px;
  transition: 0.3s;
  margin: 10px;
  min-height: 10vh;
  position: relative;
  border-radius: 5px;
  height: 90%;

  .card-title {
    text-align: center;
    font-size: 1.25rem;
    margin-top: 6px;
  }
  .card-button {
    width: 100%;
    padding: 10px;
    background-color: #31708e;
    margin-top: 12px;
    height: 40px;
    border: none;
    border-top: 1px solid grey;
    position: absolute;
    bottom: 0;
    border-radius: 0 0 5px 5px;
  }
  .card-text{
    padding-bottom: 40px; // to clear card button
  }

  .shop-card-icon{
    width: 33%;
    margin: 0 auto;
    padding-bottom: 60px;
  }
}

.shop-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>
