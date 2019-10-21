<template>
  <VbDemo>
    <VbCard title="default">
      <va-radio
        v-for="(option, index) in options"
        :key="index"
        v-model="selectedOptionString"
        :option="option"
      />
      <div>
        Selected: {{ selectedOptionString }}
      </div>
      <br/>
      <va-radio
        v-for="option in objectOptions"
        :key="option.name"
        v-model="selectedOptionObject"
        :option="option"
        :label="option.name"
      />
      <div>
        {{selectedOptionObject}}
      </div>
    </VbCard>
    <VbCard title="custom label">
      <va-radio
        v-for="(option, index) in options"
        :key="index"
        v-model="selectedOptionString"
        :option="option"
        :label="`((${option}))`"
      />
      <br/>
      <va-radio
        v-for="(option) in options"
        :key="option"
        v-model="selectedOptionString"
        :option="option"
      >
        Slotted label: {{option}}
      </va-radio>
    </VbCard>
    <VbCard title="disabled">
      <va-radio
        v-for="(option, index) in options"
        :key="index"
        v-model="selectedOptionString"
        :option="option"
        disabled
      />
    </VbCard>
    <VbCard title="object value">

    </VbCard>
  </VbDemo>
</template>

<script>
import VaRadio from './VaRadio'

export default {
  components: { VaRadio },
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
