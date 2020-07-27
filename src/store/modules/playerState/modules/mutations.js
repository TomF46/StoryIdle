const mutations = {
    addToLog(state, log) {
        var timestamp = new Date().getTime();
        var logItem = { timestamp: new Date(timestamp), text: log.text, type: log.type };
        state.log.push(logItem);
    },
    removeLog(state, log) {
        var index = state.log.indexOf(log);
        state.log.splice(index, 1);
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
        state.inventory.push(item)
    },
    removeInventoryItemAtIndex(state, index) {
        state.inventory.splice(index, 1);
    }
}

export default mutations;