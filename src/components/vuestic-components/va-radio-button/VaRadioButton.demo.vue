<template>
  <VbDemo>
    <VbCard title="default">
      <va-radio-button
        v-for="(option, index) in options"
        :key="index"
        v-model="selectedOptionString"
        :option="option"
      />
      {{ selectedOptionString }}
    </VbCard>
    <VbCard title="label">
      <va-radio-button
        v-for="(option, index) in options"
        :key="index"
        v-model="selectedOptionString"
        :option="option"
        :label="`((${option}))`"
      />
    </VbCard>
    <VbCard title="disabled">
      <va-radio-button
        v-for="(option, index) in options"
        :key="index"
        v-model="selectedOptionString"
        :option="option"
        disabled
      />
    </VbCard>
    <VbCard title="object options">
      <va-radio-button
        v-for="option in objectOptions"
        :key="option.key"
        v-model="selectedOptionObject"
        :option="option"
        :label="option.name"
      />
      {{selectedOptionObject}}
    </VbCard>
    <VbCard title="no @input">
      <va-radio-button
        v-for="(option, index) in options"
        :key="index"
        :value="selectedOptionString"
        :option="option"
        :label="option.name"
      />
      {{selectedOptionObject}}
    </VbCard>
  </VbDemo>
</template>

<script>
import VaRadioButton from './VaRadioButton'

export default {
  components: { VaRadioButton },
  data () {
    const objectOptions = [
      { key: 1, name: 'one' },
      { key: 2, name: 'two' },
      { key: 3, name: 'three' },
    ]

    return {
      options: [
        'one',
        'two',
        'three',
      ],
      selectedOptionString: 'one',

      objectOptions,
      selectedOptionObject: objectOptions[0],
    }
  },
}
</script>
