<template>
  <b-card
    class="mb-5 mr-4 shadow-sm"
  >
    <a :href="'/#/workspace/'+workspace.id">
      <b-card-text>
        <b-row>
          <b-col cols="4" class="text-center">
            <b-img width="75" height="75" v-if="workspace.icon" :src="'http://localhost:5000/api/file/'+workspace.icon" rounded="circle" alt="Circle image" blank-color="#777"></b-img>
            <b-img v-else src="https://wtctravelservices.com/public/uploads/service-6.jpg" alt="Study image" width="70" height="70" rounded="circle" class="m1"></b-img>
          </b-col>
          <b-col cols="8">
            <h4 class="mb-0">{{workspace.name}}</h4>
            <div class="ellipsis" :title="workspace.description"><p>{{workspace.description}}</p></div>
          </b-col>
        </b-row>
      </b-card-text>
    </a>
  </b-card>
</template>

<script>
export default {
  props: {
    workspace: Object
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #2E294E;
  }
  .ellipsis {
    overflow: hidden;
    height: 4.5rem;
    line-height: 1.5rem;
  }
  .ellipsis:before {
      content:"";
      float: left;
      width: 5px;
      height: 4.5rem;
  }
  .ellipsis > *:first-child {
      float: right;
      width: 100%;
      margin-left: -5px;
  }
  .ellipsis:after {
      content:"\02026";
      box-sizing: content-box;
      -webkit-box-sizing: content-box;
      -moz-box-sizing: content-box;
      float: right;
      position: relative;
      top: -25px;
      left: 100%;
      width: 3.5em;
      margin-left: -3.5em;
      padding-right: 5px;
      text-align: center;
      background: -webkit-gradient(linear, left top, right top, from(rgba(255, 255, 255, 0)), to(white), color-stop(50%, white));
      background: -moz-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
      background: -o-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
      background: -ms-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
      background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
  }
</style>
