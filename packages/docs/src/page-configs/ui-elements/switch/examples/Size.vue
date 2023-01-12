<template>
  <va-switch v-model="value" label="small" size="small" class="mr-6" />
  <va-switch v-model="value" label="default" class="mr-6" />
  <va-switch v-model="value" label="large" size="large" class="mr-6" />
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
