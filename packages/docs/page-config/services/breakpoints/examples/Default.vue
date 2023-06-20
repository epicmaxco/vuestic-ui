<template>
  <p>
    Current breakpoint is:
    <strong>{{ breakpoint.current }}</strong>
  </p>
</template>

<script setup lang="ts">
import { useBreakpoint } from "vuestic-ui";

const breakpoint = useBreakpoint();
</script>
