<template>
  <div>
    <Topbar/>
    <div class="login-div text-center">
      <h4>Para continuar, faça login com sua conta Google</h4>
      <b-button block @click="performLogin" variant="primary">Fazer login com conta Google</b-button>
    </div>
  </div>
</template>

<script>
import Topbar from './topbar.vue'
import router from '../router'

export default {
  components: {
    Topbar
  },
  methods: {
    performLogin () {
      router.push({ name: 'Dashboard' })
    }
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

h4 {
  text-align: center;
  margin: 0 0 2%;
}
</style>
