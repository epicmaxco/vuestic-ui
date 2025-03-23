

<script setup lang="ts">
import VcIcon from './VcIcon.vue';
import VcProgress from './VcProgress.vue';


const { color = 'blue', type = 'solid' } = defineProps({
 icon: String,
 type: String,
 color: String,
 iconRight: String,
 loading: Boolean
})


const getTextColor = (color: string) => {
 switch (color) {
   case 'blue':
     return 'white'
   case 'red':
     return 'black'
   case 'green':
     return 'white'
   default:
     return 'text-gray-500'
 }
}
</script>


<template>
  <button
    class="px-4 py-2 rounded-lg flex items-center space-x-2 bg-gradient-to-r"
    :class="`from-${color}-400 to-${color}-600 text-${getTextColor(color)}`"
  >
    <VcIcon v-if="icon" :icon="icon" class="mr-2"></VcIcon>
    <slot />
    <VcIcon v-if="iconRight" :icon="iconRight" class="ml-2"></VcIcon>
    <VcProgress
    v-if="loading"
    fillColor="blue-500"
    unfillColor="gray-200"
  />
  </button>
</template>
