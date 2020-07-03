<template>
  <div class="shop">
    <div class="row">
      <div class="col-xs-12">
        <p class="page-title">Shop</p>
      </div>
      <div class="col-xs-12">
        <p class="page-title">{{money}}</p>
      </div>
      <div class="col-xs-10">
        <input class="search-box" v-model="searchTerm" placeholder="Search for item">
      </div>
      <div class="col-xs-2">
        <v-select v-model="amountToBuy" :options="amountToBuyOptions" :clearable="false" />
      </div>
    </div>
    <div class="shelves row">
      <div v-for="(item, i) in searchResults" :key="i" class="col-xs-3">
        <div class="shop-card">
          <p class="card-title">{{item.name}}</p>
          <button class="card-button" @click="buyItem(item)">£{{calculateTotalCost(item.value)}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Items from '../data/items.json'
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
          return Items.items.filter(x => x.buyable == true && this.currentStage >= x.stageUnlocked);
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
.shop {
  margin: 0 5vw;
  .v-select{
    margin-right: 10px;
  }
}

.shop-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin: 10px;
  min-height: 10vh;
  position: relative;

  .card-title {
    text-align: center;
    font-size: 1.25rem;
    margin-top: 6px;
  }
  .card-button {
    width: 100%;
    padding: 10px;
    background-color: green;
    margin-top: 6px;
    height: 40px;
    border: none;
    border-top: 1px solid grey;
    position: absolute;
    bottom: 0;
  }
  .card-text{
    padding-bottom: 46px; // to clear card button
  }
}

.shop-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>