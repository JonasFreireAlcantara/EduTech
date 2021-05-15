<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>

<style>
  html, body, .theme--light.v-application {
    background: #FFFDFD !important;
    color: #2E294E !important;
  }

  .v-progress-linear__background {
    opacity: 0.9 !important;
  }
</style>
