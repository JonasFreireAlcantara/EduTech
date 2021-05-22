<template>
  <div id='kanban'>
    <div class='d-flex justify-content-center'>
      <div class='min-vh-100 d-flex overflow-auto py-5'>
        <div
          v-for='column in columns'
          :key='column.title'
          class='bg-secondary rounded-lg px-3 py-3 column-width rounded'
          style="margin-right: 20px;"
        >
          <p class='text-white' style="font-weight: bold; font-size: 0.875rem;">{{column.title}}</p>
          <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
          <draggable :list='column.tasks' :animation='200' ghost-class='ghost-card' group='tasks' :emptyInsertThreshold="100">
            <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
            <task-mini-card
              v-for='(task) in column.tasks'
              :key='task.id'
              :task='task'
              class='mt-3'
              style="cursor: move;"
            ></task-mini-card>
          </draggable>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import draggable from 'vuedraggable'
import TaskMiniCard from './TaskMiniCard.vue'
export default {
  name: 'App',
  components: {
    TaskMiniCard,
    draggable
  },
  methods: {
    log: function (evt) {
      window.console.log(this.columns)
    }
  },
  data () {
    return {
      columns: [
        {
          title: 'Backlog',
          tasks: [
            {
              id: 1,
              title: 'Add discount code to checkout page',
              date: 'Sep 14',
              type: 'Feature Request'
            },
            {
              id: 2,
              title: 'Provide documentation on integrations',
              date: 'Sep 12'
            },
            {
              id: 3,
              title: 'Design shopping cart dropdown',
              date: 'Sep 9',
              type: 'Design'
            }
          ]
        },
        {
          title: 'In Progress',
          tasks: [
            {
              id: 6,
              title: 'Design shopping cart dropdown',
              date: 'Sep 9',
              type: 'Design'
            },
            {
              id: 7,
              title: 'Add discount code to checkout page',
              date: 'Sep 14',
              type: 'Feature Request'
            }
          ]
        },
        {
          title: 'Done',
          tasks: [
            {
              id: 14,
              title: 'Add discount code to checkout page',
              date: 'Sep 14',
              type: 'Feature Request'
            },
            {
              id: 15,
              title: 'Design shopping cart dropdown',
              date: 'Sep 9',
              type: 'Design'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.column-width {
  min-width: 320px;
  width: 320px;
}
/* Unfortunately @apply cannot be setup in codesandbox,
but you'd use '@apply border opacity-50 border-blue-500 bg-gray-200' here */
.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}
</style>
