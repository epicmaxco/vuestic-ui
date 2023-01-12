<template>
  <div class="row">
    <va-counter class="mx-6 my-2"
      v-model="value"
      messages="Default"
    />

    <va-counter class="mx-6 my-2"
      stateful
      messages="Stateful"
    />

    <va-counter class="mx-6 my-2"
      v-model="value"
      manual-input
      messages="Manual-input"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 10,
    }
  },
}
</script>
