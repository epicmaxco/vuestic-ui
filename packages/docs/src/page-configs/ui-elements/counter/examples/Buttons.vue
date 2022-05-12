<template>
  <div class="row">
    <va-counter class="mx-4 my-2"
      v-model="value"
      buttons
    />

    <va-counter class="mx-4 my-2"
      v-model="value"
      outline
      buttons
    />

    <va-counter class="mx-4 my-2"
      v-model="value"
      bordered
      buttons
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
