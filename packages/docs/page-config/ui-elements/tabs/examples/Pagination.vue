<template>
  <va-tabs
    v-model="value"
    class="w-[280px]"
  >
    <template #tabs>
      <va-tab
        v-for="title in ['One', 'Two', 'Three']"
        :key="title"
        :name="title"
      >
        {{ title }}
      </va-tab>
      <va-tab
        icon="home"
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
  data() {
    return {
      value: "One",
    };
  },
};
</script>
