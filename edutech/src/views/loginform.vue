<template>
  <div>
    <TopComponent :isLogged="false"/>
    <div class="login-div text-center">
      <h4>Para continuar, faça login com sua conta Google</h4>
      <v-btn color="primary" class="ma-2 white--text" :to="{ name: 'Workspace' }" @click="loader = 'loading3'">
        <v-icon left>
          mdi-google
        </v-icon>
        Fazer login com conta Google
      </v-btn>
    </div>
  </div>
</template>

<script>
import TopComponent from '../components/top-component.vue'

export default {
  components: {
    TopComponent
  }
}
</script>

<style scoped>
.login-div {
  margin: 15% 0 0;
  text-align: center;
}

button {
  width: 30%;
}

a {
  color: #fff !important;
}

h4 {
  text-align: center;
  margin: 0 0 2%;
}
</style>
