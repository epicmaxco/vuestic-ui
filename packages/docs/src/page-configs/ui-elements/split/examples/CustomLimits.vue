<template>
  <va-split class="split-demo" :limits="[[10, 'any'], ['50px', '30rem']]">
    <template #start>
      {{ lorem }}
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
