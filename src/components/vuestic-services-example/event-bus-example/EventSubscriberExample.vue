<template>
  <VbCard>
    <template v-if="lastMessage">Last message: "{{ lastMessage }}"</template>
    <template v-else>No message were recieved</template>
  </VbCard>
</template>

<script>
export default {
  data () {
    return {
      lastMessage: null,
    }
  },
  subs: {
    MessageSent (message) {
      this.lastMessage = message
    },
  },
}
</script>
