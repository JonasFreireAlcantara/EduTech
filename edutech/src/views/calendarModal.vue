<template>
  <b-modal id="calendarModal" title="Calendário" size="xl" hide-footer header-class="text-dark" header-close-content="<h2>&times;</h2>" scrollable>
    <Calendar :isMinimized="false"/>
  </b-modal>
</template>

<script>
import Calendar from '../components/calendar/calendar.vue'
export default {
  components: {
    Calendar
  }
}
</script>

<style scoped>
</style>
