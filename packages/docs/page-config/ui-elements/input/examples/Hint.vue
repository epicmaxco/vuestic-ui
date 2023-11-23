<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-start">
    <VaInput
      v-model="value"
      class="mb-6"
      :messages="message"
      label="Name"
      placeholder="Single-line message"
    />
    <VaInput
      v-model="value"
      class="mb-6"
      :messages="messages"
      label="Name"
      placeholder="Multi-line message"
    />
  </div>
</template>

<script>
export default {
  name: "Hint",
  data() {
    return {
      message: "Required field",
      messages: ["Required field", "Tap to start typing"],
      value: "",
    };
  },
};
</script>
