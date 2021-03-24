<template>
  <VbDemo>
    <VbCard title="Default">
      <va-radio
        v-for="(option, index) in options"
        :key="index"
        v-model="selectedOptionString"
        :option="option"
      />
      <div>
        Selected: {{ selectedOptionString }}
      </div>
      <br>
      <va-radio
        v-for="option in objectOptions"
        :key="option.name"
        v-model="selectedOptionObject"
        :option="option"
        :label="option.name"
      />
      <div>
        {{ selectedOptionObject }}
      </div>
    </VbCard>
    <VbCard title="Custom label">
      <va-radio
        v-for="(option, index) in options"
        :key="index"
        v-model="selectedOptionString"
        :option="option"
        :label="`((${option}))`"
      />
      <br>
      <va-radio
        v-for="(option) in options"
        :key="option"
        v-model="selectedOptionString"
        :option="option"
      >
        Slotted label: {{ option }}
      </va-radio>
    </VbCard>
    <VbCard title="Disabled">
      <va-radio
        v-for="(option, index) in options"
        :key="index"
        v-model="selectedOptionString"
        :option="option"
        disabled
      />
    </VbCard>
    <VbCard title="Left label">
      <va-radio
        v-for="(option, index) in options"
        :key="index"
        v-model="selectedOptionString"
        :option="option"
        left-label
      />
    </VbCard>
    <VbCard title="Colored">
      <va-radio
        v-model="selectedOptionString"
        :option="options[0]"
        color="warning"
        label="warning"
      />
      <va-radio
        v-model="selectedOptionString"
        :option="options[1]"
        color="danger"
        label="danger"
      />
      <va-radio
        v-model="selectedOptionString"
        :option="options[2]"
        color="info"
        label="info"
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import VaRadio from './index'

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
