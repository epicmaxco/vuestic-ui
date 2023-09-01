<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <va-time-input
      v-model="value"
      manual-input
      :messages="['Hello world']"
    />
    <va-time-input
      v-model="value"
      success
      :messages="['Hello world']"
      manual-input
    />
    <va-time-input
      v-model="value"
      error
      :error-messages="['Bye world!']"
      manual-input
    />
    <va-time-input
      v-model="value"
      label="accept only hours < 12"
      :rules="[
        (date) =>
          (date && date.getHours && date.getHours() < 12) ||
          'Hours should be < 12',
      ]"
      manual-input
      clearable
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
    };
  },
};
</script>
