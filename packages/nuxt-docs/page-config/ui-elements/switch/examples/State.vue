<template>
  <va-switch v-model="value" :disabled="isState" class="mr-6" />
  <va-switch v-model="value" :readonly="isState" class="mr-6" />
  <va-checkbox class="mt-2" v-model="isState" label="States enabled" />
</template>

<script>
export default {
  data () {
    return {
      value: true,
      isState: true,
    }
  },
}
</script>
