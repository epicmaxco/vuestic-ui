<template>
  <div class="flex items-end gap-4 max-w-xl">
    <va-input
      v-model="fromValue"
      placeholder="0.00"
      label="From"
    >
      <template #prependInner>
        <span v-html="fromFieldMeta.icon" />
      </template>
      <template #appendInner>
        <span>{{ fromFieldMeta.text }}</span>
      </template>
    </va-input>
    <va-icon
      class="mb-3"
      name="fa4-exchange-alt"
      size="small"
      color="secondary"
      @click="replaceCurrencies"
    />
    <va-input
      v-model="convertedValue"
      placeholder="0.00"
      readonly
      label="To"
    >
      <template #prependInner>
        <span v-html="toFieldMeta.icon" />
      </template>
      <template #appendInner>
        <span>{{ toFieldMeta.text }}</span>
      </template>
    </va-input>
  </div>
</template>

<script>
const CURRENCIES = {
  USD: 'USD',
  EUR: 'EUR',
}

const CURRENCIES_ICONS = {
  USD: '&#36;',
  EUR: '&euro;',
}

export default {
  data () {
    return {
      exchangeFrom: CURRENCIES.EUR,
      usdToEurRate: 0.94,
      eurToUsdRate: 1 / 0.94,
      fromValue: '',
    }
  },

  computed: {
    isEuroCurrency() {
      return this.exchangeFrom === CURRENCIES.EUR
    },

    fromFieldMeta() {
      return {
        icon: CURRENCIES_ICONS[this.exchangeFrom],
        text: CURRENCIES[this.exchangeFrom],
      }
    },

    toFieldMeta() {
      const exchangeTo = this.isEuroCurrency ? CURRENCIES.USD : CURRENCIES.EUR

      return {
        icon: CURRENCIES_ICONS[exchangeTo],
        text: CURRENCIES[exchangeTo],
      }
    },

    convertedValue() {
      if (!this.fromValue) {
        return ''
      }

      const convertedValue = this.isEuroCurrency ? this.fromValue * this.eurToUsdRate : this.fromValue * this.usdToEurRate;

      return convertedValue.toFixed(2)
    },
  },

  methods: {
    replaceCurrencies() {
      this.exchangeFrom = this.isEuroCurrency ? CURRENCIES.USD : CURRENCIES.EUR;
    },
  },
}
</script>
