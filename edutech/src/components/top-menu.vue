<template>
  <v-app-bar
      absolute
      color="#541388"
      class="nav"
    >
      <v-app-bar-nav-icon color="#FFF" @click="sendData(true, false)"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <v-col>
        <v-toolbar-title :align="`center`">
          <span class="logo">EduTech</span>
        </v-toolbar-title>
      </v-col>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon color="#FFF">mdi-view-dashboard-outline</v-icon>
      </v-btn>

      <v-btn icon @click="sendData(false, true)">
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
</style>
