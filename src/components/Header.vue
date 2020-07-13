<template>
    <div class="header row">
      <div class="logo center-md col-md-12 start-xs col-xs-6">
          <p>Storyline Idle</p>
      </div>
      <div class="header-info hidden-md hidden-lg end-xs col-xs-6">
          <div class="info-container">
            <p>{{money}}</p><br>
            <p class="stage">Stage: {{currentStage}}</p>
          </div>
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
    box-shadow: 1px 4px 2px -2px #0c3b5b;
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

    .header-info{
      .info-container{
        background-color: #387fa1;
        box-shadow: inset 0 4px 2px -2px #0c3b5b;
        display: inline-block;
        margin-top: 8px;
        border-radius: 5px;
        p{
          margin: 4px;
          display: inline-block;
        }
        .stage{
          margin-top: 0;
        }
      }
    }
}
</style>
