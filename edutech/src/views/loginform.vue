<template>
  <div>
    <TopComponent :isLogged="false"/>
    <div class="login-div text-center">
      <div class="login-label">
        
        <h4>Para continuar, faça login com sua conta Google</h4>
      </div>
      <a href="#" class="google btn" @click.prevent="loginWithGoogle">
        <v-icon class="google-icon" x-large color="#FFF" >
          mdi-google
        </v-icon>
        Entrar com Google
      </a>
    </div>
  </div>
</template>

<script>
import TopComponent from '../components/top-component.vue'
import axios from '../variables/variables'

export default {
  data () {
    return {}
  },
  components: {
    TopComponent
  },
  methods: {
    loginWithGoogle () {
      this.$gAuth
        .signIn()
        .then(async (GoogleUser) => {
          let userOnBase = true
          const gUser = GoogleUser.getBasicProfile()
          await axios.get(`user/${GoogleUser.getBasicProfile().getEmail()}`).catch(() => { userOnBase = false })
          if (!userOnBase) {
            var user = {
              token: GoogleUser.getId(),
              name: GoogleUser.getBasicProfile().getName(),
              email: GoogleUser.getBasicProfile().getEmail(),
              photo: GoogleUser.getBasicProfile().getImageUrl()
            }
            await axios.post('user', user).then(() => { userOnBase = true })
          }
          if (userOnBase) {
            localStorage.setItem('token', GoogleUser.getId())
            localStorage.setItem('useremail', GoogleUser.getBasicProfile().getEmail())
            localStorage.setItem('access_token', GoogleUser.getAuthResponse().access_token)
            this.$store.commit('auth_success', gUser)
            this.$router.push({ name: 'Workspace' })
          }
        })
        .catch(error => {
          console.log('error', error)
        })
    }
  }
}
</script>

<style scoped>
.btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  margin: 5px 0;
  opacity: 0.85;
  display: inline-block;
  font-size: 17px;
  line-height: 20px;
  text-decoration: none; /* remove underline from anchors */
}

.btn:hover {
  opacity: 1;
}

.google {
  background-color: #dd4b39;
  color: white;
  width: 20%;
}

.google-icon{
  padding-right: 15px;
}

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
