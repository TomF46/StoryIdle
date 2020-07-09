<template>
  <div class="shop">
    <div class="row">
      <div class="col-xs-12">
        <p class="page-title">Inventory</p>
      </div>
      <div class="col-xs-12">
        <p class="page-title">{{money}}</p>
      </div>
      <div class="col-xs-5 col-md-3">
        <input class="search-box" v-model="searchTerm" placeholder="Search for item">
      </div>
      <div class="col-xs-5 col-xs-offset-2 col-md-3 col-md-offset-6">
        <v-select v-model="amountToSell" :options="amountToSellOptions" :clearable="false" />
      </div>
    </div>
    <div class="shelves row">
      <div v-for="(item, i) in searchResults" :key="i" class="col-xs-6 col-sm-4 col-md-3">
        <div class="shop-card">
          <p class="card-title">{{item.name}}</p>
          <p class="card-text center-text">Stock {{item.amount}}</p>
          <button v-if="item.canBeSold" class="card-button pointer" @click="sellItem(item)">Sell {{amountToSell}} £{{getTotalValue(item.value)}}</button>
          <button v-if="!item.canBeSold" class="card-button cant-sell">Not for resale</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inventory',
  data: function() {
    return {
      searchTerm: "",
      amountToSell: 1,
      amountToSellOptions: [1,5,10,100]
    };
  },
  computed:{
      inventoryItems(){
          var inventory = this.$store.state.playerData.inventory;

          var items = [];

          inventory.forEach(item => {
             var copy = this.$itemService.getItem(item.id);
             copy.amount = item.amount;
             items.push(copy);
          });
          return items;
      },
      searchResults(){
        if(!this.searchTerm) return this.inventoryItems;

        return this.inventoryItems.filter(x => x.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      },
      money(){
        return this.$currenctFormatter.format(this.$store.state.playerData.money);
      },
  },
  methods:{
      sellItem(item){
          this.$store.dispatch("sellItem", {item: item, amount: this.amountToSell});
      },
      getTotalValue(unitPrice){
        return unitPrice * this.amountToSell;
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

  .card-button.cant-sell{
  background-color: #404040;
}
}

.shop-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>