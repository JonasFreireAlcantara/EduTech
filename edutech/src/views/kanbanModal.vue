<template>
  <b-modal id="kanbanModal" title="Quadro" size="xl" hide-footer header-class="text-dark" header-close-content="<h2>&times;</h2>" scrollable>
    <b-container fluid>
      <kanban />
    </b-container>
  </b-modal>
</template>

<script>
import Kanban from '../components/kanban/Kanban'

export default ({
  components: {
    Kanban
  }
})
</script>

<style>
  @media (min-width: 1300px) {
    .modal-xl {
      max-width: 1270px;
    }
  }
</style>
