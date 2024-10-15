import { computed, ref } from 'vue'
import { defineStory } from '../../../.storybook/types'
import { useInputMask } from './useInputMask'
import { VaInput } from '../../components'
import TokensRenderer from './tests/Tokens.vue'
import PossibleTokens from './tests/PossibleTokens.vue'
import { createRegexMask } from './masks/regex'
import { createDateMask } from './masks/date'
import { createNumeralMask } from './masks/numeral'
import { parseTokens } from './masks/parser'

export default {
  title: 'composables/useInputMask',
  tags: ['autodocs'],
}

export const Default = defineStory({
  story: () => ({
    components: { TokensRenderer, PossibleTokens },
    setup () {
      const reverse = ref(false)
      const value = ref('3809312345678')
      const input = ref()
      const regex = ref(/(\d{1,3}( \d{3}){1,2},?\d{1,3}|\d{3}|\d{1,3}( \d{3}){1,2})/.source)
      const mask = computed(() => {
        try {
          if (!regex.value) { return /./ }

          return new RegExp(regex.value)
        } catch {
          return /./
        }
      })

      const tokens = computed(() => parseTokens(mask.value.source))
      const regexMask = computed(() => createRegexMask(mask.value, { reverse: reverse.value }))

      const text = ref('')

      const { masked, unmasked } = useInputMask(regexMask, input)

      return { value, regex, input, masked, unmasked, text, tokens, reverse }
    },
    template: `
      <p>Regex</p>
      <input v-model="regex" class="bg-gray-200 p-2" placeholder="Regex" />
      <input type="checkbox" v-model="reverse" /> Reverse ({{ reverse}})
      <p>Text</p>
      <input v-model="text" ref="input" class="bg-gray-200 p-2" placeholder="Text" />

      <p>Tokens</p>
      <TokensRenderer :tokens="tokens" :value="text" />
      <PossibleTokens :tokens="tokens" :value="text" />

      <p>masked: {{ masked }}</p>
      <p>unmasked: {{ unmasked }}</p>
    `,
  }),
})

export const Phone = defineStory({
  story: () => ({
    setup () {
      const value = ref('3809312345678')
      const input = ref()

      const phoneMask = createRegexMask(/\+(\d{1,3}) \(\d{2,3}\) \d\d\d-\d\d-\d\d/)

      const { masked, unmasked } = useInputMask(phoneMask, input)

      return { value, input, masked, unmasked }
    },
    template: `
      <input v-model="value" ref="input" class="bg-gray-200 p-2" placeholder="Phone" />

      <p>masked: {{ masked }}</p>
      <p>unmasked: {{ unmasked }}</p>
    `,
  }),
})

export const CreditCard = defineStory({
  story: () => ({
    setup () {
      const value = ref('1111222233334444')
      const input = ref()

      const creditCardMask = createRegexMask(/(\d{4} ){3}\d{4}/)
      const { masked, unmasked } = useInputMask(creditCardMask, input)

      return { value, input, masked, unmasked }
    },
    template: `
      <input v-model="value" ref="input" class="bg-gray-200 p-2" placeholder="Credit Card" />

      <p>masked: {{ masked }}</p>
      <p>unmasked: {{ unmasked }}</p>
    `,
  }),
})

export const WithOptionalGroup = defineStory({
  story: () => ({
    setup () {
      const value = ref('')
      const input = ref()

      const { masked, unmasked } = useInputMask(createRegexMask(/(\+(\d{1,3}) )?\(\d{2,3}\) (\d){3}-\d\d-\d\d/), input)

      return { value, input, masked, unmasked }
    },
    template: `
      <input v-model="value" ref="input" class="bg-gray-200 p-2" placeholder="Phone" />

      <p>masked: {{ masked }}</p>
      <p>unmasked: {{ unmasked }}</p>
    `,
  }),
})

export const WithOrGroup = defineStory({
  story: () => ({
    setup () {
      const value = ref('')
      const input = ref()

      const { masked, unmasked } = useInputMask(createRegexMask(/\+(7 \(\d{3}\)|380 \(\d{2}\)) (\d){3}-\d\d-\d\d/), input)

      return { value, input, masked, unmasked }
    },
    template: `
      <input v-model="value" ref="input" class="bg-gray-200 p-2" placeholder="Phone" />

      <p>masked: {{ masked }}</p>
      <p>unmasked: {{ unmasked }}</p>
    `,
  }),
})

export const Ipv6 = defineStory({
  story: () => ({
    setup () {
      const value = ref('1234567890123456')
      const input = ref()

      const ipv6Regex = createRegexMask(/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))/)

      const { masked, unmasked } = useInputMask(ipv6Regex, input)

      return { value, input, masked, unmasked }
    },
    template: `
      <input v-model="value" ref="input" class="bg-gray-200 p-2" placeholder="Ipv6" />

      <p>masked: {{ masked }}</p>
      <p>unmasked: {{ unmasked }}</p>
    `,
  }),
})

export const Date = defineStory({
  story: () => ({
    setup () {
      const value = ref('1234567890123456')
      const input = ref()

      const dateMask = createDateMask()

      const { masked, unmasked } = useInputMask(dateMask, input)

      return { value, input, masked, unmasked }
    },
    template: `
      <input v-model="value" ref="input" class="bg-gray-200 p-2" placeholder="Date" />

      <p>masked: {{ masked }}</p>
      <p>unmasked: {{ unmasked }}</p>
    `,
  }),
})

export const DateRange = defineStory({
  story: () => ({
    setup () {
      const value = ref('')
      const input = ref()

      const dateMask = createDateMask('dd/mm/yyyy - dd/mm/yyyy')

      const { masked, unmasked } = useInputMask(dateMask, input)

      return { value, input, masked, unmasked }
    },
    template: `
      <input v-model="value" ref="input" class="bg-gray-200 p-2 w-64" placeholder="Date" />

      <p>masked: {{ masked }}</p>
      <p>unmasked: {{ unmasked }}</p>
    `,
  }),
})

export const Numeral = defineStory({
  story: () => ({
    setup () {
      const value = ref('123456')
      const input = ref()

      const numeralRegex = createRegexMask(/(\d{3} - )*(\d{3})/)
      const { masked, unmasked } = useInputMask(numeralRegex, input)

      return { value, input, masked, unmasked }
    },
    template: `
      <input v-model="value" ref="input" class="bg-gray-200 p-2" placeholder="Numeral" />

      <p>masked: {{ masked }}</p>
      <p>unmasked: {{ unmasked }}</p>
    `,
  }),
})

export const ReversedNumeral = defineStory({
  story: () => ({
    setup () {
      const value = ref('123456')
      const input = ref()

      const numeralRegex = createRegexMask(/(\d{3} - )*(\d{3})/, { reverse: true })
      const { masked, unmasked } = useInputMask(numeralRegex, input)

      return { value, input, masked, unmasked }
    },
    template: `
      <input v-model="value" ref="input" class="bg-gray-200 p-2" placeholder="Numeral" />

      <p>masked: {{ masked }}</p>
      <p>unmasked: {{ unmasked }}</p>
    `,
  }),
})

export const NumeralWithDecimal = defineStory({
  story: () => ({
    setup () {
      const value = ref('123456')
      const input = ref()

      const numeralRegex = createNumeralMask()
      const { masked, unmasked } = useInputMask(numeralRegex, input)

      return { value, input, masked, unmasked }
    },
    template: `
      <input v-model="value" ref="input" class="bg-gray-200 p-2" placeholder="Numeral" />

      <p>masked: {{ masked }}</p>
      <p>unmasked: {{ unmasked }}</p>
    `,
  }),
})

export const NumeralWithDecimalCustomChar = defineStory({
  story: () => ({
    setup () {
      const value = ref('123456')
      const input = ref()

      const numeralRegex = createNumeralMask({
        decimalChar: ',',
      })
      const { masked, unmasked } = useInputMask(numeralRegex, input)

      return { value, input, masked, unmasked }
    },
    template: `
      <input v-model="value" ref="input" class="bg-gray-200 p-2" placeholder="Numeral" />

      <p>masked: {{ masked }}</p>
      <p>unmasked: {{ unmasked }}</p>
    `,
  }),
})

export const NumeralMaskWithoutDecimal = defineStory({
  story: () => ({
    setup () {
      const value = ref('123456')
      const input = ref()

      const numeralRegex = createNumeralMask({
        decimal: false,
      })
      const { masked, unmasked } = useInputMask(numeralRegex, input)

      return { value, input, masked, unmasked }
    },
    template: `
      <input v-model="value" ref="input" class="bg-gray-200 p-2" placeholder="Numeral" />

      <p>masked: {{ masked }}</p>
      <p>unmasked: {{ unmasked }}</p>
    `,
  }),
})

export const CustomMask = defineStory({
  story: () => ({
    setup () {
      const value = ref('123456')
      const input = ref()

      const dateMask = createRegexMask(/\d\d (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/)
      const { masked, unmasked } = useInputMask({
        ...dateMask,
        format (text) {
          const formatted = dateMask.format(text)

          const day = formatted.text.slice(0, 2)
          const month = formatted.text.slice(3, 6)

          if (month === 'Feb' && parseInt(day) > 28) {
            return {
              ...formatted,
              text: '28 Feb',
            }
          }

          if (['Apr', 'Jun', 'Sep', 'Nov'].includes(month) && parseInt(day) > 30) {
            return {
              ...formatted,
              text: '30 ' + month,
            }
          }

          if (parseInt(day) > 31) {
            return {
              ...formatted,
              text: '31 ' + month,
            }
          }

          return formatted
        },

      }, input)

      return { value, input, masked, unmasked }
    },
    template: `
      <input v-model="value" ref="input" class="bg-gray-200 p-2" placeholder="Numeral" />

      <p>masked: {{ masked }}</p>
      <p>unmasked: {{ unmasked }}</p>
    `,
  }),
})

export const WithVueComponent = defineStory({
  story: () => ({
    components: { VaInput },
    setup () {
      const value = ref('123456')
      const input = ref()

      const numeralRegex = createNumeralMask({
        decimal: false,
      })
      const { masked, unmasked } = useInputMask(numeralRegex, input)

      return { value, input, masked, unmasked }
    },
    template: `
      <VaInput
        v-model="value"
        ref="input"
        :rules="[(v) => !!v || 'Required']"
      />

      <p>masked: {{ masked }}</p>
      <p>unmasked: {{ unmasked }}</p>
    `,
  }),
})
