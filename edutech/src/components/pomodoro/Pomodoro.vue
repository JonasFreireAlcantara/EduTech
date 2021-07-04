<template>
    <div id="pomodoro">
        <div class="pomodoro-wrapper">
            <svg class="base-timer-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" >
              <g class="base-timer-circle">
                <circle
                  class="base-timer-path-elapsed"
                  cx="50"
                  cy="50"
                  r="46.5"
                />
                <path
                  :stroke-dasharray="circleDasharray"
                  class="base-timer-path-remaining"
                  :class="remainingPathColor"
                  d="
                    M 50, 50
                    m -45, 0
                    a 45,45 0 1,0 90,0
                    a 45,45 0 1,0 -90,0
                  "></path>
              </g>
            </svg>
            <span class="base-timer-label">
              {{currentTime}}
            </span>
          </div>
          <div class="buttons">
            <div class="horizontal-center">
              <b-button id="start-button" size="lg" @click="run" pill variant="success">Iniciar</b-button>
              <b-button id="pause-button" size="lg" @click="pause" pill variant="success">Pausar</b-button>
              <b-button id="reset-button" size="lg" @click="reset" pill variant="success">Resetar</b-button>
            </div>
          </div>
    </div>
 
</template>

<script>
import { mapGetters } from 'vuex'
import axios from '../../variables/variables'
const audioFile = new Audio(require('../../assets/audio/alarm.mp3'))

const FULL_DASH_ARRAY = 283

const COLOR_CODES = {
  info: {
    color: 'green'
  },
  warning: {
    color: 'orange'
  },
  alert: {
    color: 'red'
  }
}

export default {

  data () {
    return {
      pomodoro: this.$store.state.pomodoro,
      loadToGlobal: this.$store.state.loadedToGlobal,
      runningLocal: this.$store.state.pomodoro.running,
      changed: this.pomodoroType === -1 ? this.$store.state.pomodoro.changed : { count: -1 },
      typePomodoro: (!this.pomodoroType || this.pomodoroType === -1) ? this.$store.state.loadedToGlobal : { type: this.pomodoroType }
    }
  },
  props: {
    minutes: {
      type: Number,
      validator: function (value) {
        return value >= 0 && value <= 60
      },
      default: 25
    },
    seconds: {
      type: Number,
      validator: function (value) {
        return value >= 0 && value <= 59
      },
      default: 0
    },
    alertThreshold: {
      type: Number,
      default: 1
    },
    warningThreshold: {
      type: Number,
      default: 5
    },
    pomodoroType: {
      type: Number,
      default: 1
    }
  },
  created: function () {
    audioFile.loop = true
    window.addEventListener('beforeunload', this.unloadHandler)
  },
  beforeDestroy: function () {
    window.removeEventListener('beforeunload', this.unloadHandler)
  },
  computed: {
    currentTime: function () {
      const min = (this.pomodoro.pomodoroType === this.typePomodoro.type && this.pomodoro.min !== null) ? this.pomodoro.min : this.minutes
      const secs = (this.pomodoro.pomodoroType === this.typePomodoro.type && this.pomodoro.secs !== null) ? this.pomodoro.secs : this.seconds

      if (min === 0 && secs === 0) {
        this.alerta()
      }
      const minutes = min < 10 ? '0' + min : min
      const seconds = secs < 10 ? '0' + secs : secs

      return `${minutes}:${seconds}`
    },
    circleDasharray () {
      return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`
    },
    timeFraction () {
      if (this.pomodoro.pomodoroType !== this.typePomodoro.type) {
        return
      }
      const rawTimeFraction = this.pomodoro.timerCount / this.pomodoro.timeLimit

      return rawTimeFraction - (1 / this.pomodoro.timeLimit) * (1 - rawTimeFraction)
    },
    remainingPathColor () {
      const { alert, warning, info } = COLOR_CODES
      const timerCount = (this.pomodoro.pomodoroType === this.typePomodoro.type && this.pomodoro.timerCount !== null) ? this.pomodoro.timerCount : (this.minutes * 60) + this.seconds
      const alertTime = (this.pomodoro.pomodoroType === this.typePomodoro.type && this.pomodoro.alert !== null) ? this.pomodoro.alert : this.alertThreshold * 60
      const warningTime = (this.pomodoro.pomodoroType === this.typePomodoro.type && this.pomodoro.warning !== null) ? this.pomodoro.warning : this.warningThreshold * 60

      if (timerCount < alertTime) {
        return alert.color
      } else if (timerCount < warningTime) {
        return warning.color
      } else {
        return info.color
      }
    },
    running () {
      return this.pomodoroType === -1 ? this.pomodoro.running : false
    },
    timerCount () {
      return this.changed.count
    },
    ...mapGetters(['getWorkspaceById'])
  },
  watch: {
    running (value) {
      if (value) {
        setTimeout(() => {
          this.countDown()
        }, 1000)
      }
    },
    timerCount: {
      handler (value) {
        setTimeout(() => {
          this.countDown()
        }, 1000)
      }

    }
  },
  methods: {
    unloadHandler (event) {
      if (this.pomodoroType === -1 && this.pomodoro.running === true) {
        event.preventDefault()
        event.returnValue = ''
        this.endPomodoro()
      }
    },
    async createPomodoro () {
      var pomodoroValues = {
        StartingSeconds: this.seconds,
        StartingMinutes: this.minutes,
        CreatedOn: new Date().toISOString().substr(0, 10)
      }
      await axios.post('pomodoro', pomodoroValues).then(async (res) => {
        var workspace = this.getWorkspaceById(this.pomodoro.workspaceId)
        workspace.pomodoros.push(res.data._id)
        this.pomodoro.pomodoroId = res.data._id
        await axios.put(`workspace/${workspace._id}`, workspace).then(() => this.$store.dispatch('loadWorkspaces'))
      })
    },
    async endPomodoro () {
      var pomodoro = await axios.get(`pomodoro/${this.pomodoro.pomodoroId}`)
      pomodoro = pomodoro.data
      pomodoro.EndedOn = new Date().toISOString().substr(0, 10)
      pomodoro.RemainingMinutes = this.pomodoro.min
      pomodoro.RemainingSeconds = this.pomodoro.secs
      await axios.put(`pomodoro/${this.pomodoro.pomodoroId}`, pomodoro)
    },
    incrementChangedVariable: function () {
      this.changed.count += 1
    },
    run: async function () {
      if (this.loadToGlobal.type !== this.typePomodoro.type || this.typePomodoro.type === -1 || this.pomodoro.workspaceId !== this.$route.params.id || !this.pomodoro.pomodoroId) {
        if (this.pomodoro.running === true) {
          await this.pause()
        }
        this.loadValuesToGlobal()
        await this.createPomodoro()
      }

      if (this.pomodoro.paused || this.pomodoro.stopped) {
        this.pomodoro.running = true
        this.runningLocal = this.pomodoro.running
        this.pomodoro.paused = false
        this.pomodoro.stopped = false

        if (this.runningLocal !== this.pomodoro.running) {
          this.incrementChangedVariable()
          this.runningLocal = this.pomodoro.running
        }
      }
    },
    pause: async function () {
      if (this.loadToGlobal.type === this.typePomodoro.type) {
        if (this.pomodoro.running === true) {
          await this.endPomodoro()
        }
        this.pomodoro.running = false
        this.runningLocal = this.pomodoro.running
        this.pomodoro.paused = true
        this.pomodoro.stopped = false
      }
    },
    reset: async function () {
      if (this.loadToGlobal.type === this.typePomodoro.type) {
        if (this.pomodoro.running === true) {
          await this.endPomodoro()
        }
        this.loadValuesToGlobal()
        this.runningLocal = this.pomodoro.running
      }
    },
    countDown: function () {
      if (this.pomodoro.secs > 0 && this.pomodoro.running) {
        this.pomodoro.secs--
        this.pomodoro.timerCount = this.pomodoro.timerCount === 1 ? this.pomodoro.timerCount : this.pomodoro.timerCount - 1
        this.incrementChangedVariable()
      } else if (this.pomodoro.min > 0 && this.pomodoro.secs === 0 && this.pomodoro.running) {
        this.pomodoro.secs = 59
        this.pomodoro.min--
        this.pomodoro.timerCount = this.pomodoro.timerCount === 1 ? this.pomodoro.timerCount : this.pomodoro.timerCount - 1
        this.incrementChangedVariable()
      }
    },
    loadValuesToGlobal: function () {
      const currentMin = (this.pomodoroType <= 0 && this.pomodoro.timeLimit !== null) ? (this.pomodoro.timeLimit - (this.pomodoro.timeLimit % 60)) / 60 : this.minutes
      const currentSecs = (this.pomodoroType <= 0 && this.pomodoro.timeLimit !== null) ? this.pomodoro.timeLimit % 60 : this.seconds
      const pomodoro = {
        running: false,
        paused: false,
        stopped: true,
        min: currentMin,
        secs: currentSecs,
        timerCount: (currentMin * 60) + currentSecs,
        timeLimit: (currentMin * 60) + currentSecs,
        warning: (this.pomodoroType <= 0 && this.pomodoro.warning !== null) ? this.pomodoro.warning : this.warningThreshold * 60,
        alert: (this.pomodoroType <= 0 && this.pomodoro.alert !== null) ? this.pomodoro.alert : this.alertThreshold * 60,
        pomodoroType: this.typePomodoro.type !== -1 ? this.typePomodoro.type : 1,
        changed: this.changed,
        workspaceId: this.$route.params.id
      }
      for (const prop in this.pomodoro) {
        this.pomodoro[prop] = pomodoro[prop]
      }
      this.loadToGlobal.type = this.typePomodoro.type !== -1 ? this.typePomodoro.type : 1
    },
    alerta: function () {
      let pomoType = ''
      if (this.pomodoro.pomodoroType === 1) {
        pomoType = 'estudo'
      } else if (this.pomodoro.pomodoroType === 2) {
        pomoType = 'pausa curta'
      } else {
        pomoType = 'pausa longa'
      }
      audioFile.play()
      this.$alert(`O seu tempo de ${pomoType} chegou ao fim!`).then(() => {
        audioFile.pause()
        this.reset()
      })
    }
  }

}

</script>

<style scoped>
.pomodoro-wrapper{
  position: relative;
  width: 300px;
  height: 300px;
  margin: auto;
}

.base-timer-circle {
    fill: none;
    stroke: none;
    
  }

 .base-timer-path-elapsed {
    stroke-width: 5px;
    stroke:gray;
  }

.base-timer-label {
    position: absolute;
    width: 300px;
    height: 300px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
  }

.base-timer-path-remaining {
    stroke-width: 5px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
  }

  .base-timer-svg {
    transform: scaleX(-1);
  }

  .tab {
    color: gray;
    background-color: white;
    font-size: larger;
    max-width: 200px;
    margin: 0 auto;
  }
  .nav-pills .nav-link.active.tab {
    color: #2E294E;
    background-color: white;
    font-weight: 600;
  }
  .nav-link:hover {
    color: #2E294E;
  }
  .nav-link.active::after {
    content: "";
    display: block;
    width: 100%;
    height: 10px;
    border-bottom: 3px solid;
    margin: 0 auto;
    color: #2E294E;
  }
  .buttons {
    display: flex;
    justify-content: center;
    padding: 10px;
  }

  #start-button:hover, #pause-button:hover, #reset-button:hover {
    opacity: 0.7;
  }

  #start-button, #pause-button, #reset-button {
    margin: 10px;
  }
  
  #pause-button {
    background-color: red;
    border-color: red;
  }

  #reset-button {
    background-color: grey;
    border-color: grey;
  }

  .orange {
    stroke: rgb(255, 187, 0);
  }

  .green {
    stroke: rgb(73, 128, 0);
  }

  .red {
    stroke: red;
  }

</style>
