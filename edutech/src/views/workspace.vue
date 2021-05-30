<template>
  <div>
    <TopComponent :isLogged="true"/>
    <b-container class="margin-top">
      <h1>{{getWorkspaceName}}</h1>
      <hr>
      <NextEvents/>
      <PomodoroModal/>
      <KanbanModal/>
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
              <div v-for="(time, index) in times" :key="time.id" class="w-100">
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
                <Pomodoro :minutes=25 :pomodoroType=0 />
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
import PomodoroModal from './pomodoroModal'
import CalendarModal from './calendarModal'
import Calendar from '../components/calendar/calendar.vue'
import TopComponent from '../components/top-component.vue'
import Pomodoro from '../components/pomodoro/Pomodoro'

export default ({
  data () {
    return {
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
    TopComponent
  },
  computed: {
    getWorkspaceName: function () {
      return this.$store.state.workspaces[this.$router.history.current.params.id].name
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
