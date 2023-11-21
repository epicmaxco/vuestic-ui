<template>
  <VaTabs
    stateful
    grow
  >
    <template #tabs>
      <VaTab
        v-for="title in ['One', 'Two', 'Three']"
        :key="title"
        :name="title"
      >
        {{ title }}
      </VaTab>
    </template>
  </VaTabs>
</template>
