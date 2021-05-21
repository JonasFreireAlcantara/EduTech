<template>
  <div>
    <TopComponent :isLogged="false"/>
    <div class="login-div text-center">
      <div class="login-label">
        <b-img :src="googleBrand" height="40"></b-img>
        <h4>Para continuar, faça login com sua conta Google</h4>
      </div>
      <v-btn color="primary" class="text-transform-none ma-2 white--text" :to="{ name: 'Workspace' }" @click="loader = 'loading3'">
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
  data () {
    return {
      googleBrand: require('@/assets/google_G_brand.png')
    }
  },

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

.login-label {
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.login-label h4 {
  margin: 0 0 0 10px;
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
