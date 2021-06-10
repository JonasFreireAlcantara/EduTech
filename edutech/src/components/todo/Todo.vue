<template>
  <li class='d-flex align-items-center list-group-item'>
    <button
      class='btn border-0 flex-grow-1 text-left shadow-none'
      @click='$emit ("on-toggle")'
      v-if='!isEditing'
    >
      <span class='todo-check-icon'><b-icon v-if='completed' icon="check"></b-icon></span>
      <span>{{ description }}</span>
    </button>
    <form v-else class='flex-grow-1' @submit.prevent='finishEditing()'>
      <input
        type='text'
        class='form-control'
        v-model='newTodoDescription'
        ref='newTodo'
      />
    </form>
    
    <button
      @click='startEditing()'
      class='btn btn-outline-primary border-0 ml-2 px-2 py-2'
    >
      <b-icon icon="pencil-square"></b-icon>
    </button>
    <button @click='$emit ("on-delete")' class='btn btn-outline-danger border-0 px-2 py-2 ml-1'>
      <b-icon icon="trash-fill"></b-icon>
    </button>
  </li>
</template>

<script>
export default {
  data () {
    return {
      isEditing: false,
      newTodoDescription: ''
    }
  },
  props: {
    description: String,
    completed: Boolean
  },
  methods: {
    startEditing () {
      if (this.isEditing) {
        this.finishEditing()
      } else {
        this.newTodoDescription = this.description
        this.isEditing = true
        this.$nextTick(() => this.$refs.newTodo.focus())
      }
    },
    finishEditing () {
      this.isEditing = false
      this.$emit('on-edit', this.newTodoDescription)
    }
  }
}
</script>

<style scoped>
  .todo-check-icon {
    width: 30px;
    display: inline-block;
    color: #007600;
    font-size: 1.2em;
  }
</style>
