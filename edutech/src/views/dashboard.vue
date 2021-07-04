<template>
  <div>
    <TopComponent :isLogged="true"/>
    <DashHeader @actualWorkspace="actualWorkspace = $event"
      @noWorkspace="noWorkspaceMessage = $event"
      @initialDate="initialDate = $event"
      @endDate="endDate = $event"
      :populateHoursStudiedDash="populateHoursStudiedDash"/>

    <div class="h-line"></div>

    <div v-if="actualWorkspace !== null">
      <transition name="appear">
        <DashContent :actualWorkspace="actualWorkspace"
          :initialDate="initialDate"
          :totalStudyTime="totalStudyTime"
          :totalRestTime="totalRestTime"
          :endDate="endDate"
          :value="90"
          :options="options"
          :series="series"/>
      </transition>
    </div>
    <div v-else>
      <transition name="appear">
        <h3 v-if="noWorkspaceMessage" class="center__h3">É preciso ter ao menos um workspace para visualizar os status dos seus workspaces</h3>
      </transition>
    </div>
    
  </div>
</template>

<script>
import axios from '../variables/variables'
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
    },
    populateHoursStudiedDash: async function () {
      var studyTime = 0
      var restTime = 0
      var aWorkspace = this.actualWorkspace
      var iDate = new Date(this.initialDate.replaceAll('-', '/'))
      var eDate = new Date(this.endDate.replaceAll('-', '/'))

      const pomodoroId = this.$store.state.workspaces.find(workspace => aWorkspace === workspace.name).pomodoros

      this.options.xaxis.categories = []
      this.series[0].data = []
      this.series[1].data = []

      if (pomodoroId.length > 0) {
        var pomodoroObjects = await Promise.all(pomodoroId.map(id => `pomodoro/${id}`).map(async function (id) {
          var response = null
          await axios.get(id).then(res => {
            response = res.data
          })
          return response
        }))

        pomodoroObjects.forEach(el => {
          if (el.EndedOn) {
            var initialDate = new Date(el.CreatedOn).toISOString().substr(0, 10).replaceAll('-', '/')
            var endDate = new Date(el.EndedOn).toISOString().substr(0, 10).replaceAll('-', '/')
            if (new Date(initialDate) >= iDate && new Date(endDate) <= eDate) {
              const time = ((el.StartingMinutes * 60) + (el.StartingSeconds)) - ((el.RemainingMinutes * 60) + (el.RemainingSeconds))
              const category = initialDate.split('/').slice(-2).reverse().join('/')
              if (this.options.xaxis.categories.indexOf(category) === -1) {
                this.options.xaxis.categories.push(category)
              }
              var index = this.options.xaxis.categories.indexOf(category)
              if (el.StartingMinutes >= 25) {
                this.series[0].data[index] = this.series[0].data[index] ? (Number(this.series[0].data[index]) + Number(time / (60 * 60))).toFixed(3) : Number((time / (60 * 60)).toFixed(3))
                studyTime += time
              } else {
                this.series[1].data[index] = this.series[1].data[index] ? (Number(this.series[1].data[index]) + Number(time / (60 * 60))).toFixed(3) : Number((time / (60 * 60)).toFixed(3))
                restTime += time
              }
            }
          }
        })
      }
      this.options = JSON.parse(JSON.stringify(this.options))
      this.series = JSON.parse(JSON.stringify(this.series))
      this.totalStudyTime = studyTime
      this.totalRestTime = restTime
    }
  },
  data () {
    return {
      actualWorkspace: null,
      initialDate: null,
      endDate: null,
      totalStudyTime: 0,
      totalRestTime: 0,
      noWorkspaceMessage: false,
      options: {
        colors: ['#B0C4DE', '#02C3BD'],
        chart: {
          id: 'grafico-de-horas-estudadas'
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: 'Horas estudadas',
          data: []
        },
        {
          name: 'Horas livres',
          data: []
        }
      ],
      leftSideMenuActive: false,
      rightSideMenuActive: false
    }
  }
}
</script>

<style>
.appear-enter-active,
.appear-leave-active {
  transition: opacity .5s;
}

.appear-enter,
.appear-leave-to {
  opacity: 0;
}

.appear-leave,
.appear-enter-to {
  opacity: 1;
}

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
