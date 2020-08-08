<template>
  <div id="app" :class="darkModeClass">
    <div v-if="loaded">
      <idle-header></idle-header>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <notifications group="notify" position="bottom center" />
    <v-dialog />
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  name: "app",
  components: {
    "idle-header": Header,
  },
  data: function () {
    return {
      loaded: false,
    };
  },
  computed: {
    darkModeClass() {
      var isCurrentlyDarkMode = this.$store.state.settingsData.darkMode;

      return isCurrentlyDarkMode ? "dark" : "light";
    },
  },
  mounted() {
    this.$store
      .dispatch("loadPlayerData")
      .then((res) => {
        this.loaded = true;
        this.$store.dispatch("giveOfflineGains");
      })
      .catch((err) => {
        console.log(err);
        this.$alerts.notification(
          "error",
          "Unable to load player data",
          "Not sure how this has happened"
        );
      });
    this.$store.dispatch("loadSettingsData");
  },
};
</script>

<style lang="scss">
/* Import flexgrid css during build */
@import "../node_modules/flexboxgrid/dist/flexboxgrid.min.css";
@import "./assets/flexHelper.css";

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: "Roboto", sans-serif;
}

body,
#app {
  margin: 0px;
  min-height: 100vh;
}

.center-text {
  text-align: center;
}

.page-title {
  text-align: center;
  font-size: 2rem;
}

.side-pane-title {
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  font-size: 1.25rem;
}

.pointer {
  cursor: pointer;
}

.light {
  background-color: #f0f0f0;

  .navigation .navigation-button {
    background-color: #f0f0f0 !important;
  }

  .item-card,
  .task-card,
  .card,
  .vue-dialog {
    background-color: #fafafa;
  }
}

.dark {
  background-color: #121212;

  color: #edeeef;

  .navigation .navigation-button {
    background-color: #121212 !important;
    color: #edeeef;
  }

  .item-card,
  .task-card,
  .card,
  .vue-dialog {
    background-color: #404040;
  }

  .v-select {
    background-color: #edeeef;
  }

  .header {
    background-color: #121212;
    color: #31708e;
  }
}

.shop,
.inventory {
  margin: 0 5vw;

  .shelves {
    margin-top: 40px;
  }

  .search-box {
    width: 100%;
    margin-left: 10px;
    height: 90%;
    background-color: #edeeef;
    border: 1px solid rgba(60, 60, 60, 0.26);
  }

  .v-select {
    margin-right: 10px;
  }

  .item-card {
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
    .card-text {
      padding-bottom: 40px; // to clear card button
    }

    .icon {
      width: 33%;
      margin: 0 auto;
    }
  }

  .item-card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
}
</style>
