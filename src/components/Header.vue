<template>
    <div class="header row">
      <div class="logo center-xs col-xs-12">
          <p>Storyline Idle - Stage {{currentStage}}</p>
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
}
</style>
