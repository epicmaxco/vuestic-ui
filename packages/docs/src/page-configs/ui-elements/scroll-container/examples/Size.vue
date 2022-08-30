<template>
  <va-scroll-container vertical size="default" style="max-height: 300px;">
    <va-list>
      <va-list-item v-for="i in 30" :key="i">
        {{ i }}
      </va-list-item>
    </va-list>
  </va-scroll-container>
</template>
