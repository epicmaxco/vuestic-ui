<template>
  <VbDemo>
    <VbCard
      title="Options as array of string"
    >
      <va-option-list
        :options="baseData.options"
        :default-value="baseData.options[0]"
        color="primary"
        type="radio"
        name="test-1"
        v-model="baseData.selected"
      />
      Selected {{ baseData.selected }}
    </VbCard>
    <VbCard
      title="Disable all"
    >
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selectedDisabledList"
        name="test-2"
        type="radio"
        disabled
      />
      Selected {{ baseData.selectedDisabledList }}
    </VbCard>
    <VbCard
      title="Left label"
    >
      <va-option-list
        :options="baseData.options"
        type="radio"
        name="test-3"
        color="primary"
        left-label
      />
    </VbCard>
    <VbCard
      title="Readonly"
    >
      <va-option-list
        :options="baseData.options"
        readonly
        color="primary"
        name="test-4"
        type="radio"
      />
    </VbCard>
    <VbCard
      title="Use more complex data"
    >
      <va-option-list
        :options="complexData.options"
        v-model="complexData.selectedValue"
        name="test-5"
        type="radio"
        color="warning"
      />
      Selected {{ complexData.selectedValue }}
    </VbCard>

    <VbCard
      title="Return whole object"
    >
      <va-option-list
        :options="complexData.options"
        v-model="complexData.selectedObject"
        :default-value="complexData.options[1]"
        name="test-6"
        type="radio"
        output-object
        color="warning"
      />
      Selected {{ complexData.selectedObject }}
    </VbCard>
    <VbCard
      title="Using slot"
    >
      <va-option-list
        :options="complexData.options"
        v-model="complexData.selectedValueFromSlot"
        :default-value="complexData.options[0]"
        color="danger"
        name="test-7"
      >
        <template v-slot="{ props }">
          <pre>{{ props }}</pre>
          <va-radio
            :option="props.option"
            :disabled="props.isDisabled(props.option)"
            :name="props.name"
            :color="props.color"
            :left-label="props.leftLabel"
            :label="props.getText(props.option)"
            v-model="complexData.selectedValueFromSlot"
            :tabindex="props.index"
          />
        </template>
      </va-option-list>
    </VbCard>
    <VbCard
      title="Checkbox"
    >
      <va-option-list
        :options="checkboxData.options"
        v-model="checkboxData.selectedObject"
        color="warning"
      />
      Selected {{ checkboxData.selectedObject }}
    </VbCard>
  </VbDemo>
</template>

<script>
import VaOptionList from './VaOptionList'
import VaRadio from '../va-radio/VaRadio'

export default {
  components: { VaOptionList, VaRadio },
  data () {
    return {
      baseData: {
        options: ['test', 'test1', 'test2'],
        selected: undefined,
        selectedDisabledList: undefined,
      },
      complexData: {
        options: [
          {
            text: 'test',
            value: 'test-value',
            disabled: false,
          },
          {
            text: 'test',
            value: 'test-value1',
            disabled: false,
          },
          {
            text: 'test',
            value: 'test-value2',
            disabled: true,
          },
        ],
        selectedValue: undefined,
        selectedObject: undefined,
        selectedValueFromSlot: undefined,
      },
      checkboxData: {
        options: [
          {
            text: 'test',
            value: 'test-1',
            disabled: false,
          },
          {
            text: 'test',
            value: 'test-2',
            disabled: false,
          },
          {
            text: 'test',
            value: 'test-3',
            disabled: true,
          },
        ],
        selectedValue: undefined,
        selectedObject: undefined,
        selectedValueFromSlot: undefined,
      },
    }
  },
}
</script>
