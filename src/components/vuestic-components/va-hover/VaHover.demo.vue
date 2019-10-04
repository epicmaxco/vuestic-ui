<template>
  <VbDemo>
    <VbCard>
      <va-hover v-slot:default="{ hover }">
        <va-card title="Slot wrapper" :color="hover ? 'warning' : 'info'" >
          Hover over me!
        </va-card>
      </va-hover>
      <br>
      <va-hover v-model="h">
        <va-card title="Binding through v-model" :color="h ? 'warning' : 'info'">
          Hover over me
        </va-card>
      </va-hover>
    </VbCard>
  </VbDemo>
</template>

<script>

import VaHover from './VaHover'
import VaCard from '../va-card/VaCard'

export default {
  components: {
    VaCard,
    VaHover,
  },
  data () {
    return {
      h: false,
    }
  },
}
</script>
