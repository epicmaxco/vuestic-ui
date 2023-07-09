<template>
  <div class="max-w-xs">
    <va-input
      v-model="maskCreditCardValue"
      class="mb-6 pt-1"
      label="Credit card mask"
      type="input"
      mask="creditCard"
    />
    <va-input
      v-model="maskDateValue"
      class="mb-6"
      label="Date mask"
      mask="date"
    />
    <va-input
      v-model="maskTimeValue"
      class="mb-6"
      label="Time mask"
      mask="time"
    />
    <va-input
      v-model="maskNumeralsValue"
      class="mb-6"
      label="Only numerals mask"
      mask="numeral"
    />
    <va-input
      v-model="maskCustomBlocksValue"
      class="mb-6"
      label="Custom blocks mask"
      placeholder="# ##### #####"
      :mask="{ blocks: [1, 5, 5] }"
    />
    <va-input
      v-model="maskReturnFormattedValue"
      class="mb-6"
      label="Date mask, return formatted"
      :return-raw="false"
      mask="date"
    />
    <br>
    Value: {{ maskReturnFormattedValue }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      maskCreditCardValue: "",
      maskDateValue: "",
      maskTimeValue: "",
      maskNumeralsValue: "",
      maskCustomBlocksValue: "",
      maskReturnFormattedValue: "",
    };
  },
};
</script>
