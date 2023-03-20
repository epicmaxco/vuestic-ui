<template>
  <div class="grid grid-flow-col gap-4 max-w-xl">
    <div class="inline-grid">
      <b class="va-text-primary">{{ $t('input.examples.customize.labelFrom') }}</b>
      <va-input
        v-model="fromValue"
        placeholder="0,00"
        mask="numeral"
      >
        <template #prependInner>
          <span v-html="fromFieldMeta.icon" />
        </template>
        <template #appendInner>
          <span>{{ fromFieldMeta.text }}</span>
        </template>
      </va-input>
    </div>
    <span class="self-end justify-self-center h-[36px] flex items-center">
      <va-icon
        name="fa4-exchange-alt"
        size="small"
        color="secondary"
        @click="replaceCurrencies"
      />
    </span>
    <div class="inline-grid">
      <b class="va-text-primary">{{ $t('input.examples.customize.labelTo') }}</b>
      <va-input
        v-model="convertedValue"
        placeholder="0,00"
        readonly
        mask="numeral"
      >
        <template #prependInner>
          <span v-html="toFieldMeta.icon" />
        </template>
        <template #appendInner>
          <span>{{ toFieldMeta.text }}</span>
        </template>
      </va-input>
    </div>
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
      eurToUsdRate: 1.07,
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
