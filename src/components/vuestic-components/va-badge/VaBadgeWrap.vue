<template>
  <span
    class="va-badge-wrap"
    :class="badgeWrapClass"
  >
    <slot />
  </span>
</template>

<script>
export default {
  name: 'va-badge-wrap',
  props: {
    left: {
      type: [Boolean],
      default: false,
      required: false,
    },
    bottom: {
      type: [Boolean],
      default: false,
      required: false,
    },
    reverseDirection: {
      type: [Boolean],
      default: false,
      required: false,
    },
  },
  computed: {
    badgeWrapClass () {
      const self = this

      return {
        'va-badge-wrap--left': self.left,
        'va-badge-wrap--bottom': self.bottom,
      }
    },
  },
}
</script>

<style lang='scss'>
@import "../../vuestic-sass/resources/resources";

.va-badge-wrap {
  position: relative;
}

</style>
