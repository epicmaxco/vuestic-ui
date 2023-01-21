<template>
  <va-collapse
    v-model="value"
    style="width: 400px;"
    header="Collapse header"
    icon="home"
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
