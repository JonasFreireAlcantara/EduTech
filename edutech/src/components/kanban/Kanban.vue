<template>
  <div id='kanban'>
    <CreateKanbanColumnModal @columnCreate="handleColumnCreate" />

    <div class='mt-4'>
      <div class='d-flex justify-content-start'>
        <div
          v-for='column in columns'
          :key='column.title'
          class='bg-primary rounded-lg px-4 py-4 mr-5 column-width rounded kanban-column'
        >
          <div class="d-flex justify-content-between align-items-center">
            <h3 class='kanban-column-title mb-4 text-white'>{{column.title}}</h3>
            <h5 class='kanban-column-delete-icon ml-2 rounded py-1 px-1' @click="handleColumnDelete(column)"><b-icon icon="trash-fill"></b-icon></h5>
          </div>

          <draggable :list='column.tasks' :animation='200' ghost-class='ghost-card' group='tasks' :emptyInsertThreshold="100">
            <task-mini-card
              v-for='(task) in column.tasks'
              :key='task.id'
              :task='task'
              class='mt-4'
              style="cursor: move;"
              @saveTask="handleTaskSave"
              @deleteTask="handleTaskDelete"
            ></task-mini-card>
          </draggable>

          <div class="d-flex justify-content-center align-items-center pt-4">
            <v-btn class="mx-2 bg-white text-primary" fab dark @click="handleTaskCreate(column)"><v-icon dark>mdi-plus</v-icon></v-btn>
          </div>
        </div>

        <v-btn class="mx-2 bg-primary" fab dark v-b-modal.create-kanban-column-modal><v-icon dark>mdi-plus</v-icon></v-btn>
      </div>
    </div>
  </div>

</template>

<script>
import draggable from 'vuedraggable'
import TaskMiniCard from './TaskMiniCard'
import CreateKanbanColumnModal from './createKanbanColumnModal'

export default {
  name: 'App',
  components: {
    TaskMiniCard,
    draggable,
    CreateKanbanColumnModal
  },
  methods: {
    log: function (evt) {
      window.console.log(this.columns)
    },
    handleColumnCreate ($event) {
      this.columns.push({
        title: $event.name,
        tasks: []
      })
      this.$bvModal.hide('create-kanban-column-modal')
    },
    async handleColumnDelete (column) {
      const del = await this.$bvModal.msgBoxConfirm('Você realmente deseja apagar esta coluna e todas tasks relacionadadas?', { title: 'Excluir' })
      if (!del) {
        return
      }
      this.columns = this.columns.filter(col => col.title !== column.title)
    },
    handleTaskDelete (task) {
      this.columns.forEach(column => {
        column.tasks = column.tasks.filter(t => t.id !== task.id)
      })
    },
    handleTaskCreate (column) {
      const newTask = {
        title: 'Nova Tarefa',
        description: '',
        resume: '',
        column: column.title,
        startDate: new Date(),
        endDate: new Date(),
        todos: []
      }
      // TODO send create request to API
      newTask.id = Math.floor((Math.random() * 10000000) + 1) // get this info from API
      column.tasks.push(newTask)
    },
    handleTaskSave (task) {
      console.log('handleTaskSave')
      console.log(task)
    }
  },
  data () {
    return {
      columns: [
        {
          id: 1,
          title: 'Backlog',
          tasks: [
            {
              id: 1,
              title: 'Atividades do dia de semana',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nam vehicula ipsum non tellus porttitor finibus. Mauris pharetra dictum urna eget fermentum. Suspendisse et purus massa. Nunc varius iaculis magna, at lacinia neque mattis ac. Proin aliquet est eu sagittis rhoncus. In hendrerit augue eu erat luctus congue. Phasellus a velit vitae risus convallis egestas sed sed nulla. Vestibulum ut quam fermentum, aliquet augue eu, hendrerit ex. Fusce et odio id eros commodo ultricies. Proin vestibulum dapibus vestibulum. Integer vehicula consequat urna, in scelerisque nunc porttitor eget. Aenean efficitur mauris in dictum rutrum. Nullam dictum ultrices pulvinar. Donec efficitur nulla tellus, a aliquet ligula scelerisque id. Quisque non porta velit, non laoreet nunc. Nunc et elit sed magna condimentum ultrices.',
              resume: 'Esse é um pequeno resumo de exemplo.',
              startDate: new Date(),
              endDate: new Date(),
              todos: [
                { description: 'Lavar as louças', completed: false },
                { description: 'Fazer prova de lógica', completed: false },
                { description: 'Dar banho no cachorro', completed: true }
              ]
            },
            {
              id: 2,
              title: 'Provide documentation on integrations',
              description: 'Curabitur ac enim viverra, ultrices mi in, rhoncus libero. Nam lacinia sem ut nisl posuere malesuada. Etiam vitae leo dignissim, fringilla velit vitae, egestas dui. In ullamcorper volutpat massa, id pellentesque sapien tincidunt nec. Maecenas nec commodo sapien. Sed suscipit nisl quis tortor luctus fringilla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi. Nullam imperdiet feugiat nisl sed pretium. Suspendisse laoreet tristique sem vitae mattis.',
              startDate: new Date(),
              endDate: new Date()
            },
            {
              id: 3,
              title: 'Design shopping cart dropdown',
              startDate: new Date(),
              endDate: new Date(),
              type: 'Design'
            }
          ]
        },
        {
          id: 2,
          title: 'In Progress',
          tasks: [
            {
              id: 6,
              title: 'Design shopping cart dropdown',
              startDate: new Date(),
              endDate: new Date(),
              type: 'Design'
            },
            {
              id: 7,
              title: 'Add discount code to checkout page',
              startDate: new Date(),
              endDate: new Date(),
              type: 'Feature Request'
            }
          ]
        },
        {
          id: 3,
          title: 'Done',
          tasks: [
            {
              id: 14,
              title: 'Add discount code to checkout page',
              startDate: new Date(),
              endDate: new Date(),
              type: 'Feature Request'
            },
            {
              id: 15,
              title: 'Design shopping cart dropdown',
              startDate: new Date(),
              endDate: new Date(),
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
.kanban-column {
  box-shadow: 0px 0px 10px rgba(0,0,0,0.6);
}

.kanban-column-title {
  font-size: 1.8em;
  font-weight: bold;
}
.column-width {
  min-width: 320px;
  width: 380px;
}
.kanban-column-delete-icon {
  color: white;
  font-size: 1.5em;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.kanban-column-delete-icon:hover {
    background-color: white;
    color: #584188;
  }
/* Unfortunately @apply cannot be setup in codesandbox,
but you'd use '@apply border opacity-50 border-blue-500 bg-gray-200' here */
.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}
</style>
