import Mutations from './modules/mutations'
import Actions from './modules/actions'
import StageData from '../../../data/stages.json'
import LogEnum from '../../../data/enums/LogItems.Enum'
import Tasks from '../../../data/tasks.json'


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

