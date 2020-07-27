<template>
  <div class="shop">
    <div class="row">
      <div class="col-xs-12">
        <p class="page-title">Shop</p>
      </div>
      <div class="col-xs-12">
        <p class="page-title">{{money}}</p>
      </div>
      <div class="col-xs-5 col-md-3">
        <input class="search-box" v-model="searchTerm" placeholder="Search for item">
      </div>
      <div class="col-xs-5 col-xs-offset-2 col-md-3 col-md-offset-6">
        <v-select v-model="amountToBuy" :options="amountToBuyOptions" :clearable="false" />
      </div>
    </div>
    <div class="shelves row">
      <div v-for="(item, i) in searchResults" :key="i" class="col-xs-6 col-sm-4 col-lg-3">
        <div class="item-card row pointer" @click="buyItem(item)">
          <div class=" col-xs-12">
            <p class="card-title">{{item.name}}</p>
          </div>
          <div class=" col-xs-12 center-xs">
            <img class="icon" :alt="item.name" :src="item.icon" />
          </div>
          <button class="card-button pointer">£{{calculateTotalCost(item.value)}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shop',
  data: function() {
    return {
      searchTerm: "",
      amountToBuy: 1,
      amountToBuyOptions: [1,5,10,100]
    };
  },
  computed:{
      currentStage(){
        return this.$store.state.playerData.currentStage;
      },
      shopItems(){
          return this.$itemService.getBuyableItems(this.currentStage)
      },
      searchResults(){
        if(!this.searchTerm) return this.shopItems;

        return this.shopItems.filter(x => x.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      },
      money(){
        return this.$currenctFormatter.format(this.$store.state.playerData.money);
      },
  },
  methods:{
      buyItem(item){
          this.$store.dispatch("buyItem", {item: item, amount: this.amountToBuy});
      },
      calculateTotalCost(unitPrice){
        return unitPrice * this.amountToBuy;
      }
  }
}
</script>

<style lang="scss">
.shop{
  .item-card .icon{
    padding-bottom: 60px;
  }
}
</style>