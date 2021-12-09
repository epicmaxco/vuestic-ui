<template>
  <div style="width: 300px;">
    <va-input
      class="mb-4"
      v-model="value"
      placeholder="Default (solid)"
    />
    <va-input
      class="mb-4"
      v-model="value"
      placeholder="Outline"
      outline
    />
    <va-input
      class="mb-4"
      v-model="value"
      placeholder="Bordered"
      bordered
    />
    <va-input
      class="mb-4"
      v-model="value"
      placeholder="Default"
      label="Default"
    />
    <va-input
      class="mb-4"
      v-model="value"
      placeholder="Outline"
      label="Outline"
      outline
    />
    <va-input
      class="mb-4"
      v-model="value"
      placeholder="Bordered"
      label="Bordered"
      bordered
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
    }
  },
}
</script>
