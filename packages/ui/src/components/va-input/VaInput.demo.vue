<template>
  <VbDemo class="va-input-css-classes-demo">
    <VbCard title="default">
      <va-input />
    </VbCard>
    <VbCard title="Placeholder">
      <va-input
        placeholder="Country name"
      />
      <va-input
        outline
        placeholder="Country name"
      />
      <va-input
        bordered
        placeholder="Country name"
      />
    </VbCard>
    <VbCard title="Attrs">
      'Check input in devtools'
      <va-input
        id="input-ID"
        name="input-Name"
        placeholder="With ID and Name attrs"
      />
    </VbCard>
    <VbCard title="Label">
      <va-input
        v-model="text"
        label="Country"
      />
      <va-input
        v-model="text"
        outline
        label="Country"
      />
      <va-input
        v-model="text"
        bordered
        label="Country"
      />
    </VbCard>

    <VbCard title="Validation">
      <va-input
        v-model="text"
        label="Country"
        success
      />
      <va-input
        v-model="text"
        outline
        label="Country"
        success
      />
      <va-input
        v-model="text"
        bordered
        label="Country"
        success
      />

      <va-input
        v-model="text"
        label="Country"
        error
      />
      <va-input
        v-model="text"
        outline
        label="Country"
        error
      />
      <va-input
        v-model="text"
        bordered
        label="Country"
        error
      />

      <va-input
        v-model="text"
        label="Country"
        success
        :messages="['This username is available.']"
      />

      <va-input
        v-model="text"
        label="Country"
        error
        :error-messages="['Please choose a country you’d like to respawn in.']"
      />

      <va-input
        v-model="text"
        label="Country"
        success
        :messages="['There is error message, but it is hidden cuz of success']"
        :error-messages="['There is a success message, but it is hidden cuz of error']"
      />

      <va-input
        v-model="text"
        label="Country"
        error
        :messages="['There is error message, but it is hidden cuz of success']"
        :error-messages="['There is a success message, but it is hidden cuz of error']"
      />

      <va-input
        v-model="text"
        label="Country"
        :messages="['There is error message, but it is hidden cuz of no error']"
        :error-messages="['There is a success message, but it is hidden cuz of error']"
      />
    </VbCard>

    <VbCard title="Prepend / Append Inner">
      <va-input
        v-model="text"
        label="Country"
      >
        <template #prependInner>
          <va-icon
            name="search"
            color="primary"
            size="small"
          />
        </template>
      </va-input>
      <va-input
        v-model="text"
        outline
        label="Country"
        color="#ff00ff"
      >
        <template #prependInner>
          <va-icon
            name="search"
            color="#ff00ff"
            size="small"
          />
        </template>
      </va-input>
      <va-input
        v-model="text"
        bordered
        label="Country"
        color="#1dd62d"
      >
        <template #prependInner>
          <va-icon
            name="search"
            color="#1dd62d"
            size="small"
          />
        </template>
      </va-input>
      <va-input
        v-model="text"
        label="Country"
        success
      >
        <template #prependInner>
          <va-icon
            name="search"
            color="primary"
            size="small"
          />
        </template>
      </va-input>
      <va-input
        v-model="text"
        label="Country"
        error
      >
        <template #prependInner>
          <va-icon
            name="search"
            color="primary"
            size="small"
          />
        </template>
      </va-input>

      <va-input
        v-model="text"
        label="Country"
      >
        <template #appendInner>
          <va-icon
            name="calendar_today"
            color="primary"
            size="small"
          />
        </template>
      </va-input>
      <va-input
        v-model="text"
        outline
        label="Country"
        color="#ff00ff"
      >
        <template #appendInner>
          <va-icon
            name="calendar_today"
            color="#ff00ff"
            size="small"
          />
        </template>
      </va-input>
      <va-input
        v-model="text"
        bordered
        label="Country"
        color="#1dd62d"
      >
        <template #appendInner>
          <va-icon
            name="calendar_today"
            color="#1dd62d"
            size="small"
          />
        </template>
      </va-input>
      <va-input
        v-model="text"
        label="Country"
        success
      >
        <template #appendInner>
          <va-icon
            name="calendar_today"
            color="primary"
            size="small"
          />
        </template>
      </va-input>
      <va-input
        v-model="text"
        label="Country"
        error
      >
        <template #appendInner>
          <va-icon
            name="calendar_today"
            color="primary"
            size="small"
          />
        </template>
      </va-input>
    </VbCard>

    <VbCard title="Label long">
      <va-input
        v-model="text"
        label="Name long long long long long long long long long long long long"
      />
    </VbCard>
    <VbCard title="Message">
      <va-input
        v-model="text"
        :messages="messages"
      />
      <va-input v-model="text" messages="Custom message">
        <template #messages="{ messages }">
          <span class="custom-message">{{ messages }}</span>
        </template>
      </va-input>
    </VbCard>
    <VbCard title="Required Mark">
      <va-input
        v-model="text"
        label="name"
        required-mark
      />
    </VbCard>
    <VbCard title="Disabled">
      <va-input
        v-model="text"
        disabled
      />
    </VbCard>
    <VbCard title="Readonly Input">
      <va-input
        v-model="text"
        readonly
      />
    </VbCard>
    <VbCard title="Icon">
      <va-input
        v-model="text"
        label="Name"
      >
        <template #prependInner>
          <va-icon
            name="share"
          />
        </template>
      </va-input>
    </VbCard>
    <VbCard title="Button">
      <va-input
        v-model="text"
        label="Name"
      >
        <template #appendInner>
          <va-button
            style="margin-right: 0;"
            size="small"
          >
            Upload
          </va-button>
        </template>
      </va-input>
    </VbCard>
    <VbCard title="Prepend Slot">
      <va-input
        v-model="text"
        label="Name"
      >
        <template #prepend>
          <va-icon
            name="share"
          />
        </template>
      </va-input>
    </VbCard>
    <VbCard title="Prepend Inner Slot">
      <va-input
        v-model="text"
        label="Name"
      >
        <template #prependInner>
          <va-icon
            name="share"
          />
        </template>
      </va-input>
    </VbCard>
    <VbCard title="Append Slot">
      <va-input
        v-model="text"
        label="Name"
      >
        <template #append>
          <va-icon
            name="share"
          />
        </template>
      </va-input>
    </VbCard>
    <VbCard title="Append Inner Slot">
      <va-input
        v-model="text"
        label="Name"
      >
        <template #appendInner>
          <va-icon
            name="share"
          />
        </template>
      </va-input>
    </VbCard>
    <VbCard title="clearable Icon">
      <va-checkbox
        class="my-3"
        label="Clearable"
        v-model="isClearable"
      />
      <va-input
        v-model="text"
        :clearable="isClearable"
      />
      <va-input
        label="Disabled state"
        v-model="text"
        disabled
        :clearable="isClearable"
      />
      <va-input
        label="Readonly state"
        v-model="text"
        readonly
        :clearable="isClearable"
      />
      <va-input
        v-model="text"
        label="Error"
        error
        :error-messages="errorMessages"
        :clearable="isClearable"
      />
      <va-input
        v-model="text"
        label="Success"
        success
        :clearable="isClearable"
        :messages="successMessages"
      />
    </VbCard>
    <VbCard title="All slots">
      <va-input
        v-model="text"
        label="All slots"
        :messages="messages"
        clearable
      >
        <template #prepend><va-icon name="share" /></template>
        <template #prependInner><va-icon name="share" /></template>
        <template #appendInner><va-icon name="share" /></template>
        <template #append><va-icon name="share" /></template>
      </va-input>
    </VbCard>
    <VbCard title="Error">
      <va-input
        v-model="text"
        label="Name"
        error
      />
    </VbCard>
    <VbCard title="Success">
      <va-input
        v-model="text"
        label="Name"
        success
      />
    </VbCard>
    <VbCard title="Success and clearable">
      <va-input
        v-model="text"
        label="Name"
        clearable
        success
        :messages="successMessages"
      />
    </VbCard>
    <VbCard title="Error Message">
      <va-input
        v-model="text"
        label="Name"
        error
        :error-messages="errorMessages"
      />
    </VbCard>
    <VbCard title="Error count 2">
      <va-input
        v-model="text"
        label="Name"
        error
        :error-count="2"
        :error-messages="['one', 'two']"
      />
    </VbCard>
    <VaInputValidation />

    <VbCard title="Masked input">
      <va-input
        v-model="maskCreditCardValue"
        :style="{paddingTop: '4px'}"
        label="Credit card mask"
        type="input"
        mask="creditCard"
      />
      Value: {{ maskCreditCardValue }}
      <va-input
        v-model="maskDateValue"
        :style="{paddingTop: '4px'}"
        label="Date mask"
        type="input"
        mask="date"
      />
      Value: {{ maskDateValue }}
      <va-input
        v-model="maskTimeValue"
        :style="{paddingTop: '4px'}"
        label="Time mask"
        type="input"
        mask="time"
      />
      Value: {{ maskTimeValue }}
      <va-input
        v-model="maskNumeralsValue"
        :style="{paddingTop: '4px'}"
        label="Only numerals mask"
        type="input"
        mask="numeral"
      />
      Value: {{ maskNumeralsValue }}
      <va-input
        v-model="maskCustomBlocksValue"
        :style="{paddingTop: '4px'}"
        label="Custom blocks mask"
        placeholder="# ##### #####"
        type="input"
        :mask="{blocks: [1, 5, 5]}"
      />
      Value: {{ maskCustomBlocksValue }}
      <va-input
        v-model="maskReturnFormattedValue"
        :style="{paddingTop: '4px'}"
        label="Date mask, return formatted"
        :return-raw="false"
        type="input"
        mask="date"
      />
      Value: {{ maskReturnFormattedValue }}
      <va-input
        v-model="maskObjectReturnFormattedValue"
        :style="{paddingTop: '4px'}"
        label="Phone mask, return formatted"
        :return-raw="false"
        type="input"
        :mask="{
          phone: true,
          phoneRegionCode: 'US'
        }"
      />
      Value: {{ maskObjectReturnFormattedValue }}
    </VbCard>
    <VbCard title="Number input">
      <va-input
        v-model="num"
        type="number"
      />
    </VbCard>
    <VbCard title="Counter">
      <va-input
        v-model="counterOrMaxLengthValue"
        counter
        class="mb-6"
      />
      <va-input
        v-model="counterOrMaxLengthValue"
        counter
        label="Name"
        class="mb-6"
      />
      <va-input
        v-model="counterOrMaxLengthValue"
        counter
        class="mb-6"
      >
        <template #counter="{ valueLength }">
          Additional message, {{ valueLength }}
        </template>
      </va-input>
      <va-input
        v-model="counterOrMaxLengthValue"
        counter
        label="Name"
      >
        <template #counter="{ valueLength }">
          Additional message, {{ valueLength }}
        </template>
      </va-input>
    </VbCard>
    <VbCard title="Max length">
      <va-input
        v-model="counterOrMaxLengthValue"
        :maxlength="maxLength"
        counter
      />
      <va-input
        v-model="counterOrMaxLengthValue"
        :maxlength="maxLength"
        counter
        label="Name"
        class="mb-6"
      />
      <va-input
        v-model="counterOrMaxLengthValue"
        :maxlength="maxLength"
        counter
        class="mb-6"
      >
        <template #counter="{ valueLength, maxLength }">
          Additional message, {{ `${valueLength}/${maxLength}` }}
        </template>
      </va-input>
      <va-input
        v-model="counterOrMaxLengthValue"
        :maxlength="maxLength"
        counter
        label="Name"
      >
        <template #counter="{ valueLength, maxLength }">
          Additional message, {{ `${valueLength}/${maxLength}` }}
        </template>
      </va-input>
    </VbCard>
    <VbCard
      title="CSS Classes"
      class="va-input-css-classes-demo"
      style="width: 66%;"
    >
      <va-input
        class="mb-6"
        input-class="red va-text-right"
        model-value="This input must have margin bottom and right-aligned red text."
      />
      <va-input
        class="border-blue"
        input-class="p-2 red"
        model-value="Native input element must have red text and big padding. VaInput wrapper has a blue border."
      />
    </VbCard>
    <VbCard
      title="Focus FN"
      class="va-input-css-classes-demo"
      style="width: 66%;"
    >
      <va-input
        ref="input"
        model-value="This input must have margin bottom and right-aligned red text."
      />
      <button @click="focusInput">
        Focus programmatically
      </button>
    </VbCard>

    <VbCard
      title="Input event"
      class="va-input-css-classes-demo"
      style="width: 66%;"
    >
      Value: {{ numProxy }}
      <va-input
        v-model="numProxy"
        class="mb-6"
        label="Max number is 10"
        @input="
          (e) => (e.target.value = numProxy)
        "
      />
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { VaInput } from './index'
import { VaButton } from './../va-button'
import { VaIcon } from './../va-icon'
import VaInputValidation from './VaInput-validation.vue'
import { VaCheckbox } from '../va-checkbox'
import 'cleave.js/dist/addons/cleave-phone.us'

export default defineComponent({
  components: {
    VaInputValidation,
    VaInput,
    VaButton,
    VaIcon,
    VaCheckbox,
  },
  data () {
    return {
      empty: '',
      text: 'Vuestic\n Line 2\n Line 3\n Line 4\n Line 5',
      phone: '33 310-86-24',
      messages: ['Required field'],
      errorMessages: ['Detailed error message'],
      successMessages: ['Success message'],

      autosizeValue: 'one\ntwo\nthree',
      autosizeValueWithLimits: 'one\ntwo\nthree',

      maskCreditCardValue: '',
      maskDateValue: '',
      maskTimeValue: '',
      maskNumeralsValue: '',
      maskCustomBlocksValue: '',
      maskReturnFormattedValue: '',
      maskObjectReturnFormattedValue: '',
      num: 10,

      isClearable: true,

      counterOrMaxLengthValue: '',
      maxLength: 30,
    }
  },
  methods: {
    focusInput () {
      (this.$refs.input as any).focus()
    },
  },
  computed: {
    numProxy: {
      get () { return this.num },
      set (v: number) { this.num = v > 10 ? 10 : v },
    },
  },
})
</script>

<style lang="scss">
.va-input-css-classes-demo {
  .va-input-wrapper {
    margin-bottom: 1rem;
  }

  .mb-6 {
    margin-bottom: 4rem;
  }

  .red {
    color: red;
  }

  .p-2 {
    padding: 2rem;
  }

  .border-blue {
    border: 1px solid blue;
  }

  .custom-message {
    color: rgb(153, 0, 255);
    font-size: 16px;
  }
}
</style>
