<template>
  <div>
    <TopComponent :isLogged="false"/>

    <div id="login-wrapper">
      <b-img
        src="https://images.unsplash.com/photo-1551029506-0807df4e2031?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1491&q=80"
        fluid-grow
        >
      </b-img>
      <div id="login-image-overlay"></div>

      <div class="login-text">
        <h1>EduTech</h1>
        <h3>"A porta da educação"</h3>
      </div>

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

  @import url('https://fonts.googleapis.com/css2?family=Crimson+Text&family=Dancing+Script&display=swap');

  #login-wrapper {
    position: relative;
    /* height: 1000px; */
  }

  #login-image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
  }

  .login-text {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .login-text h1 {
    font-family: "Crimson Text";
    font-size: 5.5rem;
  }

  .login-text h3 {
    font-family: "Dancing Script";
    font-size: 2rem;
  }

</style>
