<template>
  <div
    class="VbDemo"
    :class="computedClass"
  >
    <slot/>
  </div>
</template>

<script lang="ts">
// @deprecated
export default {
  name: 'VbDemo',
  computed: {
    computedClass () {
      return {}
    },
  },
}
</script>

<style lang="scss">
.VbDemo {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  background-color: #eeeeee;
}
</style>
