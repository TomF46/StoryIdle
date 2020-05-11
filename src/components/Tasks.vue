<template>
    <div class="tasks">
        <p>Tasks</p>
        <div v-for="(task, i) in tasks" :key="i">
            <task  :task="task" :userTaskData="getUserTaskData(task)"></task>
        </div>
    </div>
</template>

<script>
import Task from './Task'
import Tasks from '../data/tasks.json'
export default {
  name: 'Tasks',
  components:{
     Task
  },
  computed: {
    tasks() {
      return Tasks.tasks
    },
    userTaskData(){
      return this.$store.state.playerData.taskData;  
    }
  },
  methods:{
      getUserTaskData(id){
          return this.$store.state.playerData.taskData.find(task => task.id == id);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
