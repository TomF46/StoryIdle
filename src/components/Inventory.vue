<template>
    <div class="inventory">
        <p>Inventory</p>
        <ul>
            <li v-for="(item, i) in inventory" :key="i">{{getItemName(item.itemId)}} - {{item.amount}}</li>
        </ul>
    </div>
</template>

<script>
import Items from '../data/items'
export default {
  name: 'Inventory',
  computed: {
    inventory() {
      return this.$store.state.playerData.inventory;
    },
  },
  methods:{
      getItemName(id){
        console.log(id);
        console.log(Items)
        var item = Items.items.find(x => x.id == id);
        return item.name;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
