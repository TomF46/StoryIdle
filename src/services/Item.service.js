import ItemData from '../data/items.json'

const itemService = {
    getAllItems(){
        return ItemData.items;
    },
    getItem(id){
        return ItemData.items.find(item => item.id == id);
    },
    getBuyableItems(stage){
        return ItemData.items.filter(item => item.buyable && stage >= item.stageUnlocked);
    }
}

export default itemService;