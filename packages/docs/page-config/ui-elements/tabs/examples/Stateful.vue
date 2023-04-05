<template>
  <va-tabs
    stateful
    grow
  >
    <template #tabs>
      <va-tab
        v-for="title in ['One', 'Two', 'Three']"
        :key="title"
        :name="title"
      >
        {{ title }}
      </va-tab>
    </template>
  </va-tabs>
</template>
