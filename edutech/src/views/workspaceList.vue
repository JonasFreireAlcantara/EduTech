<template>
  <div>
    <TopComponent :isLogged="true"/>
    <WorkspaceFormModal/>
    <b-container class="component-bg">
      <b-row align-v="center">
        <b-col cols="10">
          <h1>Seus Workspaces</h1>
        </b-col>
        <b-col cols="2">
          <b-button v-b-modal.newWorkspaceModal><b-icon icon="plus"></b-icon>Novo Workspace</b-button>
        </b-col>
      </b-row>
      <hr>
      <b-row cols="1" cols-md="3">
        <b-col v-for="workspace in workspaces" :key="workspace.id" style="max-width: 33%;" >
          <Card :workspace="workspace"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TopComponent from '../components/top-component.vue'
import Card from '../components/workspace-card'
import WorkspaceFormModal from '../components/workspace/workspaceForm'
import { mapState } from 'vuex'

export default {
  components: {
    TopComponent,
    Card,
    WorkspaceFormModal
  },
  mounted () {
    this.$store.dispatch('loadWorkspaces')
  },
  computed: mapState([
    'workspaces'
  ])
}
</script>

<style scoped>
  @media (min-width: 768px) {
    .row-cols-md-3 > * {
      flex: 0 0 33.3333333333% !important;
    }
  }
  .component-bg {
    margin-bottom: 12px;
    margin-top: 8%;
  }
  .card-deck {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
}
</style>
