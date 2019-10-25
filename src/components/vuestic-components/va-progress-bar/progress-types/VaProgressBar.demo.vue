<template>
  <VbDemo>
    <VbCard refresh width="400px">
      <span>No value</span>
      <va-progress-bar/>
      <span>Default</span>
      <va-progress-bar :value="value"/>
      <span>Square</span>
      <va-progress-bar :rounded="false" :value="value"/>
      <span>Danger</span>
      <va-progress-bar :value="value" color="danger"/>
      <span>Size</span>
      <va-progress-bar :size="32" :value="value" color="danger"/>
      <span>Size rem</span>
      <va-progress-bar size="2rem" :value="value" color="danger"/>
      <span>Static slot</span>
      <va-progress-bar :value="value">Slot</va-progress-bar>
      <span>Small preset</span>
      <va-progress-bar :value="value" size="small">Slot</va-progress-bar>
      <span>Large preset</span>
      <va-progress-bar :value="value" :rounded="false" size="large">{{ value + '%'}}</va-progress-bar>
      <span>Dynamic slot</span>
      <va-progress-bar :value="value">{{ value + '%' }}</va-progress-bar>
      <span>Slot Success</span>
      <va-progress-bar :value="value" color="warning">{{ value + '%' }}</va-progress-bar>
      <span>Buffer</span>
      <va-progress-bar :value="value" :buffer="bufferValue"/>
      <span>Indeterminate</span>
      <va-progress-bar indeterminate/>
      <span>Indeterminate Info</span>
      <va-progress-bar indeterminate color="info"/>
      <span>Indeterminate Reversed</span>
      <va-progress-bar reverse indeterminate color="info"/>
      <span>Indeterminate Slot</span>
      <va-progress-bar indeterminate>Slot</va-progress-bar>
      <span>Indeterminate with :value and :buffer should behave the same</span>
      <va-progress-bar :value="value" :buffer="bufferValue" indeterminate/>
    </VbCard>
    <VbCard title="Value">
      <button @click="value -= 100">-100</button>
      <button @click="value -= 10">-10</button>
      <input style="width: 50px" type="number" v-model.number="value">
      <button @click="value += 10">+10</button>
      <button @click="value += 100">+100</button>
    </VbCard>
    <VbCard title="Buffer value">
      <button @click="bufferValue -= 100">-100</button>
      <button @click="bufferValue -= 10">-10</button>
      <input style="width: 50px" type="number" v-model.number="bufferValue">
      <button @click="bufferValue += 10">+10</button>
      <button @click="bufferValue += 100">+100</button>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaProgressBar from './VaProgressBar'

export default {
  components: {
    VaProgressBar,
  },
  data () {
    return {
      bufferValue: 45,
      value: 35,
    }
  },
}
</script>
