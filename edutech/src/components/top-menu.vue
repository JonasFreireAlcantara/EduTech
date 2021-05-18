<template>
  <v-app-bar
      absolute
      elevate-on-scroll
      color="#541388"
      class="nav"
    >
      <v-app-bar-nav-icon v-if="isLogged" color="#FFF" @click="sendData(true, false)"/>

      <v-spacer></v-spacer>
      <v-col>
        <v-toolbar-title :align="`center`">
          <router-link :to="isLogged ? { name: 'Dashboard' } : { name: 'Login' }">
            <span class="logo">EduTech</span>
          </router-link>
        </v-toolbar-title>
      </v-col>

      <v-spacer></v-spacer>

      <v-btn icon v-if="isLogged" :to="{ name: 'Dashboard' }">
        <v-icon color="#FFF">mdi-view-dashboard-outline</v-icon>
      </v-btn>
      <v-btn elevation="2" v-else :to="{ name: 'PerformLogin' }" :hidden="$route.name === 'PerformLogin'">Login</v-btn>

      <v-btn v-if="isLogged" icon @click="sendData(false, true)">
        <v-icon x-large color="#FFF" >
          mdi-account-circle-outline
        </v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    group: null
  }),
  props: {
    isLogged: Boolean
  },
  methods: {
    sendData: function (work, profile) {
      this.$emit('newdata', [work, profile])
    }
  }
}
</script>

<style scoped>
  .nav {
    position: fixed !important;
    top: 0 !important;
    width: 100%;
  }

  .logo{
    margin-left: 10%;
    color: #FFF;
    font-size: 120%;
    font-weight: bold;
  }

  a {
    text-decoration: none;
  }
</style>
