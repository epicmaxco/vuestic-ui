<template>
  <div class="flex gap-5 flex-wrap">
    <va-counter
      v-model="value"
      messages="Default"
    />

    <va-counter
      stateful
      messages="Stateful"
    />

    <va-counter
      v-model="value"
      manual-input
      messages="Manual-input"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 10,
    };
  },
};
</script>
Í