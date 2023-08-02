<template>
  <div class="text--uppercase display-1">This text is in default case, but should be in uppercase because it has text--uppercase class1</div>
  {{ text }}
  <va-input v-model="text" />

  <VaSelect v-model="text" :options="['Hello', 'World']"></VaSelect>

  <div class="row justify-center">
    <div> We </div>
    <div> are </div>
    <div> inside the row class </div>
    But grid is not imported so we are not.
  </div>
  <div class="flex-center m-3">
    <va-button @click="toggleAmPm()">
      Test Am\Pm toggle and minutes filter.
    </va-button>
  </div>
  <va-time-input
      v-model="value"
      :ampm="ampm"
      :minutesFilter="minutesFilter"
      label="Time input component"/>
  <div class="flex-center">
    <va-time-picker
        v-model="value"
        :ampm="ampm"
        :minutesFilter="minutesFilter"/>
  </div>
  <div class="va-chip">
    This is not va-chip component, just use .va-chip class. Must be plain text
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data () {
    return {
      value: new Date(),
      ampm: true,
      text: 'test',
    }
  },
  computed: {
    divisor () {
      return this.ampm ? 10 : 20
    },
  },
  methods: {
    toggleAmPm(){
      this.ampm = !this.ampm
    },
    minutesFilter(m){
      return m % this.divisor === 0
    },
  },
})
</script>
