<template>
  <div>
    <h1 @click="goToHome">Edutech</h1>
  </div>
</template>

<script>
import router from '../router'

export default {
  data: () => {
    return {
    }
  },
  methods: {
    goToHome: function () {
      router.push({ name: 'Dashboard' })
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  padding: 16px 0px 0px;
  cursor: pointer;
}
</style>
