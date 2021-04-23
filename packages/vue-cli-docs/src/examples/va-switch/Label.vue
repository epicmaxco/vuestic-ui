<template>
  <div>
    <va-switch v-model="value" label="left" left-label class="mr-4" />
    <va-switch v-model="value" label="right" class="mr-4" />
    <va-switch v-model="value" class="mr-4">
      right labeled by slot
    </va-switch>
    <va-switch v-model="value" left-label class="mr-4">
      left labeled by slot
    </va-switch>
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
