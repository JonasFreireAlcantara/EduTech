<template>
  <b-modal :id="`task${task.id}`" title="Detalhes da Tarefa" size="xl" hide-footer header-class="text-dark" header-close-content="<h2>&times;</h2>" scrollable>
    <b-container fluid>
      <div class="container">
        <div class="row">
          <h1 class='col-12 card-title text-center mt-5'>{{task.title}}</h1>
        </div>

        <div class="row py-3"><hr class="col-12"></div>

        <div class=''>
          <div class="row">
            <h3 class="col-12">Data</h3>
          </div>
          <div class='row'>
            <span class='card-clock-icon'><b-icon icon="clock"></b-icon></span>
            <span class='card-date font-weight-bold ml-2'>{{task.startDate}} - {{task.endDate}}</span>
          </div>
        </div>

        <div class="row py-3"><hr class="col-12"></div>

        <div class='card-description-wrapper mt-5'>
          <h3>Descrição</h3>
          <p class='text-justify mt-3'>{{task.description}}</p>
        </div>

        <div class="row"></div>

        <div class="row py-3"><hr class="col-12" ></div>

        <div class='card-todo-wrapper mt-5'>
          <h3>Tarefas</h3>
          <div class="card-todo">
            <ToDoList
              list-name="Tarefas"
              v-bind:todos="task.todos"
              @todoChange='handleTodoChange(task, $event)' />
          </div>
        </div>

      </div>
    </b-container>
  </b-modal>
</template>

<script>
import ToDoList from '../components/todo/TodoList'

export default ({
  components: {
    ToDoList
  },
  props: {
    task: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleTodoChange: (task, $event) => {
      task.todos = $event.todos
      // TODO emit change to api
    }
  }
})
</script>

<style scoped>

  .card-title {
    font-size: 2.5em;
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

  .card-description-wrapper > p {
    font-size: 1.2em;
  }

</style>
