<template>
  <div>
    <va-hover disabled v-model="value">
      <div class="background--secondary">
        {{ value }}
      </div>
    </va-hover>
    <va-checkbox v-model="value" />
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
