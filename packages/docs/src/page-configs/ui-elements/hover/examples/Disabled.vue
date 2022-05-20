<template>
    <va-hover disabled v-model="value">
      <va-button :outline="value">
        {{ value }}
      </va-button>
    </va-hover>
</template>

<script>
export default {
  data () {
    return {
      value: false,
    }
  },
}
</script>
