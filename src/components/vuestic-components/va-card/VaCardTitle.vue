<template functional>
  <div class="va-card-new__title">
    <slot>
      {{ props.title }}
    </slot>
  </div>
</template>

<script>
export default {
  name: 'VaCardTitle',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
