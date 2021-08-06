<template>
  <VbDemo>
    <VbCard
      title="String options"
    >
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selected"
      />
      Selected {{ baseData.selected }}
    </VbCard>
    <VbCard
      title="Color"
    >
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selected"
        color="danger"
      />
    </VbCard>
    <VbCard
      title="value undefined + defaultValue array"
    >
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selectedWithVModel"
        :default-value="[baseData.options[0], baseData.options[2]]"
      />
      Selected {{ baseData.selectedWithVModel }}
    </VbCard>
    <VbCard
      title="value undefined + defaultValue not array"
    >
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selectedWithVModel1"
        :default-value="baseData.options[0]"
      />
      Selected {{ baseData.selectedWithVModel1 }}
    </VbCard>
    <VbCard
      title="Disable all"
    >
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selected"
        disabled
      />
      Selected {{ baseData.selectedDisabledList }}
    </VbCard>
    <VbCard
      title="Left label"
    >
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selected"
        left-label
      />
    </VbCard>
    <VbCard
      title="Readonly"
    >
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selected"
        readonly
      />
    </VbCard>
    <VbCard
      title="Use more complex data with value-by"
    >
      <va-option-list
        :options="complexData.options"
        v-model="complexData.selectedValue"
        value-by="value"
      />
      Selected {{ complexData.selectedValue }}
    </VbCard>

    <VbCard
      title="textBy"
    >
      <va-option-list
        :options="complexData.options"
        text-by="altName"
      />
    </VbCard>
    <VbCard
      title="valueBy"
    >
      <va-option-list
        :options="complexData.options"
        v-model="complexData.selectedObject"
        value-by="altValue"
      />
      Selected <pre> {{ complexData.selectedObject }} </pre>
    </VbCard>
    <VbCard
      title="disabledBy"
    >
      <va-option-list
        :options="complexData.options"
        disabled-by="altDisabled"
      />
    </VbCard>
    <VbCard
      title="Return whole object"
    >
      <va-option-list
        :options="complexData.options"
        v-model="complexData.selectedObject"
      />
      Selected <pre> {{ complexData.selectedObject }} </pre>
    </VbCard>
    <VbCard
      title="Complex data with default value and v-model"
    >
      <va-option-list
        :options="complexData.options"
        :default-value="[complexData.options[0], complexData.options[2]]"
        v-model="complexData.withDefault"
      />
      Selected <pre> {{ complexData.withDefault }} </pre>
    </VbCard>

    <VbCard
      title="Using slot"
    >
      <va-option-list
        :options="complexData.options"
      >
        <template v-slot="{ props }">
          <pre>{{ props }}</pre>
        </template>
      </va-option-list>
    </VbCard>
    <VbCard
      title="Stateful"
    >
      <va-option-list
        :options="baseData.options"
        stateful
      />
    </VbCard>
    <VbCard
      title="Stateful with default value"
    >
      <va-option-list
        :options="baseData.options"
        :default-value="[baseData.options[0]]"
        stateful
      />
    </VbCard>
    <VbCard
      title="Array of strings"
    >
      <va-option-list
        type="radio"
        :options="baseRadioData.options"
        v-model="baseRadioData.selected"
      />
      Selected {{ baseRadioData.selected }}
    </VbCard>
    <VbCard
      title="Value undefined + defaultValue"
    >
      <va-option-list
        type="radio"
        :options="baseRadioData.options"
        v-model="baseRadioData.selectedWithVModel"
        :default-value="baseRadioData.options[1]"
      />
      Selected {{ baseRadioData.selectedWithVModel }}
    </VbCard>
    <VbCard
      title="Disabled"
    >
      <va-option-list
        type="radio"
        disabled
        :options="baseRadioData.options"
        v-model="baseRadioData.selected"
      />
      Selected {{ baseRadioData.selectedDisabled }}
    </VbCard>
    <VbCard
      title="Use complex data and returns object"
    >
      <va-option-list
        type="radio"
        :options="radioData.options"
        v-model="radioData.selectedObject"
      />
      Selected {{ radioData.selectedObject }}
    </VbCard>
     <VbCard
      title="String options"
    >
      <va-option-list
        type="switch"
        :options="baseSwitchData.options"
        v-model="baseSwitchData.selected"
      />
      Selected {{ baseSwitchData.selected }}
    </VbCard>
    <VbCard
      title="Color"
    >
      <va-option-list
        type="switch"
        :options="baseSwitchData.options"
        v-model="baseSwitchData.selected"
        color="danger"
      />
    </VbCard>
    <VbCard
      title="value undefined + defaultValue array"
    >
      <va-option-list
        type="switch"
        :options="baseSwitchData.options"
        v-model="baseSwitchData.selectedWithVModel"
        :default-value="[baseSwitchData.options[0], baseSwitchData.options[2]]"
      />
      Selected {{ baseSwitchData.selectedWithVModel }}
    </VbCard>
    <VbCard
      title="value undefined + defaultValue not array"
    >
      <va-option-list
        type="switch"
        :options="baseSwitchData.options"
        v-model="baseSwitchData.selectedWithVModel1"
        :default-value="baseSwitchData.options[0]"
      />
      Selected {{ baseSwitchData.selectedWithVModel1 }}
    </VbCard>
    <VbCard
      title="Disable all"
    >
      <va-option-list
        type="switch"
        :options="baseSwitchData.options"
        v-model="baseSwitchData.selected"
        disabled
      />
      Selected {{ baseSwitchData.selectedDisabledList }}
    </VbCard>
    <VbCard
      title="Left label"
    >
      <va-option-list
        type="switch"
        :options="baseSwitchData.options"
        v-model="baseSwitchData.selected"
        left-label
      />
    </VbCard>
    <VbCard
      title="Readonly"
    >
      <va-option-list
        type="switch"
        :options="baseSwitchData.options"
        v-model="baseSwitchData.selected"
        readonly
      />
    </VbCard>
    <VbCard
      title="textBy"
    >
      <va-option-list
        type="switch"
        :options="complexData.options"
        text-by="altName"
      />
    </VbCard>
    <VbCard
      title="valueBy"
    >
      <va-option-list
        type="switch"
        :options="complexData.options"
        v-model="complexData.selectedObject"
        value-by="altValue"
      />
      Selected <pre> {{ complexData.selectedObject }} </pre>
    </VbCard>
    <VbCard
      title="disabledBy"
    >
      <va-option-list
        type="switch"
        :options="complexData.options"
        disabled-by="altDisabled"
      />
    </VbCard>
    <VbCard
      title="Return whole object"
    >
      <va-option-list
        type="switch"
        :options="complexData.options"
        v-model="complexData.selectedObject"
      />
      Selected <pre> {{ complexData.selectedObject }} </pre>
    </VbCard>
    <VbCard
      title="Complex data with default value and v-model"
    >
      <va-option-list
        type="switch"
        :options="complexData.options"
        :default-value="[complexData.options[0], complexData.options[2]]"
        v-model="complexData.withDefault"
      />
      Selected <pre> {{ complexData.withDefault }} </pre>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaOptionList from './index'

export default {
  components: { VaOptionList },
  data () {
    return {
      baseData: {
        options: ['test', 'test1', 'test2'],
        selected: undefined,
        selectedDisabledList: undefined,
        selectedWithVModel: undefined,
        selectedWithVModel1: undefined,
      },
      complexData: {
        options: [
          {
            text: 'test',
            value: 'test-value',
            disabled: false,
            altName: 'alternative test',
            altValue: 'test-value-alt',
            altDisabled: true,
          },
          {
            text: 'test',
            value: 'test-value1',
            disabled: false,
            altName: 'alternative test',
            altValue: 'test-value-alt 1',
            altDisabled: true,
          },
          {
            text: 'test',
            value: 'test-value2',
            disabled: true,
            altName: 'alternative test',
            altValue: 'test-value-alt 2',
            altDisabled: false,
          },
        ],
        selectedValue: undefined,
        selectedObject: undefined,
        withDefault: undefined,
      },
      baseRadioData: {
        options: ['test radio', 'test radio 1', 'test radio 2'],
        selected: undefined,
        selectedDisabled: undefined,
        selectedWithVModel: undefined,
      },
      radioData: {
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
        withDefault: undefined,
      },
      baseSwitchData: {
        options: ['test switch', 'test switch 1', 'test switch 2'],
        selected: undefined,
        selectedDisabled: undefined,
        selectedWithVModel: undefined,
      },
    }
  },
}
</script>
