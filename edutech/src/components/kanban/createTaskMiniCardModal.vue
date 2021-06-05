<template>
  <b-modal :id="`column${column.id}`" title="Criar Nova Task" size="lg" hide-footer header-class="text-dark" header-close-content="<h2>&times;</h2>" scrollable>
    <b-form @submit="onSubmit">
      <b-form-row>
        
      </b-form-row>
    </b-form>
  </b-modal>
</template>

<script>

export default ({
  components: {
  },
  data: () => ({
    
  }),
  props: {
    column: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    onSubmit ($event) {
      $event.preventDefault()
      this.$emit('taskCreate', {})
    }
  }

})
</script>

<style>
</style>
