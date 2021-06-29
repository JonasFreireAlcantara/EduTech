<template>
  <v-row>
    <v-col>
      <v-sheet :height="isMinimized ? '320' : '480'">
        <v-row :class="isMinimized ? 'p-1 pb-5' : 'p-1 pb-3'">
          <v-col cols="2" class="text-center p-0">
            <v-btn
              icon
              class="ma-2"
              @click="$refs.calendar.prev()"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="8" class="text-center theme--light v-btn v-btn--icon v-btn--plain" style="text-transform:capitalize">
            <v-btn outlined left absolute small @click="setToday" style="border: 1px solid lightgray;">Hoje</v-btn>
            <b>{{currMonth}}</b>
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  color="grey darken-2" style="border: 1px solid lightgray;"
                  v-bind="attrs"
                  v-on="on"
                  small
                  right
                  absolute
                >
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Mês</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Semana</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Dia</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="2" class="text-center p-0">
            <v-btn
              icon
              class="ma-2"
              @click="$refs.calendar.next()"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-calendar
          ref="calendar"
          v-model="value"
          :now="value.date"
          color="#FFD400"
          :events="events"
          :type="type"
          :event-overlap-threshold="30"
          :event-color="getEventColor"
          :locale="this.getLang()"
          :show-month-on-first="false"
          event-text-color="#343a40"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="onContextChange">
        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
          style="margin-top: 5%;"
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              light
            >
              <v-toolbar-title v-html="selectedEvent.time"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="selectedOpen = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <EventCard :task="selectedEvent" :isMinimized="isMinimized"/>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import EventCard from '../events/event-card'
import axios from 'axios'

export default {
  data () {
    return {
      value: '',
      currMonth: '',
      events: [],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      type: 'month',
      typeToLabel: {
        month: 'Mês',
        week: 'Semana',
        day: 'Dia'
      }
    }
  },
  methods: {
    setToday () {
      this.value = new Date()
    },
    onContextChange ({ start, end }) {
      this.getEvents({ start, end })
      this.updateMonth({ start, end })
    },
    updateMonth ({ start, end }) {
      const date = new Date(end.date)
      const month = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' })
      this.currMonth = month + ' ' + date.getFullYear()
    },
    getRandomColor () {
      var letters = 'BCDEF'.split('')
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)]
      }
      return color
    },
    async getEvents ({ start, end }) {
      const events = []

      var calendar = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${start.date}T00%3A00%3A00Z&timeMax=${end.date}T00%3A00%3A00Z`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        })

      for (var event of calendar.data.items) {
        events.push({
          // name: event.summary,
          start: new Date(event.start.dateTime),
          end: new Date(event.end.dateTime),
          color: this.getRandomColor(),
          timed: true,
          // time: time.time,
          id: event.etag,
          title: event.summary,
          description: event.description,
          hangoutLink: event.hangoutLink,
          isGoogle: true,
          img: { blank: true, width: 75, height: 75, class: 'm1' }
        })
      }
      this.events = events
    },
    getEventColor (event) {
      return event.color
    },
    getLang () {
      if (navigator.languages !== undefined) {
        return navigator.languages[0]
      }
      return navigator.language
    },
    viewDay ({ date }) {
      this.value = date
      this.type = 'day'
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => { this.selectedOpen = true }))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    }
  },
  props: {
    isMinimized: Boolean
  },
  components: {
    EventCard
  }
}
</script>

<style>
@media (min-width: 576px) {
  .modal-dialog-scrollable .modal-content {
      max-height: calc(100vh)!important;
  }
  .modal-dialog-scrollable {
    max-height: calc(100%)!important;
  }
}
.modal-dialog.modal-xl.modal-dialog-scrollable {
  height: calc(100vh - 3.5rem);
}
.v-calendar-monthly.v-calendar-weekly.v-calendar.v-calendar-events {
  height: 95%;
}
.v-calendar-weekly__head-weekday {
    flex: 0 1 14.45%!important;
}
.v-calendar-weekly__day {
    flex: 0 1 14%!important;
    margin: 2px!important;
}
.v-calendar-weekly__day-label {
  margin-top: 0px!important;
}
.v-calendar-weekly__day-label > button.v-btn.v-btn--fab {
  height: 20px;
  width: 25px;
  background-color: inherit;
  text-transform: capitalize;
}
.theme--light.v-calendar-weekly .v-calendar-weekly__day.v-outside {
  background-color: rgb(245, 245, 245)!important;
}
.theme--light.v-calendar-weekly .v-calendar-weekly__day {
  background-color: rgb(231, 231, 231);
  border-radius: 5%;
}
</style>
