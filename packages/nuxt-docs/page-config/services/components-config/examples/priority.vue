<template>
  <div class="flex justify-center">
    <div class="flex flex-col lg6">
      <nuxt-img :src="priority" alt="" class="fill-width" />
    </div>
  </div>
</template>

<script setup lang="ts">
import priority from "@/assets/images/docs/props-values-priority.png";
</script>
