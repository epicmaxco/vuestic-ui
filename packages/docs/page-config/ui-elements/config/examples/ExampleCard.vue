<template>
  <va-card>
    <va-card-title>My Card</va-card-title>
    <va-card-content class="flex gap-8 flex-col">
      <va-input
        v-model="input"
        label="My Input"
      />
      <va-select
        v-model="select"
        :options="['one', 'two', 'three']"
        label="My Select"
      />
    </va-card-content>
    <va-card-actions align="right">
      <va-button>My Button</va-button>
    </va-card-actions>
  </va-card>
</template>

<script>
export default defineComponent({
  data () {
    return {
      input: undefined,
      select: undefined,
    }
  },
})
</script>
