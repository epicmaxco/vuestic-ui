<template>
  <div>
    <va-radio
      v-model="selectedOption"
      :option="options[0]"
      color="warning"
      label="warning"
    />
    <va-radio
      v-model="selectedOption"
      :option="options[1]"
      color="danger"
      label="danger"
    />
    <va-radio
      v-model="selectedOption"
      :option="options[2]"
      color="info"
      label="info"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
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
