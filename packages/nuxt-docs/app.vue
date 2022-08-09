<template>
  <div>
    <VaAlert>
      WOW, IT LOOKS LIKE A REAL NUXT APP WITH AUTO-IMPORTS!
    </VaAlert>
    <VaChip>
      But you don't know how much configs here are fake :P
    </VaChip>
    <h1 class="display-1">CSS Works!</h1>
    <p>Primary color is: {{ getColor('primary') }}</p>
    
    <PageConfig :page-config="pageConfig" />
  </div>
</template>

<script setup>
import pageConfig from './page-config/button'
const { getColor } = useColors()
</script>