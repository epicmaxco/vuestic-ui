<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useColors } from 'vuestic-ui/src/main'

const { applyPreset } = useColors()

// TODO: Temp force light mode in landing
applyPreset('light')
</script>
