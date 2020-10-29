<template>
  <VbDemo>
    <VbCard title="Default">
      <VaMessageList :modelValue="stringMessage" />
    </VbCard>
    <VbCard title="Message array">
      <VaMessageList
        :limit="3"
        :modelValue="stringMessages"
      />
    </VbCard>
    <VbCard title="Error">
      <VaMessageList
        color="danger"
        :modelValue="stringMessages"
      />
    </VbCard>
    <VbCard title="Success">
      <VaMessageList
        color="success"
        :modelValue="stringMessages"
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaMessageList from './VaMessageList.vue'

export default {
  components: {
    VaMessageList,
  },
  data () {
    return {
      stringMessage: 'String message',
      stringMessages: ['Message', 'Another message', 'Long long long long long long long long long long long long long long error message'],
    }
  },
}
</script>
