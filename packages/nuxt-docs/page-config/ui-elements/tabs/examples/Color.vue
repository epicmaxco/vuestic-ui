<template>
  <div style="width: 280px">
    <va-tabs v-model="value" color="danger">
      <template #tabs>
        <va-tab v-for="tab in ['One', 'Two', 'Three']" :key="tab" :name="tab">
          {{ tab }}
        </va-tab>
        <va-tab icon="fas-home" label="Tab with icon" name="icon" />
        <va-tab icon="face" label="Disabled tab" disabled name="disabled" />
      </template>
    </va-tabs>

    <va-tabs class="mt-2" v-model="value" color="secondary">
      <template #tabs>
        <va-tab color="success">First tab</va-tab>
        <va-tab color="warning">Second tab</va-tab>
        <va-tab color="danger">Third tab</va-tab>
        <va-tab color="#CCCCFF">Fourth tab</va-tab>
        <va-tab color="#5B2C6F">Fifth tab</va-tab>
      </template>
    </va-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
    };
  },
};
</script>
