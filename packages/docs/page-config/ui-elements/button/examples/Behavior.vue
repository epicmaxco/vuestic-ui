<template>
  <div style="display: flex; align-items: center;">
    <va-button
      class="mr-6 mb-2"
      preset="secondary"
      hover-behavior="opacity"
      :hover-opacity="0.4"
    >
      Hover me
    </va-button>
    <va-button
      class="mr-6 mb-2"
      pressed-behavior="mask"
      :pressed-opacity="1"
      pressed-mask-color="warning"
    >
      Press me
    </va-button>
  </div>
</template>
