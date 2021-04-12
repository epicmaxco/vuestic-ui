<template>
  <div>
    <va-option-list
      :options="options"
      v-model="listValue"
      valueBy="altValue"
      disabledBy="altDisabled"
      :textBy="option => option.altText"
    />
    Selected: <pre> {{ listValue }} </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [
        {
          altText: 'Option 1',
          value: 'test-value',
          disabled: false,
          altName: 'alternative test',
          altValue: 'Alternative value 1',
          altDisabled: false,
        },
        {
          altText: 'Option 2',
          value: 'test-value1',
          disabled: false,
          altName: 'alternative test',
          altValue: 'Alternative value 2',
          altDisabled: true,
        },
        {
          altText: 'Option 3',
          value: 'test-value2',
          disabled: true,
          altName: 'alternative test',
          altValue: 'Alternative value 3',
          altDisabled: false,
        },
      ],
      listValue: null,
    }
  },
}
</script>
