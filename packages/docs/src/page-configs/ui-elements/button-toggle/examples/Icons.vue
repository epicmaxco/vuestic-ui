<template>
  <va-button-toggle
    v-model="model"
    :options="optionsWithIcons"
    class="mb-4"
  />
  <va-button-toggle
    v-model="model"
    :options="optionsOnlyIcons"
  />
</template>

<script>
export default {
  data: () => ({
    model: 'two',
    optionsWithIcons: [
      { label: 'One', value: 'one', icon: 'home' },
      { label: 'Two', value: 'two', iconRight: 'home' },
      { label: 'Three', value: 'three', icon: 'home', iconRight: 'home' },
    ],
    optionsOnlyIcons: [
      { value: 'one', icon: 'home' },
      { value: 'two', iconRight: 'home' },
      { value: 'three', icon: 'home', iconRight: 'home' },
    ],
  }),
}
</script>
