<template>
  <div class='task-wrapper bg-white shadow rounded px-3 pt-3 pb-1 border border-white'>

    <div class="task-info-wrapper">
      <div class='task-title-resume-wrapper pt-2 pb-4'>
        <div class="task-title-wrapper">
          <h5 class='task-title mb-4'>{{task.title}}</h5>
          <h5 class="task-edit-icon ml-2 rounded"><b-icon icon="pencil-square"></b-icon></h5>
        </div>
        <p class='task-resume'>{{getResume(task)}}</p>
      </div>

      <div>
        <span class='task-clock-icon'><b-icon icon="clock"></b-icon></span>
        <span class='task-date font-weight-bold ml-2'>{{task.startDate}} - {{task.endDate}}</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    task: {
      type: Object,
      default: () => ({})
    }
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

  .task-edit-icon {
    cursor: pointer;
    padding: 5px;
    height: fit-content;
    transition: all 0.2s ease-in;
  }

  .task-edit-icon:hover {
    background-color: var(--text-gray-color);
    color: white;
  }

</style>
