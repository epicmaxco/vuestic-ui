<template>
  <VbDemo>
    <VbCard title="Default">
      <va-radio v-model="selectedOptionString" :options="options" />
      <div>Selected: {{ selectedOptionString }}</div>
    </VbCard>
    <VbCard title="Disabled">
      <va-radio
        v-model="selectedOptionString"
        :options="options"
        :disabled="isDisabled"
      />
      <va-checkbox class="mt-2" v-model="isDisabled" label="is Disabled" />
    </VbCard>
    <VbCard title="Readonly">
      <va-radio
        v-model="selectedOptionString"
        :options="options"
        :readonly="isReadonly"
      />
      <va-checkbox class="mt-2" v-model="isReadonly" label="is Readonly" />
    </VbCard>
    <VbCard title="Left label">
      <va-radio v-model="selectedOptionString" :options="options" left-label />
    </VbCard>
    <VbCard title="Colored">
      <va-radio
        v-model="selectedOptionString"
        :options="[options[0]]"
        color="warning"
      />
      <va-radio
        v-model="selectedOptionString"
        :options="[options[1]]"
        color="danger"
      />
      <va-radio
        v-model="selectedOptionString"
        :options="[options[2]]"
        color="info"
      />
    </VbCard>
    <VbCard title="Error">
      <va-radio v-model="selectedOptionString" :options="options" error />
    </VbCard>
    <VbCard title="String error message">
      <va-radio
        v-model="selectedOptionString"
        :options="options"
        error
        :error-messages="stringErrorMessage"
      />
    </VbCard>
    <VbCard title="Validation with rules">
      <va-radio
        v-model="selectedOption"
        :options="options"
        :rules="rules"
        value-by="value"
      />
    </VbCard>
    <VbCard title="Single option">
      <va-radio
        v-model="selectedOption"
        :option="options[0]"
        :rules="rules"
        value-by="value"
      />
      <va-radio
        v-model="selectedOption"
        :option="options[1]"
        :rules="rules"
        value-by="value"
      />
      <va-radio
        v-model="selectedOption"
        :option="options[2]"
        :rules="rules"
        value-by="value"
      />
    </VbCard>

    <VbCard title="Label prop">
      <va-radio
        v-model="selectedOption"
        :option="options[0]"
        label="1"
      />
      <va-radio
        v-model="selectedOption"
        :option="options[1]"
        label="2"
      />
      <va-radio
        v-model="selectedOption"
        :option="options[2]"
        label="3"
      />
      <p>{{ selectedOption }}</p>
    </VbCard>
    <VbCard title="No label">
      <va-radio
        v-model="selectedOption"
        :option="options[0]"
        label=""
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaRadio } from './index'
import { VaCheckbox } from '../va-checkbox'

export default {
  components: { VaRadio, VaCheckbox },
  data () {
    return {
      options: [
        { value: 'one', text: 'one' },
        { value: 'two', text: 'two' },
        { value: 'three', text: 'three' },
      ],
      selectedOptionString: 'one',

      isDisabled: true,
      isReadonly: true,
      stringErrorMessage: 'String error message',
      arrayErrorMessages: [
        'Error message',
        'Another error message',
      ],
      rules: [(v) => v === 'one' || 'Value should be one'],
      selectedOption: 'one',
    }
  },
}
</script>
