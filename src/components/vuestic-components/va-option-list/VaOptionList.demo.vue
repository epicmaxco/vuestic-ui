<template>
  <VbDemo>
    <VbCard
      title="Options as array of string"
    >
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selected"
      />
      Selected {{ baseData.selected }}
    </VbCard>
    <VbCard
      title="Color options"
    >
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selected"
        color="danger"
      />
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
      title="With default value (when 1 default option array is not needed) and v-model"
    >
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selectedWithVmodel1"
        :default-value="baseData.options[0]"
      />
      Selected {{ baseData.selectedWithVmodel1 }}
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
        v-model="baseData.selected"
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
      title="Array of strings with default value"
    >
      <va-option-list
        type="radio"
        :options="baseRadioData.options"
        v-model="baseRadioData.selectedWithVmodel"
        :default-value="baseRadioData.options[1]"
      />
      Selected {{ baseRadioData.selectedWithVmodel }}
    </VbCard>
    <VbCard
      title="Disabled"
    >
      <va-option-list
        type="radio"
        disabled
        :options="baseRadioData.options"
        v-model="baseRadioData.selectedDisabled"
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
        output-object
      />
      Selected {{ radioData.selectedObject }}
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
        selected: [],
        selectedDisabledList: [],
        selectedWithVmodel: [],
        selectedWithVmodel1: [],
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
        selectedValue: [],
        selectedObject: [],
        withDefault: [],
      },
      baseRadioData: {
        options: ['test radio', 'test radio 1', 'test radio 2'],
        selected: '',
        selectedDisabled: '',
        selectedWithVmodel: '',
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
        selectedValue: {},
        selectedObject: {},
        withDefault: '',
      },
    }
  },
}
</script>
