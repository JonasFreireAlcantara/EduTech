<template>
  <b-card-body>
    <b-row>
      <b-col :md="isMinimized? '3' :'2'" sm="12" class="text-center">
        <b-img left v-bind="task.img" blank-color="#777" alt="HEX shorthand color image (#777)"></b-img>
      </b-col>
      <b-col :md="isMinimized? '8' :'6'" sm="12">
        <b-card-text class="text-dark">
          <h4>{{task.title}}<span class="task-label" :style="'background-color: '+task.labelColor+';'">{{task.label}}</span></h4>
        </b-card-text>
        <b-card-text class="text-dark">{{task.description}}</b-card-text>
      </b-col>
      <b-col md="4" sm="12" class="text-center" v-if="!isMinimized">
        <b-button variant="outline-info">+ ADD TO CALENDAR</b-button>
      </b-col>
    </b-row>
  </b-card-body>
</template>

<script>
export default ({
  props: {
    task: Object,
    isMinimized: Boolean
  }
})
</script>

<style scoped>
.btn {
  text-align: left;
}
.col-1 {
  text-align: center;
}
.task-label {
  font-size: small;
  padding: 5px 20px;
  margin-left: 1rem;
  border-radius: 15px;
}
</style>
