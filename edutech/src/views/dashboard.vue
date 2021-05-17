<template>
  <div>
    <b-row class="filter">
      <b-col>
        <strong>Workspace</strong>
        <v-select
          class="mt-2"
          :items="workspaces"
          v-model="actualWorkspace"
          label="Selecione um workspace"
          solo
        ></v-select>
      </b-col>

        <b-col cols="8" sm="6" md="3" >
          <strong >Período Inicial</strong>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="mt-2"
                v-model="initialDate"
                label="Período Inicial"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="initialDate"
              @input="menu = false"
              color="#541388"
            ></v-date-picker>
          </v-menu>
        </b-col>

      <b-col cols="8" sm="6" md="3" >
          <strong>Período Final</strong>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="mt-2"
                v-model="endDate"
                label="Período Final"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="endDate"
              @input="menu2 = false"
              color="#541388"
            ></v-date-picker>
          </v-menu>
        </b-col>

      <b-col :align="alignCenter">
        <v-btn
          class="mt-10"
          rounded
          color="#FFD400"
          dark
        >
          Filtrar
        </v-btn>
      </b-col>
    </b-row>

    <div class="h-line"></div>

    <b-row class="workspace-info" >
      <b-col class="progress-bar" md="8">
        <strong v-if="actualWorkspace !== null">Progresso do {{actualWorkspace}}</strong>
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
        <b-row :justify="alignCenter" class="text-center"><strong>Total de horas estudadas</strong></b-row>
        <b-row :justify="alignCenter">
          <v-progress-circular
            class="mt-2 mx-auto"
            :rotate="360"
            :size="70"
            :width="5"
            :value="90"
            color="#541388"
          >
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

    <b-row :justify="alignCenter" class="text-center">
      <strong>Dias</strong>
    </b-row>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      initialDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      workspaces: ['Workspace 1', 'Workspace 2', 'Workspace 3'],
      actualWorkspace: null,
      progress: 75,
      alignCenter: 'center',
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
      ]
    }
  }
}
</script>

<style scoped>
.filter {
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

.fade-enter-active, .fade-leave-active {
  transition: all 4s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
