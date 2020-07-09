<template>
    <div class="header row">
      <div class="logo center-md col-md-12 start-xs col-xs-6">
          <p>Storyline Idle</p>
      </div>
      <div class="header-info hidden-md hidden-lg end-xs col-xs-6">
          <p>{{money}}</p>
          <p>Stage: {{currentStage}}</p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  computed:{
    currentStage(){
      return this.$store.state.playerData.currentStage;
    },
    money(){
      return this.$currenctFormatter.format(this.$store.state.playerData.money);
    },
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
    .logo{
      display: flex;
      align-items: center
    }
    .logo p{
        font-size: 1.25rem;
        margin: 0;
        font-weight: bold;
        display: flex;
        align-items: center
    }

    @media only screen and (min-width: 48em) {
      .logo p{
        font-size: 1.25rem;
      }
    }

    .header-info p{
      margin: 6px;
    }

}
</style>
