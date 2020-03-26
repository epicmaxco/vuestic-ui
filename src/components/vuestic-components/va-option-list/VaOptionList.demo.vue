<template>
  <VbDemo>
    <VbCard
      title="Options as array of string"
    >
      <va-option-list
        :options="baseData.options"
      />
    </VbCard>
    <VbCard
      title="Color options"
    >
      <va-option-list
        :options="baseData.options"
        color="danger"
      />
    </VbCard>

    <VbCard
      title="With v-model"
    >
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selected"
      />
      Selected {{ baseData.selected }}
    </VbCard>
    <VbCard
      title="With default value and v-model"
    >
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selectedWithVmodel"
        :default-value="[baseData.options[0], baseData.options[2]]"
      />
      Selected {{ baseData.selectedWithVmodel }}
    </VbCard>
    <VbCard
      title="Disable all"
    >
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selectedDisabledList"
        disabled
      />
      Selected {{ baseData.selectedDisabledList }}
    </VbCard>
    <VbCard
      title="Left label"
    >
      <va-option-list
        :options="baseData.options"
        left-label
      />
    </VbCard>
    <VbCard
      title="Readonly"
    >
      <va-option-list
        :options="baseData.options"
        readonly
      />
    </VbCard>
    <VbCard
      title="Use more complex data"
    >
      <va-option-list
        :options="complexData.options"
        v-model="complexData.selectedValue"
      />
      Selected {{ complexData.selectedValue }}
    </VbCard>

    <VbCard
      title="Return whole object"
    >
      <va-option-list
        :options="complexData.options"
        v-model="complexData.selectedObject"
        output-object
      />
      Selected <pre> {{ complexData.selectedObject }} </pre>
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
        </template>
      </va-option-list>
    </VbCard>
    <VbCard
      title="Radio button"
    >
      <va-option-list
        type="radio"
        :options="checkboxData.options"
        v-model="checkboxData.selectedObject"
      />
      Selected {{ checkboxData.selectedObject }}
    </VbCard>
  </VbDemo>
</template>

<script>
import VaOptionList from './VaOptionList'

export default {
  components: { VaOptionList },
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
        selectedWithVmodel: undefined,
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
