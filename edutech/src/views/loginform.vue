<template>
  <div>
    <TopComponent :isLogged="false"/>
    <div class="login-div text-center">
      <div class="login-label">
        
        <h4>Para continuar, faça login com sua conta Google</h4>
      </div>
      <GoogleLogin style="display: flex; justify-content: center;" :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"/>
    </div>
  </div>
</template>

<script>
import TopComponent from '../components/top-component.vue'
import GoogleLogin from 'vue-google-login'
import axios from '../variables/variables'

export default {
  data () {
    return {
      googleBrand: require('@/assets/google_G_brand.png'),
      params: {
        client_id: '621647520574-lm9unrl07tf1rphcs0pr5i399jtp14l1.apps.googleusercontent.com'
      },
      renderParams: {
        scope: 'email',
        width: 250,
        height: 50,
        longtitle: true
      }
    }
  },
  components: {
    TopComponent,
    GoogleLogin
  },
  methods: {
    async onSuccess (googleUser) {
      // console.log(googleUser)
      // This only gets the user information: id, name, imageUrl and email
      // console.log(googleUser.getBasicProfile())
      let userOnBase = true
      const gUser = googleUser.getBasicProfile()
      await axios.get(`user/${gUser.ou}`).catch(() => { userOnBase = false })
      var user = {
        token: gUser.MT,
        name: gUser.Ue,
        email: gUser.ou,
        photo: gUser.uK
      }
      if (!userOnBase) {
        await axios.post('user', user).then(() => { userOnBase = true })
      }
      if (userOnBase) {
        localStorage.setItem('token', user.token)
        localStorage.setItem('useremail', user.email)
        this.$store.commit('auth_success', user)
        this.$router.push({ name: 'Workspace' })
      }
    },
    onFailure (failure) {
      console.log(failure.error)
      console.log(failure)
    }
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
