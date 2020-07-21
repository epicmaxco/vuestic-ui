<template>
  <div>
    <va-input
      class="my-2"
      :style="{paddingTop: '4px'}"
      label="Credit card mask"
      type="input"
      mask="creditCard"
    />
    <va-input
      class="my-2"
      v-model="maskDateValue"
      label="Date mask"
      mask="date"
    />
    <va-input
      class="my-2"
      v-model="maskTimeValue"
      label="Time mask"
      mask="time"
    />
    <va-input
      class="my-2"
      v-model="maskNumeralsValue"
      label="Only numerals mask"
      mask="numeral"
    />
    <va-input
      class="my-2"
      v-model="maskCustomBlocksValue"
      label="Custom blocks mask"
      placeholder="# ##### #####"
      :mask="{blocks: [1, 5, 5]}"
    />
    <va-input
      class="my-2"
      v-model="maskReturnFormattedValue"
      label="Date mask, return formatted"
      :returnRaw="false"
      mask="date"
    />
    Value: {{maskReturnFormattedValue}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      maskCreditCardValue: '',
      maskDateValue: '',
      maskTimeValue: '',
      maskNumeralsValue: '',
      maskCustomBlocksValue: '',
      maskReturnFormattedValue: '',
    }
  },
}
</script>
