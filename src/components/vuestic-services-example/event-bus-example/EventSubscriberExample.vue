<template>
  <div>
    <template v-if="lastMessage">
      Last message: "{{ lastMessage }}"
    </template>
    <template v-else>
      No message were recieved
    </template>
  </div>
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
