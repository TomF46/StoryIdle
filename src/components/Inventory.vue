<template>
    <div class="inventory">
        <p class="center-text">Quick Inventory</p>
        <ul>
            <li>{{money}} </li>
            <li v-for="(item, i) in inventory" :key="i">{{getItemName(item.id)}} - {{item.amount}}</li>
        </ul>
    </div>
</template>

<script>
import Items from '../data/items'
export default {
  name: 'Inventory',
  computed: {
    money(){
      return this.$currenctFormatter.format(this.$store.state.playerData.money);
    },
    inventory() {
      return this.$store.state.playerData.inventory;
    },
  },
  methods:{
      getItemName(id){
        var item = Items.items.find(x => x.id == id);
        return item.name;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
