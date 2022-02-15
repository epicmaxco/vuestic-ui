<template>
  <div class="row">
    <va-counter class="mx-4 my-2"
      v-model="value"
      increaseIcon="zoom_in"
      decreaseIcon="zoom_out"
      color="warning"
    />

    <va-counter class="mx-4 my-2"
      v-model="value"
      increaseIcon="zoom_in"
      decreaseIcon="zoom_out"
      color="warning"
      text-color="success"
      buttons
    />
  </div>

  <div class="row">
    <va-counter class="mx-4 my-2"
      v-model="value"
      outline
      increaseIcon="zoom_in"
      decreaseIcon="zoom_out"
      color="warning"
    />

    <va-counter class="mx-4 my-2"
      v-model="value"
      increaseIcon="zoom_in"
      decreaseIcon="zoom_out"
      outline
      color="warning"
      text-color="danger"
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
