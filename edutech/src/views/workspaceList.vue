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
      <b-row>
        <b-col>
          <b-card-group deck>
            <Card v-for="workspace in workspaces" :key="workspace.id" :workspace="workspace"></Card>
          </b-card-group>
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
      workspaces: [
        {
          id: 0,
          name: 'Matemática',
          description: 'Estudo pessoal de equações de 2º grau e geometria euclidiana',
          icon: { blank: true, width: 70, height: 70, class: 'm1' },
          tasks: [],
          pomodoros: [],
          columns: []
        },
        {
          id: 1,
          name: 'Matemática',
          description: 'Estudo pessoal de equações de 2º grau e geometria euclidiana',
          icon: { blank: true, width: 70, height: 70, class: 'm1' },
          tasks: [],
          pomodoros: [],
          columns: []
        },
        {
          id: 2,
          name: 'Matemática',
          description: 'Estudo pessoal de equações de 2º grau e geometria euclidiana',
          icon: { blank: true, width: 70, height: 70, class: 'm1' },
          tasks: [],
          pomodoros: [],
          columns: []
        },
        {
          id: 3,
          name: 'Matemática',
          description: 'Estudo pessoal de equações de 2º grau e geometria euclidiana',
          icon: { blank: true, width: 70, height: 70, class: 'm1' },
          tasks: [],
          pomodoros: [],
          columns: []
        },
        {
          id: 4,
          name: 'Matemática',
          description: 'Estudo pessoal de equações de 2º grau e geometria euclidiana',
          icon: { blank: true, width: 70, height: 70, class: 'm1' },
          tasks: [],
          pomodoros: [],
          columns: []
        }
      ]
    }
  },
  components: {
    TopComponent,
    Card
  },
  methods: {
    handleData: function (e) {
      [this.leftSideMenuActive, this.rightSideMenuActive] = e
    }
  }
}
</script>

<style scoped>
  .component-bg {
    margin-bottom: 12px;
    margin-top: 10%;
  }
  .card-deck {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
}
</style>
