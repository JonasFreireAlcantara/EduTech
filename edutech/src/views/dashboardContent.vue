<template>
  <div>
      <b-row class="workspace-info">
        <b-col>
          <b-row :justify="alignCenter" class="text-center horas__estudadas"><strong>Tempo total de Estudo</strong></b-row>
          <b-row :justify="alignCenter">
            <v-progress-circular class="mt-2 mx-auto" :size="70" :value="value" color="#541388">
              <span class="hours">{{getTimeStudied}}</span>
            </v-progress-circular>
          </b-row>
        </b-col>

        <b-col>
          <b-row :justify="alignCenter" class="text-center horas__estudadas"><strong>Tempo total de Descanso</strong></b-row>
          <b-row :justify="alignCenter">
            <v-progress-circular class="mt-2 mx-auto" :size="70" :value="value" color="#541388">
              <span class="hours">{{getTimeRest}}</span>
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

export default {
  data () {
    return {
      alignCenter: 'center'
    }
  },
  props: {
    actualWorkspace: String,
    initialDate: String,
    endDate: String,
    value: Number,
    options: Object,
    series: Array,
    totalStudyTime: Number,
    totalRestTime: Number
  },
  computed: {
    getTimeStudied: function () {
      return this.getHoursStudy(this.totalStudyTime)
    },
    getTimeRest: function () {
      return this.getHoursStudy(this.totalRestTime)
    }
  },
  methods: {
    getHoursStudy: function (hoursStudy) {
      let timeStudy = hoursStudy < 60 ? `${hoursStudy} s` : (hoursStudy < 60 * 60 ? 'm' : 'h')
      if (timeStudy === 'm') {
        timeStudy = `${(hoursStudy / 60).toFixed(2)} m`
      } else if (timeStudy === 'h') {
        timeStudy = `${(hoursStudy / (60 * 60)).toFixed(2)} h`
      }
      return timeStudy
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
