<template>
  <div>
    <va-input
      class="my-2"
      v-model="value"
    />
    <va-input
      class="my-2"
      v-model="value"
      placeholder="Placeholder"
    />
    <va-input
      class="my-2"
      v-model="value"
      label="Name"
      placeholder="Label"
    />
    <va-input
      class="my-2"
      v-model="value"
      label="Name long long long long long long long long long long long long"
      placeholder="Long label"
    />
    <va-input
      class="my-2"
      v-model="value"
      label="Disabled"
      placeholder="Disabled"
      disabled
    />
    <va-input
      class="my-2"
      v-model="value"
      label="Readonly"
      placeholder="Readonly"
      readonly
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',

    }
  },
}
</script>
