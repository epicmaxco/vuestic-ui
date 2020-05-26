<template>
  <div>
    <va-hover disabled>
      <div style="background-color: #babfc2;">
        {{ value }}
      </div>
    </va-hover>
    <input type="checkbox" v-model="value" />
  </div>
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
