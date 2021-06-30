<template>
  <div>
    <TopComponent :isLogged="true"/>
    <b-container class="margin-top">
      <b-row align-v="center">
        <b-col cols="1">
          <b-img width="75" height="75" v-if="getWorkspaceById(id).icon" :src="'http://localhost:5000/api/file/'+getWorkspaceById(id).icon" rounded="circle" alt="Circle image" blank-color="#777"></b-img>
          <b-img v-else src="https://wtctravelservices.com/public/uploads/service-6.jpg" alt="Study image" width="70" height="70" rounded="circle" class="m1"></b-img>
        </b-col>
        <b-col cols="9">
          <h1>{{getWorkspaceById(id).name}}</h1>
        </b-col>
        <b-col cols="2" class="text-right">
          <b-button variant="outline-danger" @click="deleteWorkspace">Remover</b-button>
        </b-col>
      </b-row>
      <hr>
      <NextEvents :workspace="getWorkspaceById(id)"/>
      <PomodoroModal/>
      <KanbanModal :workspace="getWorkspaceById(id)"/>
      <CalendarModal/>
      <b-row>
        <b-col md="6" sm="12">
          <div class="component-bg p-3 shadow rounded h-100">
            <b-row>
              <b-col cols="10">
                <h2>Próximos Eventos</h2>
              </b-col>
              <b-col cols="2" class="text-center">
                <a v-b-modal.nextEvents><h2><b-icon icon="arrows-angle-expand"></b-icon></h2></a>
              </b-col>
            </b-row>
            <b-row class="mt-2 mx-auto">
              <div v-for="(time, index) in getTimes" :key="index" class="w-100">
                <Event :time="time" :hasMargin="index !== 0" :isTime="true" :isMinimized="true" accordion="0"></Event>
              </div>
            </b-row>
          </div>
        </b-col>
        <b-col md="6" sm="12">
          <div class="component-bg p-3 shadow rounded h-100">
            <b-row>
              <b-col cols="10">
                <h2>Calendário</h2>
              </b-col>
              <b-col cols="2" class="text-center">
                <a v-b-modal.calendarModal><h2><b-icon icon="arrows-angle-expand"></b-icon></h2></a>
              </b-col>
            </b-row>
            <b-row class="mt-2 mx-auto">
              <b-col class="p-0">
                <Calendar :isMinimized="true"/>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <div class="component-bg p-3 shadow rounded h-100">
            <b-row>
              <b-col cols="10">
                <h2>Quadro</h2>
              </b-col>
              <b-col cols="2" class="text-center">
                <a v-b-modal.kanbanModal><h2><b-icon icon="arrows-angle-expand"></b-icon></h2></a>
              </b-col>
            </b-row>
            <b-row class="mt-2 mx-auto">
              <b-col class="p-0">
                <Kanban :workspace="getWorkspaceById(id)" origin="workspace" :isMinimized="true"/>
              </b-col>
            </b-row>
          </div>
        </b-col>

        <b-col md="6" sm="12">
          <div class="component-bg p-3 shadow rounded h-100">
            <b-row>
              <b-col cols="10">
                <h2>Tempo</h2>
              </b-col>
              <b-col cols="2" class="text-center">
                <a v-b-modal.pomodoroModal><h2><b-icon icon="arrows-angle-expand"></b-icon></h2></a>
              </b-col>
            </b-row>
            <b-row class="mt-2 mx-auto">
              <b-col class="p-0">
                <Pomodoro :minutes=25 :seconds=0 :pomodoroType=0 />
              </b-col>
            </b-row>
          </div>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import NextEvents from './nextEvents.vue'
import Event from './event.vue'
import KanbanModal from './kanbanModal'
import Kanban from '../components/kanban/Kanban.vue'
import PomodoroModal from './pomodoroModal'
import CalendarModal from './calendarModal'
import Calendar from '../components/calendar/calendar.vue'
import TopComponent from '../components/top-component.vue'
import Pomodoro from '../components/pomodoro/Pomodoro'
import axios from '../variables/variables'
import { mapGetters } from 'vuex'

export default ({
  data () {
    return {
      id: this.$route.params.id,
      times: [
        {
          id: 0,
          time: '14:00',
          date: '17/05',
          tasks: [
            {
              id: 0,
              title: 'Math Assignment',
              label: 'Low',
              labelColor: '#91a8e3',
              description: 'Notes: a report should be submitted on google classroom',
              img: { blank: true, width: 75, height: 75, class: 'm1' }
            },
            {
              id: 1,
              title: 'Math Assignment',
              label: 'Low',
              labelColor: '#91a8e3',
              description: 'Notes: a report should be submitted on google classroom',
              img: { blank: true, width: 75, height: 75, class: 'm1' }
            }
          ]
        }
      ]
    }
  },
  components: {
    NextEvents,
    Event,
    KanbanModal,
    PomodoroModal,
    CalendarModal,
    Calendar,
    Pomodoro,
    TopComponent,
    Kanban
  },
  computed: {
    ...mapGetters([
      'getWorkspaceById'
    ]),
    getTimes: function () {
      var arr = this.groupBy(this.getWorkspaceById(this.id).tasks, 'dueDate')
      var times = []
      arr = Object.keys(arr).sort().reduce(
        (obj, key) => {
          obj[key] = arr[key]
          return obj
        },
        {}
      )
      for (var property in arr) {
        var curr = new Date()
        if (this.withoutTime(new Date(property)).valueOf() >= this.withoutTime(curr).valueOf()) {
          var time = {
            time: new Date(property).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            date: new Date(property).toLocaleDateString('pt-BR'),
            visible: false,
            tasks: arr[property]
          }
          times.push(time)
          break
        }
      }
      return times
    }
  },
  mounted () {
    this.$store.dispatch('loadWorkspaces')
  },
  methods: {
    deleteWorkspace: async function () {
      await axios.delete(`workspace/${this.getWorkspaceById(this.id)._id}`).then(() => this.$router.push({ name: 'Workspace' }))
    },
    groupBy: function (xs, key) {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x)
        return rv
      }, {})
    },
    withoutTime: function (dateTime) {
      var date = new Date(dateTime)
      date.setHours(0, 0, 0, 0)
      return date
    }
  }
})
</script>

<style scoped>
  .component-bg {
      background-color: #c6aed8;
      min-height:420px;
      margin-bottom: 16px;
  }
  .margin-top {
    margin-top: 8%;
  }
</style>
