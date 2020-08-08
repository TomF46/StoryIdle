import Vue from "vue";

const settingsData = {
  state: {
    darkMode: false,
  },
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
  actions: {
    toggleDarkMode({ commit, dispatch }) {
      commit("toggleDarkMode");
      dispatch("saveSettingsData");
    },
    saveSettingsData({ state }) {
      Vue.prototype.$storage
        .set("settingsData", state)
        .then((data) => {
          console.log("Saved");
        })
        .catch((err) => {
          Vue.prototype.$alerts.notification(
            "error",
            "Unable to save settings",
            "Not sure how this has happened"
          );
        });
    },
    loadSettingsData({ state }) {
      Vue.prototype.$storage
        .get("settingsData")
        .then((data) => {
          if (data == null) return;
          Object.assign(state, data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};

export default settingsData;
