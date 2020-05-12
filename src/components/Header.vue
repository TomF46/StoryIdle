<template>
    <div class="header row">
      <div class="col-xs-4">
          <button v-if="!isCurrentPage('/')" class="link-button" @click="navigate('/')">Tasks</button>
          <button v-if="!isCurrentPage('/shop')" class="link-button" @click="navigate('/shop')">Shop</button>
          <button v-if="!isCurrentPage('/inventory')" class="link-button" @click="navigate('/inventory')">Inventory</button>
      </div>
      <div class="logo center-xs col-xs-4">
          <p>Storyline Idle - Stage {{currentStage}}</p>
      </div>
      <div class="col-xs-4">
        <button class="reset-button" @click="confirmReset">Reset</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  computed:{
    currentStage(){
      return this.$store.state.playerData.currentStage;
    }
  },
  methods:{
    navigate(link){
      this.$router.push(link);
    },
    confirmReset(){
      var consent = confirm("Are you sure you want to reset all progression?")
      if(consent) this.reset();
    },
    isCurrentPage(link){
      return this.$route.path == link;
    },
    reset(){
      this.$store.dispatch("resetData");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header{
    background-color: #31708e;
    box-shadow: 0 4px 2px -2px #0c3b5b;
    margin: 0;
    position: relative;
    height: 4rem;
    p{
        font-size: 1.5rem;
        padding: 20px;
        margin: 0;
    }

    .link-button{
      margin: 20px;
      padding: 10px;
      border: 1px solid #eee;
      background-color: green;
      color: #eee;
    }

    .reset-button{
      position: absolute;
      top: 20px;
      right: 20px;
      padding: 10px;
      border: 1px solid #eee;
      background-color: #9B1003;
      color: #eee;
    }
}
</style>
