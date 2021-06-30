<template>
  <b-modal :id="`${origin}task${task._id}`" title="Detalhes da Tarefa" size="xl" hide-footer header-class="text-dark" header-close-content="<h2>&times;</h2>" scrollable>
    <b-container fluid>
      <div class="container">

        <div class="row mt-5 d-flex align-items-center">
          <b-col cols="3" class="text-right">
            <b-form-group
              id="imageLabel"
              label=""
              label-for="iconInput"
            >
              <b-link class="notify-badge shadow" v-show="editMode" @click="selectImage"><b-icon icon="pencil-square"></b-icon></b-link>
              <img v-if="tempURL===null && !task.icon" :src="defaultIcon" width="150" height="150"/>
              <b-img width="150" height="150" v-if="task.icon && tempURL===null" :src="'http://localhost:5000/api/file/'+task.icon"></b-img>
              <b-img v-if="tempURL!==null" id="iconInput" :src="tempURL" width="150" height="150"></b-img>
              <b-form-file id="fileInput" name="file" :value="file" class="invisible" plain accept="image/*" @change="changeImage"></b-form-file>
            </b-form-group>
          </b-col>
          <b-col cols="6" class="text-center">
            <h1 class='card-title' v-show="!editMode">{{task.name}}</h1>
            <input class="card-title-input card-title text-center border-black" type="text" v-show="editMode" v-model="task.name">
          </b-col>
          <h5 class="col-3 d-flex justify-content-center" title="Editar" @click="editMode = !editMode"><b-icon class="card-edit-icon rounded" icon="pencil-square"></b-icon></h5>
        </div>

        <div class="row py-3"><hr class="col-12"></div>

        <div class=''>
          <div class="row">
            <h3 class="col-12">Data</h3>
          </div>
          <div class='row'>
            <span class='card-clock-icon'><b-icon icon="clock"></b-icon></span>
            <span class='card-date font-weight-bold ml-2'>
              {{new Date(task.startDate).toLocaleDateString('pt-BR')}} {{startTime}} - {{new Date(task.dueDate).toLocaleDateString('pt-BR')}} {{dueTime}}
            </span>
          </div>
          <div class="row" v-show="editMode">
            <div class="col-6 col-xl-3">
              <label for="example-datepicker">Data de Início</label>
              <b-form-datepicker v-model="task.startDate" class="mb-2" value-as-date></b-form-datepicker>
              <b-form-timepicker v-model="startTime" locale="pt-BR"></b-form-timepicker>
            </div>
            <div class="col-6 col-xl-3">
              <label for="example-datepicker">Data de Fim</label>
              <b-form-datepicker v-model="task.dueDate" class="mb-2" value-as-date></b-form-datepicker>
              <b-form-timepicker v-model="dueTime" locale="pt-BR"></b-form-timepicker>
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
      editMode: false,
      startTime: new Date(this.task.startDate).toLocaleTimeString(),
      dueTime: new Date(this.task.dueDate).toLocaleTimeString(),
      defaultIcon: require('../../assets/iconPlaceholder.png'),
      file: null,
      tempURL: null
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
      var startDate = new Date(this.task.startDate)
      var time = this.startTime.split(':')
      startDate.setHours(parseInt(time[0]), parseInt(time[1]))
      this.task.startDate = startDate
      var dueDate = new Date(this.task.dueDate)
      time = this.dueTime.split(':')
      dueDate.setHours(parseInt(time[0]), parseInt(time[1]))
      this.task.dueDate = dueDate
      this.$emit('saveTask', this.task)
    },
    async handleDeleteTask () {
      const del = await this.$bvModal.msgBoxConfirm('Você realmente deseja apagar esta tarefa?', { title: 'Excluir', okVariant: 'danger' })
      if (!del) {
        return
      }
      this.$emit('deleteTask', this.task)
    },
    selectImage () {
      document.getElementById('fileInput').click()
    },
    changeImage (event) {
      var img = new Image()
      img.onload = () => {
        if (this.width > 800 || this.height > 800) {
          alert('Por favor envie imagens de até 800px de largura ou altura')
        } else {
          this.updateLocalVar(event.target.files[0])
        }
      }
      img.src = window.URL.createObjectURL(event.target.files[0])
    },
    updateLocalVar (file) {
      this.tempURL = URL.createObjectURL(file)
      this.task.icon = file
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

  .notify-badge{
    position: absolute;
    right:1rem;
    top:1rem;
    text-align: center;
    background-color: rgb(253, 253, 253);
    border-radius: 30px 30px 30px 30px;
    padding:5px 10px;
    font-size:20px;
}

</style>
