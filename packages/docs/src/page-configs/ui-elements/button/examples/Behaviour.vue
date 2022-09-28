<template>
  <div style="display: flex; align-items: center;">
    <va-button class="mr-4 mb-2" preset="secondary" hover-behaviour="opacity" :hoverOpacity="0.4">Hover me</va-button>
    <va-button class="mr-4 mb-2" pressed-behaviour="mask" :pressed-opacity="1" pressed-mask-color="warning">Press me</va-button>
  </div>
</template>
