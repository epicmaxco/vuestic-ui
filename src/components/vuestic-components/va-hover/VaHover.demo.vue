<template>
  <VbDemo>
    <VbCard>
      <va-hover v-slot:default="{ hover }">
        <va-card title="Default slot content" :color="hover ? 'warning' : 'primary'" >
          Hover over me!
        </va-card>
      </va-hover>
      <br>
      <va-hover v-model="vModelHover">
        <va-card title="Binding through v-model" :color="vModelHover ? 'warning' : 'primary'">
          Hover over me
        </va-card>
      </va-hover>
      <br>
      <va-hover disabled v-model="vModelHoverDisabled">
        <va-card title="Binding through v-model, disabled component" :color="vModelHoverDisabled ? 'warning' : 'primary'">
          Hover disabled
        </va-card>
      </va-hover>
      <br>
      <va-hover v-slot:default="{ hover }">
        <div style="background: linear-gradient(to right, rgb(102, 229, 181), rgb(41, 224, 105)); height: 100px; border-radius: 6px; margin: auto; text-align:center;"> Div example: hover = {{ hover }}</div>
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
      vModelHover: false,
      vModelHoverDisabled: false,
    }
  },
}
</script>
