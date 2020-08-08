<template>
  <div class="quick-inventory">
    <p class="side-pane-title">Quick Inventory</p>
    <ul>
      <li>{{money}}</li>
      <li v-for="(item, i) in inventory" :key="i">{{getItemName(item.id)}}: {{item.amount}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "QuickInventory",
  computed: {
    money() {
      return this.$currenctFormatter.format(this.$store.state.playerData.money);
    },
    inventory() {
      return this.$store.state.playerData.inventory;
    },
  },
  methods: {
    getItemName(id) {
      var item = this.$itemService.getItem(id);
      return item.name;
    },
  },
};
</script>

<style scoped lang="scss">
.quick-inventory {
  ul {
    list-style: none;
    padding-left: 10px;
    li {
      margin-bottom: 4px;
      font-size: 0.8rem;
    }
  }
}
</style>
