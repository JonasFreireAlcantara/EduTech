<template>
  <div id='kanban'>
    <CreateKanbanColumnModal @columnCreate="handleColumnCreate" />

    <div :class="{'spinner': true, 'spinner-active': loading}">
      <b-spinner type="grow"></b-spinner>
    </div>

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

          <draggable
              :list='getTasksByColumn(column)'
              :animation='200'
              ghost-class='ghost-card'
              group='tasks'
              :emptyInsertThreshold="100"
              @change="handlePositionChange(column, $event)">
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
    setLoading (timeSleep) {
      this.loading = true
      setTimeout(function () { this.loading = false }.bind(this), timeSleep)
    },
    async handlePositionChange (column, $event) {
      const { added, moved, removed } = $event

      if (added) {
        this.setLoading(2000)
        const { element, newIndex } = added
        const tasksOfColumn = this.workspace.tasks.filter(task => task.column === column._id)
        tasksOfColumn.sort((first, second) => first.columnIndex - second.columnIndex)
        element.column = column._id
        tasksOfColumn.splice(newIndex, 0, element)
        tasksOfColumn.forEach((task, index) => {
          task.columnIndex = index
          axios.put(`task/${task._id}`, task)
        })
        await axios.put(`workspace/${this.workspace._id}`, this.workspace).then(() => this.$store.dispatch('loadWorkspaces'))
      } else if (moved) {
        this.setLoading(2000)
        const { element, oldIndex, newIndex } = moved
        const tasksOfColumn = this.workspace.tasks.filter(task => task.column === column._id)
        tasksOfColumn.sort((first, second) => first.columnIndex - second.columnIndex)
        tasksOfColumn.splice(oldIndex, 1)
        tasksOfColumn.splice(newIndex, 0, element)
        tasksOfColumn.forEach((task, index) => {
          task.columnIndex = index
          axios.put(`task/${task._id}`, task)
        })
        await axios.put(`workspace/${this.workspace._id}`, this.workspace).then(() => this.$store.dispatch('loadWorkspaces'))
      } else if (removed) {
        const { oldIndex } = removed
        const tasksOfColumn = this.workspace.tasks.filter(task => task.column === column._id)
        tasksOfColumn.sort((first, second) => first.columnIndex - second.columnIndex)
        tasksOfColumn.splice(oldIndex, 1)
        tasksOfColumn.forEach((task, index) => {
          task.columnIndex = index
          axios.put(`task/${task._id}`, task)
        })
        await axios.put(`workspace/${this.workspace._id}`, this.workspace).then(() => this.$store.dispatch('loadWorkspaces'))
      }
    },
    async handleColumnCreate ($event) {
      this.setLoading(2000)
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
      this.setLoading(3000)
      const tasksOfColumn = this.workspace.tasks.filter(task => task.column === column._id)
      tasksOfColumn.forEach(task => {
        axios.delete(`task/${task._id}`, task)
      })
      await axios.delete(`column/${column._id}`).then((res) => { this.workspace.columns = this.workspace.columns.filter(el => el._id !== column._id) })
      await axios.put(`workspace/${this.workspace._id}`, this.workspace).then(() => this.$store.dispatch('loadWorkspaces'))
    },
    async handleTaskDelete (task) {
      this.setLoading(2000)
      await axios.delete(`task/${task._id}`).then(() => { this.$store.dispatch('loadWorkspaces') })
    },
    async handleTaskCreate (column) {
      this.setLoading(2000)
      const newTask = {
        name: 'Nova Tarefa',
        description: '',
        startDate: new Date(),
        dueDate: new Date(),
        icon: null,
        label: null,
        toDos: [],
        column: column._id,
        columnIndex: this.getTasksByColumn(column).length
      }
      await axios.post('task', newTask).then((res) => { this.workspace.tasks.push(res.data._id) })
      await axios.put(`workspace/${this.workspace._id}`, this.workspace).then(() => this.$store.dispatch('loadWorkspaces'))
    },
    async handleTaskSave (task) {
      var formData = new FormData()
      var imagefile = task.icon
      formData.append('file', imagefile)
      formData.append('_id', task._id)
      formData.append('name', task.name)
      formData.append('description', task.description)
      formData.append('startDate', task.startDate)
      formData.append('dueDate', task.dueDate)
      formData.append('label', task.label)
      formData.append('toDos', task.toDos)
      formData.append('column', task.column)
      formData.append('columnIndex', task.columnIndex)
      console.log(formData)
      await axios.put(`task/${task._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => { this.$store.dispatch('loadWorkspaces') })
      /* await axios.put(`task/${task._id}`, task).then(() => { this.$store.dispatch('loadWorkspaces') }) */
    },
    getTasksByColumn (column) {
      const tasks = this.workspace.tasks.filter(el => el.column === column._id)
      tasks.sort((first, second) => first.columnIndex - second.columnIndex)
      return tasks
    }
  },
  data () {
    return {
      id: this.$route.params.id,
      loading: false
    }
  }
}
</script>

<style scoped>
.spinner {
  opacity: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  background-color: rgba(255,255,255,0.9);
  transition: opacity 0.1s ease-out;
  z-index: 10;
}

.spinner-active {
  opacity: 1;
  width: 100%;
  height: 100%;
}

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
