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
          text: 'Option 1',
          value: 'Value 1',
          disabled: false,
          altText: 'Alternative Option 1',
          altValue: 'Alternative value 1',
          altDisabled: false,
        },
        {
          text: 'Option 2',
          value: 'Value 2',
          disabled: true,
          altText: 'Alternative Option 2',
          altValue: 'Alternative value 2',
          altDisabled: false,
        },
        {
          text: 'Option 3',
          value: 'Value 3',
          disabled: false,
          altText: 'Alternative Option 3',
          altValue: 'Alternative value 3',
          altDisabled: true,
        },
      ],
      listValue: ['Alternative value 1'],
    }
  },
}
</script>
