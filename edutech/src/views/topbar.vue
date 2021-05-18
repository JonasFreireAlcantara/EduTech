<template>
  <div>
    <b-navbar v-bind="firstPage" toggleable="sm" type="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
      <b-navbar-brand id="edutech-logo" :to="isLogged ? { name: 'Dashboard'} : { name: 'Login' }">EduTech</b-navbar-brand>
      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-text id="edutech-text">“A porta da educação”</b-nav-text>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-nav align="end">
          <b-nav-item @click="login">
            {{isLogged ? userName : 'Login'}}
            <b-avatar id="avatar" button variant="primary"></b-avatar>
            <b-popover v-if="isLogged"
            target="avatar"
            :title="userName"
            triggers="hover focus"
            :content="'Olá ' + userName"
            ></b-popover>
          </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <hr>
  </div>
</template>

<script>
import router from '../router'

export default {
  data () {
    return {
      firstPage: this.$route.name === 'Login' ? { fixed: 'top' } : {}
    }
  },
  props: {
    isLogged: Boolean,
    userName: String
  },
  methods: {
    login () {
      if (this.$route.name !== 'PerformLogin' && !this.isLogged) {
        router.push({ name: 'PerformLogin' })
      } else if (this.isLogged && this.$route.name !== 'Dashboard') {
        router.push({ name: 'Dashboard' })
      }
    }
  }
}
</script>

<style>

hr {
  margin: 0px 8px 16px;
}

nav {
  padding: 0px 16px;
  background-color: #FFFDFD;
}

.list-group-item {
  border: 0;
  background-color: transparent;
}

#edutech-logo {
  color: #2E294E;
  border: 2px solid #2E294E;
  padding: 0 8px;
  border-radius: 12px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 26px;
  font-weight: bold;
}

#edutech-text {
  color: #34313f;
  font-size: 18px;
}
</style>
