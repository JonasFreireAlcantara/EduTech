<template>
  <b-modal :id="`${origin}task${task._id}`" title="Detalhes da Tarefa" size="xl" hide-footer header-class="text-dark" header-close-content="<h2>&times;</h2>" scrollable>
    <b-container fluid>
      <div class="container">

        <div class="row mt-5 d-flex align-items-center">
          <h1 class='col-11 card-title text-center' v-show="!editMode">{{task.name}}</h1>
          <input class="card-title-input col-11 card-title text-center border-black" type="text" v-show="editMode" v-model="task.name">
          <h5 class="col-1 d-flex justify-content-center" @click="editMode = !editMode"><b-icon class="card-edit-icon rounded" icon="pencil-square"></b-icon></h5>
        </div>

        <div class="row py-3"><hr class="col-12"></div>

        <div class=''>
          <div class="row">
            <h3 class="col-12">Data</h3>
          </div>
          <div class='row'>
            <span class='card-clock-icon'><b-icon icon="clock"></b-icon></span>
            <span class='card-date font-weight-bold ml-2'>
              {{new Date(task.startDate).toLocaleDateString('pt-BR')}} - {{new Date(task.dueDate).toLocaleDateString('pt-BR')}}
            </span>
          </div>
          <div class="row" v-show="editMode">
            <div class="col-6 col-xl-3">
              <label for="example-datepicker">Data de Início</label>
              <b-form-datepicker v-model="task.startDate" class="mb-2" value-as-date></b-form-datepicker>
            </div>
            <div class="col-6 col-xl-3">
              <label for="example-datepicker">Data de Fim</label>
              <b-form-datepicker v-model="task.dueDate" class="mb-2" value-as-date></b-form-datepicker>
            </div>
          </div>
        </div>

        <div class="row py-3"><hr class="col-12"></div>

        <div class='card-description-wrapper mt-5'>
          <h3>Descrição</h3>
          <p class='card-description text-justify mt-3' v-show="!editMode">{{task.description}}</p>
          <textarea
            class='card-description-textarea card-description text-justify mt-3 '
            cols="10"
            rows="10"
            placeholder="Digite aqui descrição"
            v-model="task.description"
            v-show="editMode"
          ></textarea>
          
        </div>

        <div class="row"></div>

        <div class="row py-3"><hr class="col-12" ></div>

        <div class='card-todo-wrapper mt-5'>
          <h3>Tarefas</h3>
          <div class="card-todo mt-3">
            <ToDoList
              list-name="Tarefas"
              v-bind:todos="task.toDos"
              @todoChange='handleTodoChange(task, $event)' />
          </div>
        </div>

        <div class="row d-flex justify-content-end mt-5">
          <v-btn class="mx-2 bg-danger text-white" x-large @click="handleDeleteTask">Excluir</v-btn>
          <v-btn class="mx-2 bg-primary text-white" x-large @click="handleSaveTask" v-show="editMode">Salvar</v-btn>
        </div>

      </div>
    </b-container>
  </b-modal>
</template>

<script>
import ToDoList from '../todo/TodoList'

export default ({
  components: {
    ToDoList
  },
  data () {
    return {
      editMode: false
    }
  },
  props: {
    origin: String,
    task: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleTodoChange (task, $event) {
      task.todos = $event.todos
      this.$emit('saveTask', task)
    },
    handleSaveTask () {
      this.editMode = !this.editMode
      this.$emit('saveTask', this.task)
    },
    async handleDeleteTask () {
      const del = await this.$bvModal.msgBoxConfirm('Você realmente deseja apagar esta tarefa?', { title: 'Excluir', okVariant: 'danger' })
      if (!del) {
        return
      }
      this.$emit('deleteTask', this.task)
    }
  }
})
</script>

<style scoped>

  .card-description-textarea {
    width: 100%;
    padding: 0.3em 0.5em;
    border: 1px solid #584188;
  }

  .card-title {
    font-size: 2.5em;
  }

  .card-title-input {
    border: 1px solid #584188;
  }

  .card-date-wrapper > h3 {
    font-size: 2em;
  }

  .card-clock-icon {
    font-size: 2em;
  }

  .card-date {
    font-size: 1.5em;
    display: flex;
    align-items: center;
  }

  .card-description {
    font-size: 1.2em;
  }

  .card-edit-icon {
    cursor: pointer;
    padding: 5px;
    font-size: 2em;
    height: fit-content;
    transition: all 0.2s ease-in;
  }

  .card-edit-icon:hover {
    background-color: #584188;
    color: white;
  }

</style>
