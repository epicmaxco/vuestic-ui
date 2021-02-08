<template>
  <div>
    <va-input
      class="my-2"
      v-model="value"
      type="textarea"
      label="Textarea"
      placeholder="Basic textarea"
    />
    <va-input
      class="my-2"
      v-model="value"
      type="textarea"
      label="Textarea"
      placeholder="Autosize"
      autosize
    />
    <va-input
      class="my-2"
      v-model="value"
      type="textarea"
      label="Textarea"
      placeholder="Limit rows from 2 to 4"
      :min-rows="2"
      :max-rows="4"
    />
    <va-input
      class="my-2"
      v-model="value"
      type="textarea"
      label="Textarea"
      placeholder="Autosize with limits from 2 to 4"
      :min-rows="2"
      :max-rows="4"
      autosize
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
