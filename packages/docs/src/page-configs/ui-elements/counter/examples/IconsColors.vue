<template>
  <div class="row">
    <va-counter class="mx-4 my-2"
      v-model="value"
      increaseIcon="add_circle_outline"
      decreaseIcon="remove_circle_outline"
      color="#6938D1"
    />

    <va-counter class="mx-4 my-2"
      v-model="value"
      outline
      increaseIcon="arrow_upward"
      decreaseIcon="arrow_downward"
      color="#0FB58D"
    />

    <va-counter class="mx-4 my-2"
      v-model="value"
      outline
      preset="secondary"
      margins="0"
      color="#262824"
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
