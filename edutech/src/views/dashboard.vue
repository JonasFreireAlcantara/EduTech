<template>
  <div>
    <TopComponent :isLogged="true"/>
    <DashHeader @actualWorkspace="actualWorkspace = $event"
      @noWorkspace="noWorkspaceMessage = $event"/>

    <div class="h-line"></div>

    <div v-if="actualWorkspace !== null">
      <DashContent :actualWorkspace="actualWorkspace"
        :progress="progress"
        :value="90"
        :options="options"
        :series="series"/>
    </div>
    <div v-else>
      <h3 class="center__h3">{{ noWorkspaceMessage }}</h3>
    </div>
    
  </div>
</template>

<script>
import TopComponent from '../components/top-component.vue'
import DashContent from './dashboardContent'
import DashHeader from './dashboardHeader'

export default {
  components: {
    TopComponent,
    DashContent,
    DashHeader
  },
  methods: {
    handleData: function (e) {
      [this.leftSideMenuActive, this.rightSideMenuActive] = e
    }
  },
  data () {
    return {
      actualWorkspace: null,
      progress: 70,
      noWorkspaceMessage: '',
      options: {
        colors: ['#541388'],
        chart: {
          id: 'grafico-de-horas-estudadas'
        },
        xaxis: {
          categories: ['01/02', '02/02', '03/02', '04/02', '05/02', '06/02', '07/02', '08/02']
        }
      },
      series: [
        {
          name: 'Horas estudadas',
          data: [2.8, 3.4, 1.91, 1.12, 4, 3.25, 2.5, 2.3]
        },
        {
          name: 'Horas livre',
          data: [4.2, 3.6]
        }
      ],
      leftSideMenuActive: false,
      rightSideMenuActive: false
    }
  }
}
</script>

<style>

.horas__estudadas {
  justify-content: center;
}

.center__h3 {
  text-align: center;
  margin: 1rem;
}

.filter {
  padding-top: 70px;
  width: 80%;
  margin: 0 auto;
}

.h-line {
  height: 1px;
  width: 100%;
  display: inline-block;
  border-bottom: 1px solid rgb(211, 211, 211);
}

.workspace-info {
  width: 80%;
  margin: 0 auto;
}

.progress-bar {
  color: #2E294E;
  padding-right: 20px;
  background: none;
}

.vertical-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  padding-right: 20%;
}

.hours {
  font-size: 120%;
  font-weight: bold;
}

.v-progress-linear__background {
  opacity: 0.9 !important;
}
</style>

<style>
.v-menu__content.theme--light.menuable__content__active {
  z-index: 12!important;
}
</style>
