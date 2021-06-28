<template>
    <b-modal id="pomodoroModal" title="Pomodoro" size="xl" hide-footer header-class="text-dark" header-close-content="<h2>&times;</h2>" scrollable>
    <b-tabs content-class="mt-2" nav-class="text-dark" pills fill>
      <b-tab title="Pomodoro" title-link-class="tab" active>
        <Pomodoro
          :minutes=25
          :seconds=0
          :pomodoroType=1
        />
      </b-tab>

      <b-tab title="Pausa Curta" title-link-class="tab">
        <Pomodoro
          :minutes=5
          :seconds=0
          :pomodoroType=2
        />
      </b-tab>

      <b-tab title="Pausa Longa" title-link-class="tab">
        <Pomodoro
          :minutes=15
          :seconds=0
          :pomodoroType=3
        />
      </b-tab>
    </b-tabs>
  </b-modal>
 
</template>

<script>
import Pomodoro from '../components/pomodoro/Pomodoro'

export default {

  components: {
    Pomodoro
  }

}

</script>

<style scoped>

  @media (min-width: 1300px) {
    .modal-xl {
      max-width: 1270px;
    }
  }

</style>
