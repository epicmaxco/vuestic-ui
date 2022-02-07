<template>
  <div style="max-width: 300px;">
    <va-select class="mb-4" label="track by" v-model="value" :options="options" track-by="id" />

    <va-select class="mb-4" label="track by (function)" v-model="value" :options="options" :track-by="(option) => option.id" />

    <va-alert color="info" class="mb-4">
      <template #title>
        Value
      </template>
      {{ value }}
    </va-alert>
  </div>
</template>

<script>
export default {
  data () {
    const options = [
      {
        text: 'First',
        value: '1',
        id: '1',
      },
      {
        text: 'Second',
        value: '2',
        id: '2',
      },
      {
        text: 'Also First but with diffrent text',
        value: '1',
        id: '3',
      },
    ]

    return {
      value: options[0],
      options,
    }
  },
}
</script>
