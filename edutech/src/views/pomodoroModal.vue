<template>
  <b-modal id="pomodoroModal" title="Pomodoro" size="xl" hide-footer header-class="text-dark" header-close-content="<h2>&times;</h2>" scrollable>

    <b-tabs content-class="mt-2" nav-class="text-dark" pills fill>
      <b-tab title="Pomodoro" title-link-class="tab" active>
        <div class="pomodoro-wrapper">
          <VueModoro theme="light"
            pomodoro-label="Pomodoro"
            start-label="Iniciar"
            pause-label="Parar"
            reset-label="Reiniciar"/>
        </div>
      </b-tab>

      <b-tab title="Pausa Curta" title-link-class="tab">
        <div class="pomodoro-wrapper">
          <VueModoro theme="light"
            pomodoro-label="Pausa curta"
            start-label="Iniciar"
            pause-label="Parar"
            reset-label="Reiniciar"
            :minutes="10" />
        </div>
      </b-tab>

      <b-tab title="Pausa Longa" title-link-class="tab">
        <div class="pomodoro-wrapper">
          <VueModoro theme="light"
            pomodoro-label="Pausa longa"
            start-label="Iniciar"
            pause-label="Parar"
            reset-label="Reiniciar"
            :minutes="25" />
        </div>
      </b-tab>
    </b-tabs>
  </b-modal>
</template>

<script>
import VueModoro from 'vuemodoro'

export default ({
  components: {
    VueModoro
  }
})
</script>

<style>
  @media (min-width: 1300px) {
    .modal-xl {
      max-width: 1270px;
    }
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
  .pomodoro-wrapper {
    padding: 50px;
  }
</style>
