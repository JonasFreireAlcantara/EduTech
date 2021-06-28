<template>
  <v-app>
    <div id="global-pomo">
    <Pomodoro :minutes=25 :seconds=0 :pomodoroType=-1 />
    </div>
    <router-view/>
  </v-app>
</template>

<script>
import Pomodoro from './components/pomodoro/Pomodoro'
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    Pomodoro
  }
}
</script>

<style>
  html, body, .theme--light.v-application {
    background: #FFFDFD !important;
    color: #2E294E !important;
  }

  .v-progress-linear__background {
    opacity: 0.75 !important;
  }

  .text-transform-none {
    text-transform: none !important;
  }
  .btn-light:hover {
    background-color: inherit!important;
  }
  @media (min-width: 1270px) {
    .modal-xl {
      max-width: 95%!important;
    }
  }
  #global-pomo {
    display: none;
  }
</style>
