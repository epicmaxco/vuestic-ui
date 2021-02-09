<template>
  <va-tabs v-model="value" style="width: 30%;">
    <template #tabs>
      <va-tab
        v-for="title in ['One', 'Two', 'Three']"
        :name="title"
        :key="title"
      >
        {{ title }}
      </va-tab>
      <va-tab
        icon="fas-home"
        label="Tab with icon"
        name="icon"
      />
      <va-tab
        icon="face"
        label="Disabled tab"
        disabled
        name="disabled"
      />
    </template>
  </va-tabs>
</template>
<script>
export default {
  data () {
    return {
      value: 'One',
    }
  },
}
</script>
