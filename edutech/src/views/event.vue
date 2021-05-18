<template>
  <div role="tablist" :class="hasMargin ? 'mt-3' : ''">
    <b-row>
      <b-col :md="isMinimized? '12' :'10'" sm="12">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="pr-4 accordion bg-light" role="tab" style="max-height:60px;">
            <b-button variant="light" block :aria-expanded="isExpanded ? 'true' : 'false'" :aria-controls="'accordion-'+uuid" @click="isExpanded = !isExpanded" :class="isExpanded ? 'btn-icon text-dark' : 'btn-icon text-dark collapsed'" style="max-height:40px;">
              <b-row>
                <b-col cols="11">
                  <h3 class="mb-0">{{isTime?time.time:time.date}}</h3>
                </b-col>
                <b-col cols="1">
                  <p class="h3">
                    <b-icon icon="chevron-down"></b-icon>
                  </p>
                </b-col>
              </b-row>
            </b-button>
          </b-card-header>
          <b-collapse :id="'accordion-'+uuid" :accordion="'my-accordion-'+accordion" v-model="isExpanded" role="tabpanel" >
            <div v-for="(task,index) in time.tasks" :key="task.id">
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
                    <b-button variant="outline-primary">+ ADD TO CALENDAR</b-button>
                  </b-col>
                </b-row>
              </b-card-body>
              <hr v-if="index < time.tasks.length-1" class="text-dark">
            </div>
          </b-collapse>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid'
export default ({
  data () {
    return {
      uuid: uuid.v1(),
      isExpanded: true
    }
  },
  props: {
    time: Object,
    hasMargin: Boolean,
    isTime: Boolean,
    accordion: String,
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

<style>
.btn-icon {
  background: none;
  border: none;
  width: 100%;
}
</style>
