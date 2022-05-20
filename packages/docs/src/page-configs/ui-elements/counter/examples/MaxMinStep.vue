<template>
  <div class="row">
    <va-counter class="mx-4 my-2"
      v-model="value"
      :min="-100" :max="100" :step="10"
      messages="-100 to 100 with step=10"
    />

    <va-counter class="mx-4 my-2"
      v-model="value"
      manual-input
      :min="-100" :max="100" :step="10"
      messages="manual input"
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
