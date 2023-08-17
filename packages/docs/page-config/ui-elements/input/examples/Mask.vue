<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <va-input
      v-model="maskCreditCardValue"
      class="mb-6 pt-1"
      label="Credit card mask"
      type="input"
      mask="creditCard"
      placeholder="#### #### #### ####"
    />
    <va-input
      v-model="maskDateValue"
      class="mb-6"
      label="Date mask"
      placeholder="DD/MM/YYYY"
      mask="date"
    />
    <va-input
      v-model="maskTimeValue"
      class="mb-6"
      label="Time mask"
      placeholder="HH:MM"
      mask="time"
    />
    <va-input
      v-model="maskNumeralsValue"
      class="mb-6"
      label="Only numerals mask"
      mask="numeral"
      placeholder="####"
    />
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
