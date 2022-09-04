<template>
  <va-split class="split-demo">
    <template #start>
      {{ lorem }}
    </template>
    <template #grabber>
      <div class="custom-grabber">
        <va-icon name="face" />
      </div>
    </template>
    <template #end>
      {{ lorem }}
    </template>
  </va-split>
</template>

<script>
import { lorem } from './Default'

export default {
  data: () => ({
    lorem,
  }),
}
</script>

<style lang="scss">
  .split-demo {
    & .custom-grabber {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: greenyellow;
    }
  }
</style>
