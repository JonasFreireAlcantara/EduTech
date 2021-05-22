<template>
  <div class='bg-white shadow rounded px-3 pt-3 pb-5 border border-white'>
    <div class='d-flex justify-content-between'>
      <p class='text-muted font-weight-light'>{{task.title}}</p>

    </div>
    <div class='d-flex mt-4 justify-content-between align-items-center'>
      <span class='text-muted'>{{task.date}}</span>
      <badge v-if='task.type' :color='badgeColor'>{{task.type}}</badge>
    </div>
  </div>
</template>

<script>
import Badge from './Badge.vue'
export default {
  components: {
    Badge
  },
  props: {
    task: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    badgeColor () {
      const mappings = {
        Design: 'purple',
        'Feature Request': 'teal',
        Backend: 'blue',
        QA: 'green',
        default: 'teal'
      }
      return mappings[this.task.type] || mappings.default
    }
  }
}
</script>
