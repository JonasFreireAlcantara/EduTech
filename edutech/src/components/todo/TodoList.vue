<template>
  <div class='container px-0 py-0'>
    <!-- <div class='row'>
      <div class='col-12 py-5'>
        <h1>{{ listName }}</h1>
      </div>
    </div> -->
    <div class='row'>
      <create-todo @on-new-todo='addTodo($event)' />
    </div>
    <div class='row'>
      <div class='col-12 col-sm-10 col-md-8 cl-lg-6'>
        <ul class='list-group'>
          <todo
            v-for='(todo, index) in todos'
            :key='index'
            :description='todo.description'
            :completed='todo.completed'
            @on-toggle='toggleTodo(todo)'
            @on-delete='deleteTodo(todo)'
            @on-edit='editTodo(todo, $event)'
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Todo from './Todo.vue'
import CreateTodo from './CreateTodo.vue'

export default {
  props: {
    listName: String,
    todos: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      content: this.todos
    }
  },
  methods: {
    emitChange () {
      this.$emit('todoChange', { todos: this.content })
    },
    addTodo (newTodo) {
      this.content.push({ description: newTodo, completed: false })
      this.emitChange()
    },
    toggleTodo (todo) {
      todo.completed = !todo.completed
      this.emitChange()
    },
    deleteTodo (deletedTodo) {
      this.content = this.content.filter(todo => todo !== deletedTodo)
      this.emitChange()
    },
    editTodo (todo, newTodoDescription) {
      todo.description = newTodoDescription
      this.emitChange()
    }
  },
  components: { Todo, CreateTodo }
}
</script>

<style scoped lang='scss'></style>
