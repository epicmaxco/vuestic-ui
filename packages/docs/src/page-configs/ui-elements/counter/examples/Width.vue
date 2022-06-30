<template>
  <div class="row">
    <va-counter class="mx-4 my-2"
      v-model="value"
      width="250px"
    />

    <va-counter class="mx-4 my-2"
      v-model="value"
      outline
      buttons
      margins="30px"
      width="200px"
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
