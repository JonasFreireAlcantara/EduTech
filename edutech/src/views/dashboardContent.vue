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
            <strong>{{ Math.ceil(progress) }}%</strong>
          </v-progress-linear>
        </b-col>
        <b-col>
          <b-row :justify="alignCenter" class="text-center horas__estudadas"><strong>Total de horas estudadas</strong></b-row>
          <b-row :justify="alignCenter">
            <v-progress-circular class="mt-2 mx-auto" :size="70" :value="value" color="#541388">
              <span class="hours">35 h</span>
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

      <b-row align-content="center" justify="center" class="text-center">
        <strong>Dias</strong>
      </b-row>
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
    progress: Number,
    value: Number,
    options: Object,
    series: Array
  }
}
</script>

<style>

</style>
