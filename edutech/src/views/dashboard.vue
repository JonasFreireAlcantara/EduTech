<template>
  <div>
    <top-menu @newdata="handleData($event)" />
    <left-side-menu :drawer="leftSideMenuActive" @newdata="handleData($event)" />
    <right-side-menu :drawer="rightSideMenuActive" @newdata="handleData($event)" />

    <v-row class="filter">
      <v-col>
        <strong >Workspace</strong>
        <v-select
          class="mt-2"
          :items="workspaces"
          label="Selecione um workspace"
          solo
        ></v-select>
      </v-col>

        <v-col cols="8" sm="6" md="3" >
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
                label="Picker without buttons"
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
        </v-col>

      <v-col cols="8" sm="6" md="3" >
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
                label="Picker without buttons"
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
        </v-col>

      <v-col :align="alignCenter">
        <v-btn
          class="mt-10"
          rounded
          color="#FFD400"
          dark
        >
          Filtrar
        </v-btn>
      </v-col>
    </v-row>

    <div class="h-line"></div>

    <v-row class="workspace-info" >
      <v-col class="progress-bar" md="8">
        <strong>Progresso do Workspace X</strong>
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
      </v-col>
      <v-col>
        <v-row :justify="alignCenter"><strong>Total de horas estudadas</strong></v-row>
        <v-row :justify="alignCenter">
          <v-progress-circular
            class="mt-2"
            :rotate="360"
            :size="70"
            :width="5"
            :value="100"
            color="#541388"
          >
            <span class="hours">30 h</span>
          </v-progress-circular>
        </v-row>
      </v-col>
    </v-row>

    <v-row :justify="alignCenter" :align="alignCenter">
      <span class="vertical-text">
        <strong>Horas</strong>
      </span>
      <apexchart width="700" type="bar" :options="options" :series="series"></apexchart>
    </v-row>

    <v-row :justify="alignCenter">
      <strong>Dias</strong>
    </v-row>
  </div>
</template>

<script>
import TopMenu from '../components/top-menu'
import LeftSideMenu from '../components/left-side-menu'
import RightSideMenu from '../components/right-side-menu'

export default {
  components: {
    TopMenu,
    LeftSideMenu,
    RightSideMenu
  },

  methods: {
    handleData: function (e) {
      [this.leftSideMenuActive, this.rightSideMenuActive] = e
    }
  },

  data: () => {
    return {
      initialDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      leftSideMenuActive: false,
      rightSideMenuActive: false,
      workspaces: ['workspace 1', 'workspace 2', 'workspace 3'],
      progress: 70,
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
      series: [{
        name: 'Horas estudadas',
        data: [2, 3, 1, 1, 4, 3, 2, 2]
      }]
    }
  }
}
</script>

<style scoped>
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
    padding-right: 20px;
  }

  .vertical-text {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }

  .hours {
    font-size: 120%;
    font-weight: bold;
  }

  .v-progress-linear__background {
    opacity: 0.9 !important;
  }
</style>
