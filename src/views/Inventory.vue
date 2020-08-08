<template>
  <div class="inventory">
    <div class="row">
      <div class="col-xs-12">
        <p class="page-title">Inventory</p>
      </div>
      <div class="col-xs-12">
        <p class="page-title">{{ money }}</p>
      </div>
      <div class="col-xs-5 col-md-3">
        <input
          class="search-box"
          v-model="searchTerm"
          placeholder="Search for item"
        />
      </div>
      <div class="col-xs-5 col-xs-offset-2 col-md-3 col-md-offset-6">
        <v-select
          v-model="amountToSell"
          :options="amountToSellOptions"
          :clearable="false"
        />
      </div>
    </div>
    <div class="shelves row">
      <div
        v-for="(item, i) in searchResults"
        :key="i"
        class="col-xs-6 col-sm-4 col-lg-3"
      >
        <div
          class="item-card row"
          :class="canSellCss(item.canBeSold)"
          @click="sellItem(item)"
        >
          <div class="col-xs-12">
            <p class="card-title">{{ item.name }}</p>
          </div>
          <div class="col-xs-12 center-xs">
            <img class="icon" :alt="item.name" :src="item.icon" />
          </div>
          <div class="col-xs-12">
            <p class="card-text center-text">Stock {{ item.amount }}</p>
          </div>
          <button v-if="item.canBeSold" class="card-button pointer">
            Sell {{ amountToSell }} £{{ getTotalValue(item.value) }}
          </button>
          <button v-if="!item.canBeSold" class="card-button cant-sell">
            Not for resale
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Inventory",
  data: function() {
    return {
      searchTerm: "",
      amountToSell: 1,
      amountToSellOptions: [1, 5, 10, 100],
    };
  },
  computed: {
    inventoryItems() {
      let items = [];

      this.$store.state.playerData.inventory.forEach((item) => {
        let copy = this.$itemService.getItem(item.id);
        copy.amount = item.amount;
        items.push(copy);
      });
      return items;
    },
    searchResults() {
      if (!this.searchTerm) return this.inventoryItems;

      return this.inventoryItems.filter((x) =>
        x.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    money() {
      return this.$currenctFormatter.format(this.$store.state.playerData.money);
    },
  },
  methods: {
    sellItem(item) {
      if (!item.canBeSold) return;
      this.$store.dispatch("sellItem", {
        item: item,
        amount: this.amountToSell,
      });
    },
    getTotalValue(unitPrice) {
      return unitPrice * this.amountToSell;
    },
    canSellCss(canBeSold) {
      return canBeSold ? "pointer" : "";
    },
  },
};
</script>

<style lang="scss">
.inventory {
  .card-button.cant-sell {
    background-color: #404040;
  }
  .item-card .icon {
    padding-bottom: 10px;
  }
}
</style>
