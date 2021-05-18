<template>
  <div>
    <TopMenu :isLogged="isLogged" @newdata="handleData($event)"/>
    <LeftSideMenu :drawer="leftSideMenuActive" @newdata="handleData($event)"/>
    <RightSideMenu :drawer="rightSideMenuActive" @newdata="handleData($event)"/>
  </div>
</template>

<script>
import TopMenu from '../components/top-menu'
import LeftSideMenu from '../components/left-side-menu'
import RightSideMenu from '../components/right-side-menu'

export default {
  components: {
    TopMenu,
    LeftSideMenu,
    RightSideMenu
  },
  data: () => {
    return {
      leftSideMenuActive: false,
      rightSideMenuActive: false
    }
  },
  props: {
    isLogged: Boolean
  },
  methods: {
    handleData: function (e) {
      [this.leftSideMenuActive, this.rightSideMenuActive] = e
    }
  }
}
</script>

<style>

</style>
