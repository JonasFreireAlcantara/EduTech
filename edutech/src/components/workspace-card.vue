<template>
  <b-card
    style="max-width: 23rem;"
    class="mb-5 mr-4 shadow-sm"
  >
    <a :href="'/#/workspace/'+workspace.id">
      <b-card-text>
        <b-row>
          <b-col cols="4" class="text-center">
            <b-img v-if="!workspace.icon.blank" v-bind="workspace.icon" rounded="circle" alt="Circle image" blank-color="#777"></b-img>
            <b-img v-else src="https://wtctravelservices.com/public/uploads/service-6.jpg" alt="Study image" width="70" height="70" rounded="circle" class="m1"></b-img>
          </b-col>
          <b-col cols="8">
            <h3 class="mb-0">{{workspace.name}}</h3>
            <p>{{workspace.description}}</p>
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
</style>
