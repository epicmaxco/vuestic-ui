<template>
    <va-option-list
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
