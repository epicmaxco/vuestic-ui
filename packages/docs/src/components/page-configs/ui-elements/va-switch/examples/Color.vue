<template>
  <div>
    <va-switch v-model="value" color="success" class="mr-4" />
    <va-switch v-model="value" color="info" class="mr-4" />
    <va-switch v-model="value" color="danger" class="mr-4" />
    <va-switch v-model="value" color="warning" class="mr-4" />
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
