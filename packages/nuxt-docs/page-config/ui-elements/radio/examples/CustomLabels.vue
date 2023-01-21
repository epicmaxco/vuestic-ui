<template>
  <div>
    <va-radio
      v-for="(option, index) in options"
      :key="index"
      v-model="selectedOption"
      :option="option"
      :label="labels[index]"
    />
  </div>
  <div>
    <va-radio
      v-for="(option, index) in options"
      :key="index"
      v-model="selectedOption"
      :option="option"
      :label="labels[index]"
      left-label
    />
  </div>
  <div>
    <va-radio
      v-for="(option, index) in options"
      :key="option"
      v-model="selectedOption"
      :option="option"
    >
      Slotted label: {{ labels[index] }}
    </va-radio>
  </div>
  <div>
    Selected: {{ selectedOption }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      labels: [
        'first label',
        'second label',
        'third label',
      ],
      options: [
        'one',
        'two',
        'three',
      ],
      selectedOption: 'one',
    }
  },
}
</script>
