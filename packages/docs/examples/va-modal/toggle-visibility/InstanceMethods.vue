<template>
  <va-content>
    <va-button @click="$refs.statefulModal.show()">
      Show modal (stateful)
    </va-button>
    <va-button @click="$refs.statelessModal.show()">
      Show modal (stateless)
    </va-button>
    <va-modal ref="statefulModal" stateful />
    <va-modal ref="statelessModal" v-model="showStatefulModal" />
  </va-content>
</template>
<script>
export default {
  data () {
    return {
      showStatefulModal: false,
    }
  },
}
</script>
