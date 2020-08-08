import Vue from "vue";
import Vuex from "vuex";
import playerData from "./modules/playerState/playerState";
import settingsData from "./modules/settingsState";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    playerData: playerData,
    settingsData: settingsData,
  },
});
