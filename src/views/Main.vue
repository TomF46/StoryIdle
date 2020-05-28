<template>
  <div class="main">
    <div class="row game-viewport">
      <div id="inventory-pane" class="col-xs-2 pane">
        <game-inventory></game-inventory>
      </div>
      <div id="tasks-pane" class="col-xs-8 pane">
        <div class="navigation-bar col-xs-12">
          <game-navigation></game-navigation>
        </div>
        <div class="col-xs-12">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </div>
      <div id="log-pane" class="col-xs-2 pane">
        <game-log></game-log>
      </div>
    </div>
  </div>
</template>

<script>
import QuickInventory from '../components/Quick-Inventory'
import Log from '../components/Log'
import Navigation from '../components/Navigation'

export default {
  name: 'Main',
  components:{
    "game-inventory" : QuickInventory,
    "game-log" : Log,
    "game-navigation" : Navigation
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
  #tasks-pane{
    padding: 0px;
  }
  .pane{
    height: calc(100vh - 4rem);
  }
  .navigation-bar{
    height: 4rem;
    border-bottom: 1px solid grey;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>