<template>
  <div style="display: flex; align-items: center;">
    <va-button class="mr-4 mb-2" hover-behaviour="opacity" :hover-opacity="0.1">Hover me</va-button>
    <va-button class="mr-4 mb-2" pressed-behaviour="mask" :pressed-opacity="1" pressed-mask-color="warning">Press me</va-button>
  </div>
</template>
