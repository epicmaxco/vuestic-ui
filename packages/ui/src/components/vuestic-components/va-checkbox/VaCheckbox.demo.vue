<template>
  <VbDemo>
    <VbCard title="Default">
      <va-checkbox
        v-model="value"
        label="Selected"
      />
      {{ value }}
    </VbCard>
    <VbCard title="Long label">
      <va-checkbox
        style="width: 200px;"
        v-model="value"
        label="Long long long long long long long long long long long long long long long label"
      />
    </VbCard>
    <VbCard title="color">
      <va-checkbox
        color="purple"
        v-model="value"
        label="Purple"
      />
      <va-checkbox
        color="primary"
        v-model="value"
        label="Primary"
      />
    </VbCard>
    <VbCard title="Readonly">
      <va-checkbox
        v-model="value"
        label="Readonly"
        readonly
      />
    </VbCard>
    <VbCard title="Left label">
      <va-checkbox
        v-model="value"
        label="Left label"
        left-label
      />
    </VbCard>
    <VbCard title="Disabled">
      <va-checkbox
        v-model="value"
        label="Disabled"
        disabled
      />
    </VbCard>
    <VbCard title="Disabled to normal comparison">
      <va-checkbox
        :modelValue="false"
        label="Disabled and false"
        disabled
      />
      <va-checkbox
        :modelValue="false"
        label="false"
      />
      <va-checkbox
        :modelValue="true"
        label="Disabled and true"
        disabled
      />
      <va-checkbox
        :modelValue="true"
        label="true"
      />
    </VbCard>
    <VbCard title="Custom trueValue, falseValue">
      <div>
        {{customTrueFalse}}
      </div>
      <va-checkbox
        v-model="customTrueFalse"
        true-value="agree"
        false-value="disagree"
        :label="`${customTrueFalse}`"
      />
    </VbCard>
    <VbCard title="Indeterminate">
      <va-checkbox
        v-model="valueIndeterminateDefault"
        :label="`${valueIndeterminateDefault}`"
        indeterminate
      />
    </VbCard>
    <VbCard title="Indeterminate with custom values">
      <va-checkbox
        v-model="valueIndeterminate"
        :label="`${valueIndeterminate}`"
        true-value="agree"
        false-value="disagree"
        indeterminate-value="idk"
        indeterminate
      />
    </VbCard>

    <VbCard title="Error">
      <va-checkbox
        v-model="value"
        label="Error"
        error
      />
    </VbCard>
    <VbCard title="String error message">
      <va-checkbox
        v-model="value"
        error
        label="Error messages"
        :error-messages="stringErrorMessage"
      />
    </VbCard>
    <VbCard title="Array error messages">
      <va-checkbox
        v-model="value"
        error
        :error-messages="errorMessages"
        label="Multiple error messages"
      />
    </VbCard>
    <VbCard title="Array error messages with maxed limit">
      <va-checkbox
        style="width: 200px;"
        v-model="value"
        error
        :error-messages="errorMessages"
        :error-count="3"
        label="Label"
      />
    </VbCard>
    <VbCard title="Errors + disabled">
      <va-checkbox
        v-model="value"
        error
        disabled
        label="Error + disabled"
      />
    </VbCard>
    <VbCard title="No label">
      <va-checkbox v-model="value" />
    </VbCard>
    <VbCard title="Accepts id">
      <va-checkbox
        id="checkbox-id"
      />
    </VbCard>
    <VbCard title="Accepts name">
      <va-checkbox name="checkbox-name" />
    </VbCard>
    <VbCard title="With validation (required rule)">
      <va-checkbox
        v-model="value"
        :rules="[(v) => !!v || 'required']"
      />
    </VbCard>
    <VaCheckboxValidation />
    <VbCard title="Array as model">
      {{ selection }}
      <va-checkbox
        v-model="selection"
        array-value="one"
        label="one"
      />
      <va-checkbox
        v-model="selection"
        array-value="two"
        label="two"
      />
      <va-checkbox
        v-model="selection"
        array-value="three"
        label="three"
      />
      <va-checkbox
        v-model="selection"
        array-value="four"
        label="four"
      />
    </VbCard>
    <VbCard title="Stateful">
      <va-checkbox
        stateful
      />
    </VbCard>
    <VbCard title="Stateful indeterminate">
      <va-checkbox
        stateful
        indeterminate
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaCheckbox from './index'
import VaCheckboxValidation from './VaCheckbox-validation'

export default {
  components: {
    VaCheckboxValidation,
    VaCheckbox,
  },
  data () {
    return {
      value: true,
      valueIndeterminateDefault: null,
      valueIndeterminate: 'agree',
      customTrueFalse: 'disagree',
      selection: [],
      stringErrorMessage: 'String error message',
      errorMessages: ['Error message', 'Another error message', 'Long long long long long long long long long long long long long long error message'],
    }
  },
}
</script>
