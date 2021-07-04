<template>
  <div>
    <TopMenu :isLogged="isLogged" @newdata="handleData($event)" :userIcon="userIcon" :userName="userName"/>
    <LeftSideMenu :drawer="leftSideMenuActive" @newdata="handleData($event)"/>
    <RightSideMenu :drawer="rightSideMenuActive" @newdata="handleData($event)" :userName="userName"/>
  </div>
</template>

<script>
import TopMenu from '../components/top-menu'
import LeftSideMenu from '../components/left-side-menu'
import RightSideMenu from '../components/right-side-menu'
import axios from '../variables/variables'

export default {
  components: {
    TopMenu,
    LeftSideMenu,
    RightSideMenu
  },
  data: () => {
    return {
      leftSideMenuActive: false,
      rightSideMenuActive: false,
      userIcon: null,
      userName: null
    }
  },
  props: {
    isLogged: Boolean
  },
  methods: {
    handleData: function (e) {
      [this.leftSideMenuActive, this.rightSideMenuActive] = e
    }
  },
  created: async function () {
    if (this.$store.state.useremail) {
      if (this.$store.state.userName === null) {
        await axios.get(`user/${this.$store.state.useremail}`).then((res) => {
          const user = {
            useremail: res.data.email,
            userIcon: res.data.photo,
            userName: res.data.name,
            token: res.data.token
          }
          this.$store.commit('auth_update', user)
        })
      }
      this.userIcon = this.$store.state.userIcon
      this.userName = this.$store.state.userName
    }
  }
}
</script>

<style>

</style>
