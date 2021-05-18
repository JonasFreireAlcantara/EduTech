<template>
  <div>
    <TopComponent :isLogged="false"/>
    <div class="login-div text-center">
      <h4>Para continuar, faça login com sua conta Google</h4>
      <b-button :to="{ name: 'Dashboard' }" variant="primary">Fazer login com conta Google</b-button>
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
