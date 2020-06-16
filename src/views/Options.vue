<template>
  <div class="options">
    <div class="row">
        <div class="col-xs-12">
            <p class="page-title">Options</p>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <button class="options-button reset-button" @click="confirmReset">Reset</button>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <button class="options-button dark-mode-button" @click="toggleDarkMode">{{darkModeButtonText}}</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Options',
  computed:{
    darkModeButtonText(){
      var isCurrentlyDarkMode = this.$store.state.settingsData.darkMode;

      return isCurrentlyDarkMode ? "Light Mode" : "Dark Mode";
    }
  },
  methods:{
    confirmReset(){
      var consent = confirm("Are you sure you want to reset all progression?")
      if(consent) this.reset();
    },
    reset(){
      this.$store.dispatch("resetData");
    },
    toggleDarkMode(){
      this.$store.dispatch("toggleDarkMode");
    }
  }
}
</script>

<style lang="scss">
.options-button{
    padding: 10px;
    border: 1px solid #eee;
    color: #eee;
}
.reset-button{
    background-color: #9B1003;
}

.dark-mode-button{
  background-color: grey;
}
</style>