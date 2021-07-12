<template>
  <VbDemo>
    <VbCard title="Links">
      <a
        href="/default-link"
        class="link"
      >Default Link</a>
      <br>
      <a
        href="/not-visited-link"
        class="link-secondary"
      >Secondary Link</a>
      <br>
      <a
        href="#"
        class="link"
      >Default link Visited</a>
      <br>
      <a
        href="#"
        class="link-secondary"
      >Secondary link Visited</a>
    </VbCard>
    <VbCard title="Text styles">
      <div>Default Text</div>
      <div v-for="color in textStyleColors" :key="color" :class="`va-text--${color}`">{{ color }} text</div>
    </VbCard>
  </VbDemo>
</template>

<script>
export default {
  setup () {
    const textStyleColors = ['primary', 'secondary', 'success', 'info', 'danger', 'warning', 'gray', 'dark']
    return {
      textStyleColors,
    }
  },
}
</script>

<style scoped lang="scss">
@import '../resources/resources';
@import 'typography';
</style>
