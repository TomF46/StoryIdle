const mutations = {
  addToLog(state, log) {
    const timestamp = new Date().getTime();
    let logItem = {
      timestamp: new Date(timestamp),
      text: log.text,
      type: log.type,
    };
    state.log.push(logItem);
  },
  removeLog(state, log) {
    state.log = state.log.filter((storedLog) => storedLog != log);
  },
  addMoney(state, amount) {
    state.money += amount;
    state.stats.totalMoneyEarned += amount;
  },
  subtractMoney(state, amount) {
    state.money -= amount;
    state.stats.totalMoneySpent += amount;
  },
  moveToNextStage(state) {
    state.currentStage++;
  },
  setActiveTask(state, task) {
    state.activeTask = task;
  },
  addItemToInventory(state, item) {
    state.inventory.push(item);
  },
  removeItemFromInventory(state, itemToRemove) {
    state.inventory = state.inventory.filter((item) => item != itemToRemove);
  },
};

export default mutations;
