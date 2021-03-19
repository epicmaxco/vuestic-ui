<template>
  <VbDemo>
    <VbCard title="Placeholder">
      <va-input
        v-model="empty"
        placeholder="Name"
      />
    </VbCard>
    <VbCard title="Label">
      <va-input
        v-model="text"
        label="Name"
      />
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
    <VbCard title="Removable Icon">
      <va-input
        v-model="text"
        removable
      />
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
    <VbCard title="Success and Removable">
      <va-input
        v-model="text"
        label="Name"
        removable
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
    <VbCard title="Textarea">
      <va-input
        v-model="text"
        label="Name"
        type="textarea"
      />
    </VbCard>
    <VbCard title="Textarea limits">
      <va-input
        v-model="text"
        label="Name"
        type="textarea"
        :min-rows="3"
        :max-rows="8"
      />
    </VbCard>
    <VbCard title="Textarea autosize">
      <va-input
        v-model="autosizeValue"
        label="Name"
        type="textarea"
        autosize
      />
    </VbCard>
    <VbCard title="Textarea autosize limits (2-4)">
      <va-input
        v-model="autosizeValueWithLimits"
        label="Name"
        type="textarea"
        autosize
        :min-rows="2"
        :max-rows="4"
      />
    </VbCard>
    <VbCard title="Masked input">
      <va-input
        v-model="maskCreditCardValue"
        :style="{paddingTop: '4px'}"
        label="Credit card mask"
        type="input"
        mask="creditCard"
      />
      Value: {{maskCreditCardValue}}
      <va-input
        v-model="maskDateValue"
        :style="{paddingTop: '4px'}"
        label="Date mask"
        type="input"
        mask="date"
      />
      Value: {{maskDateValue}}
      <va-input
        v-model="maskTimeValue"
        :style="{paddingTop: '4px'}"
        label="Time mask"
        type="input"
        mask="time"
      />
      Value: {{maskTimeValue}}
      <va-input
        v-model="maskNumeralsValue"
        :style="{paddingTop: '4px'}"
        label="Only numerals mask"
        type="input"
        mask="numeral"
      />
      Value: {{maskNumeralsValue}}
      <va-input
        v-model="maskCustomBlocksValue"
        :style="{paddingTop: '4px'}"
        label="Custom blocks mask"
        placeholder="# ##### #####"
        type="input"
        :mask="{blocks: [1, 5, 5]}"
      />
      Value: {{maskCustomBlocksValue}}
      <va-input
        v-model="maskReturnFormattedValue"
        :style="{paddingTop: '4px'}"
        label="Date mask, return formatted"
        :returnRaw="false"
        type="input"
        mask="date"
      />
      Value: {{maskReturnFormattedValue}}
    </VbCard>
    <VbCard title="Number input">
      <va-input type="number" v-model="num" />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaInput from './index'
import VaButton from './../va-button'
import VaIcon from './../va-icon'
import VaInputValidation from './VaInput-validation'

export default {
  components: {
    VaInputValidation,
    VaInput,
    VaButton,
    VaIcon,
  },
  data () {
    return {
      empty: '',
      text: 'Vuestic\nLine 2\nLine 3\nLine 4\nLine 5',
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
      num: 10,
    }
  },
}
</script>
