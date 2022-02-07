<template>
  <div style="width: 300px;">
    <va-input
      class="mb-4"
      v-model="value"
      type="textarea"
      placeholder="Basic textarea"
    />
    <va-input
      class="mb-4"
      v-model="value"
      type="textarea"
      label="With label"
    />
    <va-input
      class="mb-4"
      v-model="value"
      type="textarea"
      label="With autosize"
      autosize
    />
    <va-input
      class="mb-4"
      v-model="value"
      type="textarea"
      label="With limits from 3 to 5 rows"
      :min-rows="3"
      :max-rows="5"
    />
  </div>
</template>

<script>
export default {
  name: 'Textarea',
  data () {
    return {
      value: '',
    }
  },
}
</script>
