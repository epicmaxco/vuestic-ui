<template>
  <div class="d-flex mb-4">
    <va-time-input
      v-model="value"
      manual-input
      :messages="['Hello world']"
    />
    <va-divider vertical />
    <va-time-input
      v-model="value"
      success
      :messages="['Hello world']"
      manual-input
    />
  </div>

  <div class="d-flex">
    <va-time-input
      v-model="value"
      error
      :errorMessages="['Bye world!']"
      manual-input
    />
    <va-divider vertical />
    <va-time-input
      label="accept only AM time"
      v-model="value"
      :rules="[(date) => date.getHours() < 12 || 'Must be AM']"
      manual-input
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: new Date(),
    }
  },
}
</script>
