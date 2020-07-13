<template>
    <div class="log">
      <div class="row">
        <div class="col-xs-12">
          <p class="side-pane-title box">Log</p>
        </div>
      </div>
      <div class="row">
        <!-- <div v-for="(filter, i) in filters" :key="i" class="col-xs-3 filter-container">
          <button class="filter-button pointer" v-bind:class="{ active: isCurrentFilter(filter) }" @click="changeFilter(filter)" >{{filter.title}}</button>
        </div> -->
        <div class="col-xs-12">
          <v-select class="log-select" v-model="filter" :reduce="title => title.filterEnum" label="title" :options="filters" :clearable="false" />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <ul>
            <li v-for="(log, i) in displayLogs" :key="i">{{log.timestamp.toLocaleString()}} - {{log.text}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import LogItemsTypes from '../data/enums/LogItems.Enum'

export default {
  name: 'Log',
  data: function() {
    return {
        filter: null,
        selectedFilterName: "All"
    }
  },
  computed:{
    logs(){
      return this.$store.state.playerData.log;
    },
    filteredLogs(){
      if(this.filter == null) return this.logs;

      return this.logs.filter(x => x.type == this.filter);
    },
    displayLogs(){   
      if(this.filteredLogs.length < 20) return this.filteredLogs;

      return this.logs.slice(this.filteredLogs.length - 20, this.filteredLogs.length)
    },
    filters(){
      return [
        {title: "All" , filterEnum : null},
        {title: "Storyline", filterEnum: LogItemsTypes.Storyline},
        {title: "Action", filterEnum: LogItemsTypes.Action},
        {title: "Milestone", filterEnum: LogItemsTypes.Milestone},
      ]
    },
    logsLength(){
      return this.logs.length;
    },
  },
  methods:{
    changeFilter(filter){
      this.filter = filter.filterEnum;
    },
    isCurrentFilter(filter){
      return this.filter == filter.filterEnum;
    }
  },
  watch: {
    logsLength () {
      if(this.logsLength < 100) return;

      var ActionLogs = this.logs.filter(x => x.type == LogItemsTypes.Action);

      if(ActionLogs.length < 100) return;

      var lastActionLog = ActionLogs[0];
      this.$store.commit("removeLog", lastActionLog);
    },
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.log{
  padding-right: 8px;
  
  ul{
    list-style: none;
    padding-left: 6px;
    li{
      margin-bottom: 4px;
      font-size: 0.8rem;
    }
  }

  .filter-container{
      padding: 0;
  }

  .filter-button{
      width: 100%;
      height: 100%;
      background: #fff;
      border: 1px solid grey;;
  }


  .filter-button:focus {
    outline:0;
  }

  .active{
      border-top: 6px solid #31708e;
  }

  // .row{
  //   padding-right: 0;
  // }
}
</style>
