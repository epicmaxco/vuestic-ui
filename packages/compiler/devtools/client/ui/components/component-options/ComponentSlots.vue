
<script setup lang="ts">
  import { VaTextarea } from 'vuestic-ui'
  import { useComponent } from '../../composables/useComponent/useComponent'

  const { options: { slots } } = useComponent()
</script>

<template>
  <div class="component-slots">
    <template v-for="slot in slots">
      <VaTextarea v-model="slot.codeValue" :label="slot.name" />
    </template>
  </div>
</template>


<style lang="scss" scoped>
.component-slots {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
