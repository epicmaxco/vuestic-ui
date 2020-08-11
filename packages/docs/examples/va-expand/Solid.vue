<template>
  <va-expand
    v-model="value"
    style="width: 400px;"
    header="Expand header"
    solid
  >
    <div>Expand content</div>
  </va-expand>
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
