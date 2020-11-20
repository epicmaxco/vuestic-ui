<template>
  <va-collapse
    v-model="value"
    style="width: 400px;"
    header="Expand header"
    icon="home"
  >
    <div>Expand content</div>
  </va-collapse>
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
