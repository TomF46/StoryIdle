<template>
  <div class="options">
    <div class="row">
        <div class="col-xs-12">
            <p class="page-title">Options</p>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-4">
            <button class="options-button reset-button" @click="confirmReset">Reset</button>
        </div>
        <div class="col-xs-4">
            <button class="options-button dark-mode-button" @click="toggleDarkMode">{{darkModeButtonText}}</button>
        </div>
        <div class="col-xs-4">
            <button class="options-button dark-mode-button" @click="manualSave" >Manual Save</button>
        </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div class="card">
          <div class="row">
            <div class="col-xs-12">
              <p class="title">Export Save</p>
            </div>
            <div class="col-xs-12">
              <textarea v-model="playerData" placeholder="Player data export will appear here"></textarea>
            </div>
            <div class="col-xs-6"> 
              <button @click="exportSave">Export Save</button>
            </div>
            <div class="col-xs-6"> 
              <button @click="importSave">Import Save</button>
            </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Options',
  data: function() {
    return {
      playerData: null
    };
  },
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
    },
    manualSave(){
      this.$store.dispatch("savePlayerData").then(res => {
        this.$alerts.notification('Success',"Game Saved", "");
      })
    },
    exportSave(){
      this.$store.dispatch("exportPlayerData").then(res => {
        this.playerData = res;
      }).catch(err =>{
        this.$alerts.notification('error',"Unable to export data", "");
      });
    },
    importSave(){
      this.$store.dispatch("importPlayerData", this.playerData).then(res => {
        this.$alerts.notification('success',"Imported data", "");
      }).catch(err =>{
        this.$alerts.notification('error',"Unable to import data", "");
      });
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

.card{
  margin-top: 40px;
  
  textarea{
    width: 80%;
    margin-left: 10%;
    min-height: 80px;
  }
}
</style>