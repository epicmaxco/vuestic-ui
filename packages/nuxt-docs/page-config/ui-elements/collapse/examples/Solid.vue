<template>
  <va-collapse
    v-model="value"
    style="width: 400px;"
    header="Collapse header"
    solid
  >
    <div>Collapse content</div>
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
