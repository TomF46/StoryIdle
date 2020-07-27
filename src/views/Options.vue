<template>
  <div class="options">
    <div class="row">
        <div class="col-xs-12">
            <p class="page-title">Options</p>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <button class="options-button dark-mode-button" @click="toggleDarkMode">{{darkModeButtonText}}</button>
        </div>
        <div class="col-xs-12">
            <button class="options-button dark-mode-button" @click="viewStats" >View stats</button>
        </div>
        <div class="col-xs-12">
            <button class="options-button dark-mode-button" @click="viewLog" >View Log</button>
        </div>
        <div class="col-xs-12">
            <button class="options-button dark-mode-button" @click="viewAbout" >View About</button>
        </div>
        <div class="col-xs-12">
            <button class="options-button dark-mode-button" @click="manualSave" >Manual Save</button>
        </div>
        <div class="col-xs-12">
            <button class="options-button reset-button" @click="confirmReset">Reset Save</button>
        </div>
    </div>
    <div class="row">
      <div class="col-xs-8 col-xs-offset-2">
        <div class="card">
          <div class="row">
            <div class="col-xs-12">
              <p class="title">Save management</p>
            </div>
            <div class="col-xs-12">
              <textarea v-model="playerData" placeholder="Add save code to import, if exporting your code will appear here"></textarea>
            </div>
            <div class="col-xs-6"> 
              <button class="pointer" @click="exportSave">Export Save</button>
            </div>
            <div class="col-xs-6"> 
              <button class="pointer" @click="importSave">Import Save</button>
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
      this.$modal.show('dialog', {
          title: "Are you sure?",
          text: "Please confirm that you want to reset your data, all data will be lost and can only be recovered if you first export a copy of your save data.",
          buttons: [
            {
              title: 'Yes reset data',
              handler: () => { 
                this.reset()
                this.$modal.hide('dialog')
              }
            },
            {
              title: 'No, take me back'
            }
         ]
      })
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
    },
    viewStats(){
      this.$router.push("/stats")
    },
    viewLog(){
      this.$router.push("/log")
    },
    viewAbout(){
      this.$router.push("/about")
    }
  }
}
</script>

<style lang="scss">
.options-button{
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #eee;
    color: #eee;
    cursor: pointer;
}
.reset-button{
    background-color: #9B1003;
}

.dark-mode-button{
  background-color: grey;
}

.options{
  .card{
    margin-top: 40px;
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
    
    textarea{
      width: 80%;
      margin-left: 10%;
      min-height: 80px;
    }
  }
}


</style>