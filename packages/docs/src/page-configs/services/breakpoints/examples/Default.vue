<template>
<p>{{ $t('breakpoints.examples.default') }} <strong>{{ breakpoints.current }}</strong></p>
</template>

<script setup lang="ts">
import { useBreakpoints } from 'vuestic-ui/src/composables'

const breakpoints = useBreakpoints()
</script>
