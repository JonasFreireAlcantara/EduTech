<template>
  <b-calendar v-model="value"
              @context="onContext"
              :date-info-fn="dateClass"
              hide-header
              today-variant="primary"
              selected-variant="secondary"
              nav-button-variant="primary"
              class="border p-2"
              weekday-header-format="long"
              label-help=""
              no-key-nav
              block></b-calendar>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    dateClass (ymd, date) {
      if (date === this.value) {
        return 'date-selected'
      }
      const month = date.getMonth()
      const today = new Date()
      return month === today.getMonth() ? 'date-this-month' : 'date-not-this-month'
    }
  }
}
</script>

<style>
.date-not-this-month > span {
  margin: .2rem;
  padding: .75rem 4rem!important;
  border-radius: .5rem!important;
  text-align: center;
  box-sizing: initial;
}
.date-not-this-month > span:hover {
  background-color: rgb(245, 245, 245);
}
.date-this-month > span {
  background-color: rgb(231, 231, 231);
  margin: .2rem;
  padding: .75rem 4rem!important;
  border-radius: .5rem!important;
  text-align: center;
  box-sizing: initial;
}
.date-this-month > span:hover {
  background-color: lightgray;
}
.date-this-month > span.btn-outline-primary:hover {
  color: #541388;
}
.date-selected > span {
  background-color: #FFD400;
}
.b-calendar {
  text-transform: uppercase;
}
</style>
