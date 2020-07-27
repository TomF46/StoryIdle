import Mutations from './modules/mutations'
import Actions from './modules/actions'


const playerData = {
  state: {
      money: 0,
      log: [],
      inventory: [],
      stats: {
        tasks: [],
        totalMoneyEarned: 0,
        totalMoneySpent: 0,
      },
      currentStage: 1,
      activeTask: null
  },
  mutations: Mutations,
  actions: Actions
}

export default playerData;

