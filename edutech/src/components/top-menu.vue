<template>
  <v-app-bar
      absolute
      elevate-on-scroll
      color="#541388"
      class="nav"
      style="z-index:99;"
    >
    <!-- A funcionalidade da barra na esquerda não funcionava como esperado, por conta disso desativando a funcionalidade
        Para reativar corretamente utilizar "v-if="isLogged"" -->
      <v-app-bar-nav-icon v-show="false" color="#FFF" @click="sendData(true, false)"/>

      <v-spacer></v-spacer>
      <v-col>
        <v-toolbar-title :align="`center`">
          <router-link :to="isLogged ? { name: 'Workspace' } : { name: 'Login' }">
            <span class="logo">EduTech</span>
          </router-link>
        </v-toolbar-title>
      </v-col>

      <v-spacer></v-spacer>

      <v-btn icon v-if="isLogged" :to="{ name: $route.name === 'Dashboard' ? 'Workspace' : 'Dashboard' }">
        <v-icon color="#FFF">{{$route.name === 'Dashboard' ? 'mdi-monitor-multiple' : 'mdi-view-dashboard-outline'}}</v-icon>
      </v-btn>
      <v-btn elevation="2" v-else :to="{ name: 'PerformLogin' }" :hidden="$route.name === 'PerformLogin'" class="text-capitalize">Login</v-btn>

      <v-btn v-if="isLogged" icon @click="sendData(false, true)">
        <v-icon v-if="!userIcon" x-large color="#FFF" >
          mdi-account-circle-outline
        </v-icon>
        <v-avatar v-else>
          <img :src="userIcon" :alt="userName" :title="userName">
        </v-avatar>
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    group: null
  }),
  props: {
    isLogged: Boolean,
    userIcon: String,
    userName: String
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
