<template>
  <VbDemo>
    <VbCard title="String options">
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selected"
      />
      Selected: {{ baseData.selected }}
    </VbCard>
    <VbCard title="Color">
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selected"
        color="danger"
      />
    </VbCard>
    <VbCard title="DefaultValue array">
      <va-option-list
        :options="baseData.options"
        v-model="baseData.withDefault"
      />
      Selected: {{ baseData.withDefault }}
    </VbCard>
    <VbCard title="DefaultValue not array (should by warning)">
      <va-option-list
        :options="baseData.options"
        v-model="baseData.withDefaultSingle"
      />
      Selected: {{ baseData.withDefaultSingle }}
    </VbCard>
    <VbCard title="Left label">
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selected"
        left-label
      />
    </VbCard>
    <VbCard title="Disable all">
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selected"
        disabled
      />
    </VbCard>
    <VbCard title="Readonly">
      <va-option-list
        :options="baseData.options"
        v-model="baseData.selected"
        readonly
      />
    </VbCard>

    <VbCard title="Use more complex data with value-by (value-by = 'value')">
      <va-option-list
        :options="complexData.options"
        v-model="complexData.selectedValue"
        value-by="value"
      />
      Selected: {{ complexData.selectedValue }}
    </VbCard>
    <VbCard title="valueBy (value-by = 'altValue')">
      <va-option-list
        :options="complexData.options"
        v-model="complexData.selectedObjectValueBy"
        value-by="altValue"
      />
      Selected: <pre> {{ complexData.selectedObjectValueBy }} </pre>
    </VbCard>
    <VbCard title="textBy (text-by = 'altName')">
      <va-option-list
        :options="complexData.options"
        v-model="complexData.selectedObject"
        text-by="altName"
      />
    </VbCard>
    <VbCard title="disabledBy (disabled-by = 'altDisabled')">
      <va-option-list
        :options="complexData.options"
        v-model="complexData.selectedObjectDisabledBy"
        disabled-by="altDisabled"
      />
    </VbCard>
    <VbCard title="Return whole object">
      <va-option-list
        :options="complexData.options"
        v-model="complexData.selectedObject"
      />
      Selected: <pre> {{ complexData.selectedObject }} </pre>
    </VbCard>
    <VbCard title="Complex data with defaultValue">
      <va-option-list
        :options="complexData.options"
        v-model="complexData.withDefault"
      />
      Selected: <pre> {{ complexData.withDefault }} </pre>
    </VbCard>

    <VbCard title="Using slot">
      <va-option-list
        :options="complexData.options"
      >
        <template v-slot="slotProps">
          <pre>{{ slotProps }}</pre>
        </template>
      </va-option-list>
    </VbCard>
    <VbCard title="Stateful">
      <va-option-list
        :options="baseData.options"
        stateful
      />
    </VbCard>
    <VbCard title="Stateful with default value">
      <va-option-list
        :options="baseData.options"
        :default-value="baseData.withDefault"
        stateful
      />
    </VbCard>

    <VbCard title="Array of strings">
      <va-option-list
        type="radio"
        :options="baseRadioData.options"
        v-model="baseRadioData.selected"
      />
      Selected: {{ baseRadioData.selected }}
    </VbCard>
    <VbCard title="DefaultValue">
      <va-option-list
        type="radio"
        :options="baseRadioData.options"
        v-model="baseRadioData.withDefault"
      />
      Selected: {{ baseRadioData.withDefault }}
    </VbCard>
    <VbCard title="Disabled">
      <va-option-list
        type="radio"
        disabled
        :options="baseRadioData.options"
        v-model="baseRadioData.selected"
      />
    </VbCard>
    <VbCard title="Readonly">
      <va-option-list
        type="radio"
        readonly
        :options="baseRadioData.options"
        v-model="baseRadioData.selected"
      />
    </VbCard>
    <VbCard title="Use complex data and returns object">
      <va-option-list
        type="radio"
        :options="complexRadioData.options"
        v-model="complexRadioData.selectedObject"
      />
      Selected: <pre> {{ complexRadioData.selectedObject }} </pre>
    </VbCard>
     <VbCard title="String options">
      <va-option-list
        type="switch"
        :options="baseData.options"
        v-model="baseData.selected"
      />
      Selected: {{ baseData.selected }}
    </VbCard>
    <VbCard title="Color">
      <va-option-list
        type="switch"
        :options="baseData.options"
        v-model="baseData.selected"
        color="danger"
      />
    </VbCard>
    <VbCard title="DefaultValue array">
      <va-option-list
        type="switch"
        :options="baseData.options"
        v-model="baseData.withDefault"
      />
      Selected: {{ baseData.withDefault }}
    </VbCard>
    <VbCard title="DefaultValue not array (should by warning)">
      <va-option-list
        type="switch"
        :options="baseData.options"
        v-model="baseData.withDefaultSingle"
      />
      Selected: {{ baseData.withDefaultSingle }}
    </VbCard>
    <VbCard title="Left label">
      <va-option-list
        type="switch"
        :options="baseData.options"
        v-model="baseData.selected"
        left-label
      />
    </VbCard>
    <VbCard title="Disable all">
      <va-option-list
        type="switch"
        :options="baseData.options"
        v-model="baseData.selected"
        disabled
      />
    </VbCard>
    <VbCard title="Readonly">
      <va-option-list
        type="switch"
        :options="baseData.options"
        v-model="baseData.selected"
        readonly
      />
    </VbCard>
    <VbCard title="valueBy (value-by = 'altValue')">
      <va-option-list
        type="switch"
        :options="complexData.options"
        v-model="complexData.selectedObjectValueBy"
        value-by="altValue"
      />
      Selected: <pre> {{ complexData.selectedObjectValueBy }} </pre>
    </VbCard>
    <VbCard title="Use complex data and textBy (text-by = 'altName')">
      <va-option-list
        type="switch"
        :options="complexData.options"
        v-model="complexData.selectedObject"
        text-by="altName"
      />
    </VbCard>
    <VbCard title="disabledBy (disabled-by = 'altDisabled')">
      <va-option-list
        type="switch"
        :options="complexData.options"
        v-model="complexData.selectedObjectDisabledBy"
        disabled-by="altDisabled"
      />
    </VbCard>
    <VbCard title="Return whole object">
      <va-option-list
        type="switch"
        :options="complexData.options"
        v-model="complexData.selectedObject"
      />
      Selected: <pre> {{ complexData.selectedObject }} </pre>
    </VbCard>
    <VbCard title="Complex data with default value">
      <va-option-list
        type="switch"
        :options="complexData.options"
        v-model="complexData.withDefault"
      />
      Selected: <pre> {{ complexData.withDefault }} </pre>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaOptionList from './index'

export default {
  components: { VaOptionList },
  data () {
    const planeOptions = ['test1', 'test2', 'test3']
    const complexOptions = [
      {
        text: 'test1',
        value: 'test-value1',
        disabled: false,
        altName: 'altTest1',
        altValue: 'test-value-alt1',
        altDisabled: true,
      },
      {
        text: 'test2',
        value: 'test-value2',
        disabled: false,
        altName: 'altTest2',
        altValue: 'test-value-alt2',
        altDisabled: true,
      },
      {
        text: 'test3',
        value: 'test-value3',
        disabled: true,
        altName: 'altTest3',
        altValue: 'test-value-alt3',
        altDisabled: false,
      },
    ]
    const complexRadioOptions = [
      {
        text: 'test1',
        value: 'test-1',
        disabled: false,
      },
      {
        text: 'test2',
        value: 'test-2',
        disabled: false,
      },
      {
        text: 'test3',
        value: 'test-3',
        disabled: true,
      },
    ]

    return {
      baseData: {
        options: planeOptions,
        selected: undefined,
        withDefault: [planeOptions[0], planeOptions[2]],
        withDefaultSingle: planeOptions[0],
      },
      complexData: {
        options: complexOptions,
        selectedValue: undefined,
        selectedObject: undefined,
        selectedObjectValueBy: undefined,
        selectedObjectDisabledBy: undefined,
        withDefault: [complexOptions[0], complexOptions[1]],
      },
      baseRadioData: {
        options: planeOptions,
        selected: undefined,
        withDefault: planeOptions[1],
      },
      complexRadioData: {
        options: complexRadioOptions,
        selectedValue: undefined,
        selectedObject: undefined,
        withDefault: complexRadioOptions[2],
      },
    }
  },
}
</script>
