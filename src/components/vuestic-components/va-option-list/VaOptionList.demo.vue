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
        v-model="baseData.selected"
      />
      Selected {{ baseData.selected }}
    </VbCard>
    <VbCard
      title="Disable all"
    >
      <va-option-list
        :options="baseData.options"
        type="radio"
        disabled
      />
    </VbCard>
    <VbCard
      title="Left label"
    >
      <va-option-list
        :options="baseData.options"
        type="radio"
        color="primary"
        left-label
      />
    </VbCard>
    <VbCard
      title="Readonly"
    >
      <va-option-list
        :options="baseData.options"
        :default-value="baseData.options[0]"
        color="danger"
        type="radio"
        readonly
      />
    </VbCard>
    <VbCard
      title="Use more complex data"
    >
      <va-option-list
        :options="complexData.options"
        v-model="complexData.selectedValue"
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
      >
        <template v-slot="{ props }">
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
      Selected {{ complexData.selectedValueFromSlot }}
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
