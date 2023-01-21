<template>
  <div class="row">
    <va-counter class="mx-6 my-2"
      v-model="value"
      readonly
    />

    <va-counter class="mx-6 my-2"
      v-model="value"
      buttons
      readonly
    />
  </div>

  <div class="row">
    <va-counter class="mx-6 my-2"
      v-model="value"
      disabled
    />

    <va-counter class="mx-6 my-2"
      v-model="value"
      buttons
      disabled
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
