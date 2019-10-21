<template>
  <div>
    <va-button v-on:click="$cast('MessageSent', 'Message from template')">Send message from template</va-button>
    <va-button v-on:click="fireEvent">Send message from method</va-button>
  </div>
</template>

<script>
import VaButton from '../../vuestic-components/va-button/VaButton'

export default {
  components: {
    VaButton,
  },
  methods: {
    fireEvent () {
      this.$cast('MessageSent', 'Message from method')
    },
  },
}
</script>
