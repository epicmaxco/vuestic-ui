<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <VaInput
      v-model="maskCreditCardValue"
      class="mb-6 pt-1"
      label="Credit card mask"
      type="input"
      mask="creditCard"
      placeholder="#### #### #### ####"
    />
    <VaInput
      v-model="maskDateValue"
      class="mb-6"
      label="Date mask"
      placeholder="DD/MM/YYYY"
      mask="date"
    />
    <VaInput
      v-model="maskTimeValue"
      class="mb-6"
      label="Time mask"
      placeholder="HH:MM"
      mask="time"
    />
    <VaInput
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
