<template>
  <div id='kanban'>
    <CreateKanbanColumnModal @columnCreate="handleColumnCreate" />

    <div class='mt-4'>
      <div class='d-flex justify-content-start pb-5' style="overflow-x: auto;">
        <div
          v-for='column in workspace.columns'
          :key='column._id'
          class='bg-primary rounded-lg px-4 py-4 mr-5 column-width rounded kanban-column'
        >
          <div class="d-flex justify-content-between align-items-center">
            <h3 class='kanban-column-title mb-4 text-white'>{{column.name}}</h3>
            <h5 class='kanban-column-delete-icon ml-2 rounded py-1 px-1' @click="handleColumnDelete(column)"><b-icon icon="trash-fill"></b-icon></h5>
          </div>

          <draggable :list='getTasksByColumn(column)' :animation='200' ghost-class='ghost-card' group='tasks' :emptyInsertThreshold="100">
            <task-mini-card
              v-for='(task) in getTasksByColumn(column)'
              :key='task._id'
              :task='task'
              class='mt-4'
              style="cursor: move;"
              :origin="origin"
              @saveTask="handleTaskSave"
              @deleteTask="handleTaskDelete"
              :isMinimized="isMinimized"
            ></task-mini-card>
          </draggable>

          <div class="d-flex justify-content-center align-items-center pt-4">
            <v-btn class="mx-2 bg-white text-primary" fab :small="isMinimized" dark @click="handleTaskCreate(column)"><v-icon dark>mdi-plus</v-icon></v-btn>
          </div>
        </div>

        <v-btn class="mx-2 bg-primary" fab :small="isMinimized" dark v-b-modal.create-kanban-column-modal><v-icon dark>mdi-plus</v-icon></v-btn>
      </div>
    </div>
  </div>

</template>

<script>
import draggable from 'vuedraggable'
import TaskMiniCard from './TaskMiniCard'
import CreateKanbanColumnModal from './createKanbanColumnModal'
import axios from '../../variables/variables'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    TaskMiniCard,
    draggable,
    CreateKanbanColumnModal
  },
  props: {
    origin: String,
    workspace: Object,
    isMinimized: Boolean
  },
  computed: mapGetters([
    'getWorkspaceById'
  ]),
  methods: {
    log: function (evt) {
      window.console.log(this.workspace.columns)
    },
    async handleColumnCreate ($event) {
      var column = {
        name: $event.name
      }
      await axios.post('column', column).then((res) => { this.workspace.columns.push(res.data._id) })
      await axios.put(`workspace/${this.workspace._id}`, this.workspace).then(() => this.$store.dispatch('loadWorkspaces'))
      this.$bvModal.hide('create-kanban-column-modal')
    },
    async handleColumnDelete (column) {
      const del = await this.$bvModal.msgBoxConfirm('Você realmente deseja apagar esta coluna e todas tasks relacionadadas?', { title: 'Excluir' })
      if (!del) {
        return
      }
      await axios.delete(`column/${column._id}`).then((res) => { this.workspace.columns = this.workspace.columns.filter(el => el._id !== column._id) })
      await axios.put(`workspace/${this.workspace._id}`, this.workspace).then(() => this.$store.dispatch('loadWorkspaces'))
    },
    async handleTaskDelete (task) {
      await axios.delete(`task/${task._id}`).then(() => { this.$store.dispatch('loadWorkspaces') })
    },
    async handleTaskCreate (column) {
      const newTask = {
        name: 'Nova Tarefa',
        description: '',
        startDate: new Date(),
        dueDate: new Date(),
        icon: null,
        label: null,
        toDos: [],
        column: column._id
      }
      await axios.post('task', newTask).then((res) => { this.workspace.tasks.push(res.data._id) })
      await axios.put(`workspace/${this.workspace._id}`, this.workspace).then(() => this.$store.dispatch('loadWorkspaces'))
    },
    async handleTaskSave (task) {
      await axios.put(`task/${task._id}`, task).then(() => { this.$store.dispatch('loadWorkspaces') })
    },
    getTasksByColumn (column) {
      return this.workspace.tasks.filter(el => el.column === column._id)
    }
  },
  data () {
    return {
      id: this.$route.params.id
    }
  }
}
</script>

<style scoped>
.kanban-column {
  box-shadow: 0px 0px 10px rgba(0,0,0,0.6);
}

.kanban-column-title {
  font-size: calc(1.6vw);
  font-weight: bold;
}
.column-width {
  min-width: 10vw;
  width: 33.33vw;
}
.kanban-column-delete-icon {
  color: white;
  font-size: calc(1.2vw);
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

/* width */
::-webkit-scrollbar {
  height: 14px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 14px;
  background: #f1f1f1;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 14px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
