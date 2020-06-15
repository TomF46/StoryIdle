const settingsData = {
  state: {
      darkMode: false
  },
  mutations: {
    toggleDarkMode(state){
      state.darkMode = !state.darkMode;
    },
  },
  actions: {}
}

export default settingsData;

