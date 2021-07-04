<template>
  <div>
    <b-row class="filter">
      <b-col>
        <strong>Workspace</strong>
        <v-select
          class="mt-2"
          :items="getWorkspaceNames"
          v-model="workspace"
          label="Selecione um workspace"
          solo
          :disabled="actualWorkspace === null"
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
                v-model="initialDateToSearch"
                label="Período Inicial"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :disabled="actualWorkspace === null"
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
                v-model="endDateToSearch"
                label="Período Final"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :disabled="actualWorkspace === null"
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
          @click="filter()"
          class="mt-10"
          rounded
          color="#FFD400"
          dark
        >
          Filtrar
        </v-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      initialDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      alignCenter: 'center',
      actualWorkspace: null
    }
  },
  props: {
    populateHoursStudiedDash: Function
  },
  created: async function () {
    let workspaces = this.getWorkspaceNames
    if (workspaces.length === 0) {
      await this.$store.dispatch('loadWorkspaces')
      workspaces = this.getWorkspaceNames
    }
    this.actualWorkspace = workspaces.length > 0 ? workspaces[0] : null
    this.$emit('actualWorkspace', this.actualWorkspace)
    await this.filter()
  },
  methods: {
    filter: async function () {
      if (this.actualWorkspace === null) {
        this.$emit('noWorkspace', true)
      } else {
        this.$emit('initialDate', this.initialDate)
        this.$emit('endDate', this.endDate)
        await this.populateHoursStudiedDash()
      }
    }
  },
  computed: {
    getWorkspaceNames: function () {
      const workList = []
      this.$store.state.workspaces.forEach(element => {
        workList.push(element.name)
      })
      return workList
    },
    workspace: {
      get: function () {
        return this.actualWorkspace
      },
      set: function (newValue) {
        this.$emit('actualWorkspace', newValue)
      }
    },
    initialDateToSearch: {
      get: function () {
        return this.initialDate
      },
      set: function (newDate) {
        this.$emit('initialDate', newDate)
      }
    },
    endDateToSearch: {
      get: function () {
        return this.endDate
      },
      set: function (newDate) {
        this.$emit('endDate', newDate)
      }
    }
  }
}
</script>

<style>

</style>
