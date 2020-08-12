<template>
  <div>
    <va-tag
      v-model="value"
      closeable
    >
      closeable tag
    </va-tag>
    <va-checkbox v-model="value" label="reset value" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: true,
    }
  },
}
</script>
