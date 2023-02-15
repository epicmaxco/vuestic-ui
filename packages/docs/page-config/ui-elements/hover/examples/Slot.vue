<template>
  <va-hover stateful>
    <template #default="{ hover }">
      <va-button :color="hover ? colors.danger : colors.primary">
        {{ hover }}
      </va-button>
    </template>
  </va-hover>
</template>

<script setup>
import { computed } from "vue";
import { useColors } from "vuestic-ui/src/main";

const { getColors } = useColors();
const colors = computed(getColors);
</script>
