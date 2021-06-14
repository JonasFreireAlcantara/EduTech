<template>
  <b-modal id="create-kanban-column-modal" title="Adicionar Coluna" size="lg" hide-footer header-class="text-dark" header-close-content="<h2>&times;</h2>" scrollable>
    <b-form @submit="onSubmit">
      <b-form-row>
        
        <b-col cols="12" class="text-center">
          <b-form-group
            id="nameLabel"
            label-for="nameInput">
            <b-form-input
              id="nameInput"
              v-model="kanbanName"
              type="text"
              placeholder="Digite o nome"
              required
              ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-form-group class='col-12 d-flex justify-content-end'>
          <v-btn type="submit" class="bg-primary text-white" large>Salvar</v-btn>
        </b-form-group>
      </b-form-row>
    </b-form>
  </b-modal>
</template>

<script>

export default ({
  components: {
  },
  data: () => ({
    kanbanName: ''
  }),
  methods: {
    onSubmit ($event) {
      $event.preventDefault()
      this.$emit('columnCreate', { name: this.kanbanName })
      this.kanbanName = ''
    }
  }

})
</script>

<style>
</style>
