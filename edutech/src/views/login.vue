<template>
  <div>
    <Topbar :isLogged="false"/>
    <div>
      <b-img src="https://burst.shopifycdn.com/photos/wrtiting-tools.jpg?width=1200&format=pjpg&exif=0&iptc=0" fluid-grow></b-img>
    </div>
  </div>
</template>

<script>
import router from '../router'
import Topbar from './topbar.vue'

export default {
  data: () => {
    return {
    }
  },
  methods: {
    goToHome: function () {
      router.push({ name: 'Dashboard' })
    }
  },
  components: {
    Topbar
  }
}
</script>

<style scoped>

</style>
