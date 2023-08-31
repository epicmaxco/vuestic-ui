<template>
  <div style="font-weight: bold; background: white;">
    <ChildWithSlots :inheritSlots="['yellow', 'blue']" header="Header must be required prop">
    </ChildWithSlots>
  </div>
</template>

<script setup lang="ts">
import { WithSlotInheritance } from '../index'
import Child from './Child.vue'

const ChildWithSlots = WithSlotInheritance(Child)
</script>
