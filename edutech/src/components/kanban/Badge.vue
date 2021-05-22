<template>
  <div
    class='px-3 h-6 rounded-full text-xs font-weight-bold d-flex align-items-center'
  >
    <span class='w-2 h-2 rounded-full mr-1'></span>
    <span>
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: 'teal'
    }
  }
}
</script>
