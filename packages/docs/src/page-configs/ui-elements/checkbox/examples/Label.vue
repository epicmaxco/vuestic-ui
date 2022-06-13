<template>
  <va-checkbox class="mb-2" v-model="value" :label="label" />
  <va-checkbox class="mb-2" v-model="value" :label="longLabel" />
  <va-checkbox class="mb-2" v-model="value" :label="leftLabel" left-label />
</template>

<script>
export default {
  data () {
    return {
      value: true,
      label: 'Label',
      longLabel:
          'This label is pretty long, but still perfectly fits the layout...',
      leftLabel: 'Left label',
    }
  },
}
</script>
