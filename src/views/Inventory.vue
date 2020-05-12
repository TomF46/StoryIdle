<template>
  <div class="shop">
    <div class="row">
      <div class="col-xs-12">
        <p class="shop-title">Inventory</p>
      </div>
      <div class="col-xs-12">
        <p class="shop-title">{{money}}</p>
      </div>
    </div>
    <div class="shelves row">
      <div v-for="(item, i) in inventoryItems" :key="i" class="col-xs-3">
        <div class="shop-card">
          <p class="card-title">{{item.name}}</p>
          <p class="card-text center-text">Stock {{item.amount}}</p>
          <button v-if="item.canBeSold" class="card-button" @click="sellItem(item)">Sell single £{{item.value}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Items from '../data/items.json'
export default {
  name: 'Inventory',
  computed:{
      inventoryItems(){
          var inventory = this.$store.state.playerData.inventory;

          var items = [];

          inventory.forEach(item => {
             var copy = Items.items.find(x => x.id == item.id);
             copy.amount = item.amount;
             items.push(copy);
          });
          return items;
      },
      money(){
        return this.$currenctFormatter.format(this.$store.state.playerData.money);
      },
  },
  methods:{
      sellItem(item){
          this.$store.dispatch("sellItem", item);
      }
  }
}
</script>

<style lang="scss">
.shop {
  margin: 0 5vw;
}
.shop-title {
  text-align: center;
  font-size: 2rem;
}

.shop-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin: 10px;
  min-height: 10vh;

  .card-title {
    text-align: center;
    font-size: 1.25rem;
  }
  .card-button {
    margin: 0 auto;
    display: block;
    padding: 10px;
  }
}

.shop-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>