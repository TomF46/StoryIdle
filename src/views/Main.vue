<template>
  <div class="main">
    <div :class="dynamicViewPortClass" class="game-viewport">
      <div id="inventory-pane" class="col-xs-0 col-md-2 hidden-sm hidden-xs pane">
        <game-inventory></game-inventory>
      </div>
      <div id="tasks-pane" class="col-xs-12 col-md-8 pane">
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
      <div id="log-pane" class="col-xs-0 col-md-2 hidden-sm hidden-xs pane">
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
  data() {
    return {
      pageWidth: 0
    };
  },
  computed:{
    dynamicViewPortClass(){
      return this.pageWidth >= 64 ? "row" : "";
    }
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted(){
    this.setPageWidth();
  },
  methods:{
    handleResize(){
      this.setPageWidth();
    },
    setPageWidth(){
      this.pageWidth = window.innerWidth / parseFloat(
        getComputedStyle(
          document.querySelector('body')
        )['font-size']
      )
    }
  }
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
    min-height: calc(100vh - 4rem);
  }
  .navigation-bar{
    height: 4rem;
    border-bottom: 1px solid grey;
  }
}

@media (max-width: 1024px) {

  
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