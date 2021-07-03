<template>
  <div>
      <b-row class="workspace-info">
        <b-col class="progress-bar" md="8">
          <strong>Progresso do Workspace: {{actualWorkspace}}</strong>
          <v-progress-linear
            class="mt-2"
            :buffer-value="progress"
            stream
            color="#541388"
            height="20"
            rounded
          >
            <strong>{{Math.ceil(progress)}}%</strong>
          </v-progress-linear>
        </b-col>
        <b-col>
          <b-row :justify="alignCenter" class="text-center horas__estudadas"><strong>Tempo total estudado</strong></b-row>
          <b-row :justify="alignCenter">
            <v-progress-circular class="mt-2 mx-auto" :size="70" :value="value" color="#541388">
              <span class="hours">{{getTimeStudied}}</span>
            </v-progress-circular>
          </b-row>
        </b-col>
      </b-row>

      <b-row :justify="alignCenter" :align="alignCenter">
        <b-col cols="1" offset-md="2" style="writing-mode: vertical-lr;">
          <span class="vertical-text">
            <strong>Horas</strong>
          </span>
        </b-col>
        <b-col cols="6" cols-sm="11">
          <apexchart width="700" type="bar" :options="options" :series="series"></apexchart>
        </b-col>
      </b-row>

      <b-row class="x__axis">
        <strong>Dias</strong>
      </b-row>

      <div class="bottom__margin"></div>
  </div>
</template>

<script>
import axios from '../variables/variables'

export default {
  data () {
    return {
      alignCenter: 'center',
      time: 0
    }
  },
  props: {
    actualWorkspace: String,
    progress: Number,
    value: Number,
    options: Object,
    series: Array
  },
  computed: {
    getTimeStudied: function () {
      (async () => { await this.calculateTime().then(res => { this.time = res }) })()
      return this.getHoursStudy(this.time)
    }
  },
  methods: {
    getHoursStudy: function (hoursStudy) {
      let timeStudy = hoursStudy < 60 ? `${hoursStudy} s` : (hoursStudy < 60 * 60 ? 'm' : 'h')
      if (timeStudy === 'm') {
        timeStudy = `${hoursStudy / 60} m`
      } else if (timeStudy === 'h') {
        timeStudy = `${hoursStudy / (60 * 60)} h`
      }
      return timeStudy
    },
    calculateTime: async function () {
      let result = 0
      const pomodoroId = this.$store.state.workspaces.find(workspace => this.actualWorkspace === workspace.name).pomodoros
      if (pomodoroId.length > 0) {
        await Promise.all(pomodoroId.map(id => `pomodoro/${id}`).map(id => axios.get(id))).then(res => {
          res.forEach(el => {
            const end = new Date(el.data.EndedOn)
            const created = new Date(el.data.CreatedOn)
            result += Math.floor((end - created) / 1000)
          })
        }).catch(err => console.error(err))
      }
      return result
    }
  }
}
</script>

<style>
.x__axis {
  justify-content: center;
}

.bottom__margin {
  width: 100%;
  margin: 1em;
  padding: 1em;
}
</style>
