<template>
    <va-option-list
      type="radio"
      :options="['Option 1', 'Option 2', 'Option 3']"
      v-model="listValue"
    />
</template>

<script>
export default {
  data () {
    return {
      listValue: '',
    }
  },
}
</script>
