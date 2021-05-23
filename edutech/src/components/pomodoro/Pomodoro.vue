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
      running: false,
      paused: false,
      stopped: true,
      timerCount: (this.minutes * 60) + this.seconds,
      timeLimit: (this.minutes * 60) + this.seconds,
      min: this.minutes,
      secs: this.seconds,
      warning: this.warningThreshold * 60,
      alert: this.alertThreshold * 60
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
    }

  },
  computed: {
    currentTime: function () {
      const minutes = this.min < 10 ? '0' + this.min : this.min
      const seconds = this.secs < 10 ? '0' + this.secs : this.secs
      return `${minutes}:${seconds}`
    },

    // Update the dasharray value as time passes, starting with 283
    circleDasharray () {
      return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`
    },
    timeFraction () {
      const rawTimeFraction = this.timerCount / this.timeLimit

      return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction)
    },
    remainingPathColor () {
      const { alert, warning, info } = COLOR_CODES

      if (this.timerCount <= this.alert) {
        return alert.color
      } else if (this.timerCount <= this.warning) {
        return warning.color
      } else {
        return info.color
      }
    }
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

    run: function () {
      this.running = true
      this.paused = false
      this.stopped = false
    },
    pause: function () {
      this.running = false
      this.paused = true
      this.stopped = false
    },
    reset: function () {
      this.running = false
      this.paused = false
      this.stopped = true
      this.min = this.minutes
      this.secs = this.seconds
      this.timerCount = this.timeLimit
    },
    countDown: function () {
      if (this.secs > 0 && this.running) {
        this.secs--
        this.timerCount = this.timerCount === 1 ? this.timerCount : this.timerCount - 1
      } else if (this.min > 0 && this.secs === 0 && this.running) {
        this.secs = 59
        this.min--
        this.timerCount = this.timerCount === 1 ? this.timerCount : this.timerCount - 1
      }
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
    stroke:#541388;
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
