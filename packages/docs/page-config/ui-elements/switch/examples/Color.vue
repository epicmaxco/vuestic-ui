<template>
  <div class="flex gap-8 flex-wrap">
    <VaSwitch
      v-model="value"
      color="success"
    />
    <VaSwitch
      v-model="value"
      color="info"
    />
    <VaSwitch
      v-model="value"
      color="danger"
    />
    <VaSwitch
      v-model="value"
      color="warning"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
    };
  },
};
</script>
