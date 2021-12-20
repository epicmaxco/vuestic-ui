<template>
  <div style="width: 300px;">
    <va-input
      class="mb-4"
      v-model="valueDefault"
      type="textarea"
      placeholder="Basic textarea"
    />
    <va-input
      class="mb-4"
      v-model="valueLabel"
      type="textarea"
      label="With label"
    />
    <va-input
      class="mb-4"
      v-model="valueAutosize"
      type="textarea"
      label="With autosize"
      autosize
    />
    <va-input
      class="mb-4"
      v-model="valueLimits"
      type="textarea"
      label="With limits from 2 to 5 rows"
      :min-rows="2"
      :max-rows="5"
    />
  </div>
</template>

<script>
export default {
  name: 'Textarea',
  data () {
    return {
      valueDefault: '',
      valueLabel: '',
      valueAutosize: '',
      valueLimits: '',
    }
  },
}
</script>
