<template>
    <div class="header row center-xs">
        <div class="logo">
            <p>Storyline Idle <button class="reset-button" @click="confirmReset">Reset</button></p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  methods:{
    navigate(link){
      this.$router.push(link);
    },
    confirmReset(){
      var consent = confirm("Are you sure you want to reset all progression?")
      if(consent) this.reset();
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
