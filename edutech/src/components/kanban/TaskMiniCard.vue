<template>
  <div class='task-wrapper bg-white shadow rounded px-3 pt-3 pb-1 border border-white'>
    <TaskCardModal
      :task="task"
      :origin="origin"
      @saveTask="$emit('saveTask', $event)"
      @deleteTask="$emit('deleteTask', $event)" />

    <div class="task-info-wrapper">
      <div class='task-title-resume-wrapper pt-2 pb-4'>
        <div class="task-title-wrapper d-flex justify-content-between">
          <a v-b-modal="`${origin}task${task._id}`"><h5 class='task-title mb-4'>{{task.name}}</h5></a>
        </div>

        <p class='task-resume'>{{getResume(task)}}</p>
      </div>

      <div v-if="!isMinimized">
        <span class='task-clock-icon'><b-icon icon="clock"></b-icon></span>
        <span class='task-date font-weight-bold ml-2'>
          {{new Date(task.startDate).toLocaleDateString('pt-BR')}} - {{new Date(task.dueDate).toLocaleDateString('pt-BR')}}
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import TaskCardModal from './taskCardModal'

export default {
  components: {
    TaskCardModal
  },
  props: {
    origin: String,
    task: {
      type: Object,
      default: () => ({})
    },
    isMinimized: Boolean
  },
  methods: {
    getResume (task) {
      const MAX_SIZE = 50

      const { description = '' } = task
      
      let resume = description.slice(0, MAX_SIZE)
      resume += (description.length > MAX_SIZE) ? ' ...' : ''

      return task.resume || resume
    }
  },
  computed: {
    badgeColor () {
      const mappings = {
        Design: 'purple',
        'Feature Request': 'teal',
        Backend: 'blue',
        QA: 'green',
        default: 'teal'
      }
      return mappings[this.task.type] || mappings.default
    }
  }
}
</script>

<style scoped>

  .task-wrapper {
    --text-gray-color: rgb(100, 100, 100);
    color: var(--text-gray-color);

  }

  .task-title-wrapper {
    display: flex;
  }

  .task-title {
    font-size: 1.15em;
  }

  .task-clock-icon {
    font-size: 1.3em;
  }

</style>
