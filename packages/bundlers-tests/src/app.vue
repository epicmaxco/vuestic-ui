<template>
  <div class="text--uppercase display-1">This text is in default case, but should be in uppercase because it has text--uppercase class1</div>
  <va-input :modelValue="'test'" />

  <div class="row justify--center">
    <div> We </div>
    <div> are </div>
    <div> inside the row class </div>
    But grid is not imported so we are not.
  </div>
  <div class="flex-center ma-3">
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data () {
    return {
      value: new Date(),
      ampm: true,
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
