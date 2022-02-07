<template>
  <div>
    <va-checkbox class="mt-4" v-model="value" :label="label" />
    <va-checkbox class="mt-4" v-model="value" :label="longLabel" />
    <va-checkbox class="mt-4" v-model="value" :label="leftLabel" left-label />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: false,
      label: 'Label',
      longLabel:
          'This label is pretty long, but still perfectly fits the layout...',
      leftLabel: 'Left label',
    }
  },
}
</script>
