<template>
  <div class="row">
    <va-counter class="mx-6 my-2"
      v-model="value"
      messages="Select number"
    />
    <va-counter class="mx-6 my-2"
      v-model="value"
      :messages="['Select number', 'Select again :)']"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: undefined,
    }
  },
}
</script>
