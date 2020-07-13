<template>
    <div class="navigation row">
      <div v-for="(link, i) in links" :key="i" class="col-xs-3 button-container">
          <button class="navigation-button pointer" v-bind:class="{ active: link.isActive }" @click="navigate(link.href)"><img class="navigation-icon" :src="link.icon" /> <br> {{link.text}}</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Navigation',
  computed:{
    links(){
        return [
            {text: "Tasks", href: "/tasks", icon:"https://storyline-icons.s3-eu-west-1.amazonaws.com/icons8-task-48.png" , isActive: this.isCurrentPage('/tasks')},
            {text: "Inventory", href: "/inventory", icon:"https://storyline-icons.s3-eu-west-1.amazonaws.com/icons8-inventory-flow-50.png", isActive: this.isCurrentPage('/inventory')},
            {text: "Shop", href: "/shop", icon:"https://storyline-icons.s3-eu-west-1.amazonaws.com/icons8-shop-52.png", isActive: this.isCurrentPage('/shop')},
            {text: "Options", href: "/options", icon:"https://storyline-icons.s3-eu-west-1.amazonaws.com/icons8-automation-52.png", isActive: this.isCurrentPage('/options')},
        ];
    },
  },
  methods:{
    isCurrentPage(link){
      return this.$route.path == link;
    },
    navigate(link){
     if(!this.isCurrentPage(link)) this.$router.push(link);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navigation{
    height: 100%;

    .button-container{
        padding: 0;
    }

    .navigation-button{
        width: 100%;
        height: 100%;
        background: #fff;
        border: 0;
        border-right: 1px solid grey;
        border-left: 1px solid grey;

        .navigation-icon{
          width: 2em;
        }
    }

    .navigation-button:focus {
      outline:0;
    }

    .active{
        border-top: 6px solid #31708e;
    }
}
</style>
