<template>
  <div>
    <TopComponent :isLogged="true"/>
    <b-container fluid class="margin-top">
      <NextEvents/>
      <b-row>
        <b-col md="5" sm="12" class="mt-5 component-bg mx-auto p-3 shadow rounded">
          <b-row>
            <b-col cols="10">
              <h2>Próximos Eventos</h2>
            </b-col>
            <b-col cols="2" class="text-center">
              <a v-b-modal.nextEvents><h2><b-icon icon="arrows-angle-expand"></b-icon></h2></a>
            </b-col>
          </b-row>
          <b-row class="mt-4">
            <div v-for="(time, index) in times" :key="time.id">
              <Event :time="time" :hasMargin="index !== 0" :isTime="true" :isMinimized="true" accordion="0"></Event>
            </div>
          </b-row>
        </b-col>
        <b-col md="5" sm="12" class="mt-5 component-bg mx-auto p-3 shadow rounded">
          <b-row>
            <b-col cols="10">
              <h2>Calendário</h2>
            </b-col>
            <b-col cols="2" class="text-center">
              <a><h2><b-icon icon="arrows-angle-expand"></b-icon></h2></a>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="5" sm="12" class="mt-5 component-bg mx-auto p-3 shadow rounded">
          <b-row>
            <b-col cols="10">
              <h2>Quadro</h2>
            </b-col>
            <b-col cols="2" class="text-center">
              <a><h2><b-icon icon="arrows-angle-expand"></b-icon></h2></a>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="5" sm="12" class="mt-5 component-bg mx-auto p-3 shadow rounded">
          <b-row>
            <b-col cols="10">
              <h2>Tempo</h2>
            </b-col>
            <b-col cols="2" class="text-center">
              <a><h2><b-icon icon="arrows-angle-expand"></b-icon></h2></a>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NextEvents from './nextEvents.vue'
import Event from './event.vue'
import TopComponent from '../components/top-component.vue'

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
    TopComponent
  }
})
</script>

<style scoped>
  .component-bg {
      background-color: #541388;
      color: white;
      min-height:44vh;
      margin-bottom: 16px;
  }
  .margin-top {
    margin-top: 8%;
  }
</style>
