<template>
  <div class="demo-container">
    <div class="demo-container__item">
      <va-radio
        v-for="(option, index) in options"
        :key="index"
        v-model="selectedOptionString"
        :option="option"
      />
    </div>
    <div class="demo-container__item">
      <va-radio
        v-for="(option, index) in options"
        :key="index"
        v-model="selectedOptionString"
        :option="option"
        :label="`((${option}))`"
      />
    </div>
    <div class="demo-container__item">
      <va-radio
        v-for="(option, index) in options"
        :key="index"
        v-model="selectedOptionString"
        :option="option"
        disabled
      />
    </div>
    <div class="demo-container__item">
      {{ selectedOptionString }}
    </div>

    <div class="demo-container__item">
      <va-radio
        v-for="option in objectOptions"
        :key="option.key"
        v-model="selectedOptionObject"
        :option="option"
        :label="option.name"
      />
      {{selectedOptionObject}}
    </div>
  </div>
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
