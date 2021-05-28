<template>
  <div>
    <TopComponent :isLogged="true"/>
    <b-container class="component-bg">
      <b-row>
        <b-col>
          <h1>Seus Workspaces</h1>
          <hr>
        </b-col>
      </b-row>
      <b-row cols="1" cols-md="3">
        <b-col v-for="workspace in workspaces" :key="workspace.id" >
          <Card :workspace="workspace"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TopComponent from '../components/top-component.vue'
import Card from '../components/workspace-card'

export default {
  data () {
    return {
      workspaces: this.$store.state.workspaces
    }
  },
  components: {
    TopComponent,
    Card
  }
}
</script>

<style scoped>
  @media (min-width: 768px) {
    .row-cols-md-3 > * {
      flex: 0 0 33.3333333333%!important;
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
