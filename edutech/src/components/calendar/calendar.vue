<template>
  <b-calendar v-model="value"
              :date-info-fn="dateClass"
              hide-header
              today-variant="primary"
              nav-button-variant="primary"
              class="border rounded"
              :weekday-header-format="isMinimized?'short':'long'"
              label-help="" block
              no-key-nav></b-calendar>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      times: [
        {
          id: 0,
          time: '14:00',
          date: '2021-06-02',
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
          date: '2021-06-07',
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
  methods: {
    dateClass (ymd, date) {
      if (date === this.value) {
        return 'date-selected'
      }
      
      var filtered = this.times.filter((el) => {
        var date1 = new Date(el.date)
        date1.setHours(0, 0, 0, 0)
        var date2 = new Date(date)
        return date1.getDay() === date2.getDay() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
      })
      if (filtered.length > 0) {
        return filtered[0].tasks[0].labelColor
      }

      const month = date.getMonth()
      const today = new Date()
      return month === today.getMonth() ? 'date-this-month' : 'date-not-this-month'
    }
  },
  props: {
    isMinimized: Boolean
  }
}
</script>

<style>
.b-calendar-inner {
  width: 100%;
}
.date-not-this-month > span.btn {
  margin: 2% 0.5%;
  padding: 8% 0%!important;
  width: 95%!important;
  border-radius: 5%!important;
  text-align: center;
  box-sizing: initial;
}
.date-not-this-month > span.btn:hover {
  background-color: rgb(245, 245, 245);
}
.date-this-month > span.btn {
  background-color: rgb(231, 231, 231);
  margin: 2% 0.5%;
  padding: 8% 0%!important;
  width: 95%!important;
  border-radius: 5%!important;
  text-align: center;
  box-sizing: initial;
}
.date-this-month > span.btn:hover {
  background-color: lightgray;
}
div[class*='#']::after  {
  content: "";
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
