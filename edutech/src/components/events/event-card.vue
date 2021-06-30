<template>
  <b-card-body style="max-height: 350px; overflow-y: auto;">
    <b-row>
      <b-col :md="isMinimized? '3' :'2'" sm="12" class="text-center">
        <b-img width="75" height="75" v-if="task.icon" :src="'http://localhost:5000/api/file/'+task.icon"></b-img>
      </b-col>
      <b-col :md="isMinimized? '8' :'6'" sm="12">
        <b-card-text class="text-dark">
          <h4>{{task.name}}<span v-if="task.label" class="task-label" :style="'background-color: '+task.labelColor+';'">{{task.label}}</span></h4>
        </b-card-text>
        <b-card-text class="text-dark"><span v-if="task.hangoutLink"><b-button :href="task.hangoutLink" target="_blank" class="text-dark" size="sm">Abrir no Meet</b-button></span><span v-html="task.description"></span></b-card-text>
      </b-col>
      <b-col md="4" sm="12" class="text-center" v-if="!isMinimized">
        <b-button v-if="!task.isGoogle" variant="outline-info">+ ADD TO CALENDAR</b-button>
      </b-col>
    </b-row>
  </b-card-body>
</template>

<script>
export default ({
  data () {
    return {
      googleIcon: require('../../assets/google_G_brand.png')
    }
  },
  props: {
    task: Object,
    isMinimized: Boolean
  },
  methods: {
    changeImg: function () {
      if (this.task.isGoogle) {
        this.task.icon = this.googleIcon
      }
    }
  },
  beforeMount () {
    this.changeImg()
  },
  updated () {
    this.changeImg()
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
