<template>
  <div>
    <TopComponent :isLogged="false"/>
    <div>
      <b-img src="https://burst.shopifycdn.com/photos/wrtiting-tools.jpg?width=1200&format=pjpg&exif=0&iptc=0" fluid-grow></b-img>
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

</style>
