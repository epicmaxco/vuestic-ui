<template>
  <VaHover stateful>
    <template #default="{ hover }">
      <VaButton :color="hover ? colors.danger : colors.primary">
        {{ hover }}
      </VaButton>
    </template>
  </VaHover>
</template>

<script setup>
import { computed } from "vue";
import { useColors } from "vuestic-ui";

const { getColors } = useColors();
const colors = computed(getColors);
</script>
