<template>
    <div class="tasks">
        <p class="center-text">Tasks</p>
        <div v-for="(task, i) in tasks" :key="i">
            <task  :task="task"></task>
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
    }
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
