import store from "../store/index";
import itemService from "./Item.service";
import alertService from "./alert.service";

const inventoryService = {
  getUserInventory() {
    return store.state.playerData.inventory;
  },
  getUsersItem(itemId) {
    return store.state.playerData.inventory.find((item) => item.id == itemId);
  },
  checkUserHasItem(itemId) {
    var userItem = this.getUsersItem(itemId);

    return userItem != null;
  },
  checkUserHasItemAmount(itemId, amount) {
    var userItem = this.getUsersItem(itemId);

    if (userItem == null) return false;

    return amount >= userItem.amount;
  },
  checkUserHasItems(items) {
    var hasItems = true;

    items.forEach((item) => {
      if (!hasItems) return;
      hasItems = this.checkUserHasItemAmount(item.id, item.amount);
    });

    return hasItems;
  },
  addItemToInventory(item) {
    var inventoryItem = this.getUsersItem(item.id);
    var itemData = itemService.getItem(item.id);

    alertService.notification(
      "success",
      "Obtained item",
      `${itemData.name} X ${item.amount}`
    );

    if (inventoryItem) {
      inventoryItem.amount += item.amount;
      return;
    }

    store.commit("addItemToInventory", { id: item.id, amount: item.amount });
    store.dispatch("checkIfLevelUp");
  },
  removeItemFromInventory(item) {
    var inventoryItem = this.getUsersItem(item.id);

    if (inventoryItem == null) return;

    inventoryItem.amount -= item.amount;

    if (inventoryItem.amount <= 0) {
      var index = store.state.playerData.inventory.indexOf(inventoryItem);
      store.commit("removeInventoryItemAtIndex", index);
    }
  },
};

export default inventoryService;
