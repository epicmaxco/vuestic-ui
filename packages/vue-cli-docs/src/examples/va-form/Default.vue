<template>
  <div>
    <va-form>
      <va-input
        class="mb-2 mr-2"
        label="First Name"
        v-model="inputValue1"
        :rules="[value => (value && value.length > 0) || 'Field is required']"
      />
      <va-input
        label="Last Name"
        v-model="inputValue2"
        :rules="[value => (value && value.length > 0) || 'Field is required']"
      />
    </va-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputValue1: '',
      inputValue2: '',
    }
  },
}
</script>
