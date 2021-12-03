<template>
  <div>
    <va-input
      class="mb-4"
      v-model="value"
      :messages="message"
      label="Name"
      placeholder="Single-line message"
    />
    <va-input
      class="mb-4"
      v-model="value"
      :messages="messages"
      label="Name"
      placeholder="Multi-line message"
    />
  </div>
</template>

<script>
export default {
  name: 'Hint',
  data () {
    return {
      message: 'Required field',
      messages: ['Required field', 'Tap to start typing'],
      value: '',
    }
  },
}
</script>
