<template>
  <div class="main">
    <div class="row game-viewport">
      <div id="inventory-pane" class="col-xs-3 pane">
        <game-inventory></game-inventory>
      </div>
      <div id="tasks-pane" class="col-xs-6 pane">
        <game-tasks></game-tasks>
      </div>
      <div id="log-pane" class="col-xs-3 pane">
        <game-log></game-log>
      </div>
    </div>
  </div>
</template>

<script>
import QuickInventory from '../components/Quick-Inventory'
import Tasks from '../components/Tasks'
import Log from '../components/Log'

export default {
  name: 'Main',
  components:{
    "game-inventory" : QuickInventory,
    "game-tasks" : Tasks,
    "game-log" : Log
  },
}
</script>

<style lang="scss">
.main{
  #inventory-pane{
    border-right: 1px solid grey;
  }
  #log-pane{
    border-left: 1px solid grey;
  }
  .pane{
    height: calc(100vh - 4rem);
  }
}
</style>