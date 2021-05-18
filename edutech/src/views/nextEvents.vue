<template>
  <b-modal id="nextEvents" title="Próximos Eventos" size="xl" hide-footer header-class="text-dark" header-close-content="<h2>&times;</h2>" scrollable>
    <b-tabs content-class="mt-3" nav-class="text-dark" pills>
      <b-tab title="Hoje" title-link-class="tab" active>
        <div v-for="time in times" :key="time.id">
          <Event :time="time" :hasMargin="index !== 0" :isExpanded="time.visible" :isTime="true" :isMinimized="false"></Event>
        </div>
      </b-tab>
      <b-tab title="Nessa Semana" title-link-class="tab">
        <div v-for="time in times" :key="time.id">
          <Event :time="time" :hasMargin="index !== 0" :isExpanded="time.visible" :isTime="false" :isMinimized="false"></Event>
        </div>
      </b-tab>
      <b-tab title="Nesse Mês" title-link-class="tab">
        <div v-for="time in times" :key="time.id">
          <Event :time="time" :hasMargin="index !== 0" :isExpanded="time.visible" :isTime="false" :isMinimized="false"></Event>
        </div>
      </b-tab>
    </b-tabs>
  </b-modal>
</template>

<script>
import Event from './event.vue'

export default ({
  data () {
    return {
      times: [
        {
          id: 0,
          time: '14:00',
          date: '17/05',
          visible: true,
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
        },
        {
          id: 1,
          time: '18:00',
          date: '18/05',
          visible: false,
          tasks: [
            {
              id: 0,
              title: 'Biology Meeting',
              label: 'Medium',
              labelColor: '#ffe14d',
              description: 'Notes: a report should be submitted on google classroom',
              img: { blank: true, width: 75, height: 75, class: 'm1' }
            }
          ]
        }
      ]
    }
  },
  components: {
    Event
  }
})
</script>

<style>
  .tab {
    color: gray;
    background-color: white;
  }
  .nav-pills .nav-link.active.tab {
    color: #212529;
    background-color: white;
    font-weight: 600;
  }
  .nav-link:hover {
    color: inherit;
  }
  .nav-link.active::after {
    content: "";
    display: block;
    width: 100%;
    height: 10px;
    border-bottom: 3px solid;
    margin: 0 auto;
    color: #212529;
  }
</style>
