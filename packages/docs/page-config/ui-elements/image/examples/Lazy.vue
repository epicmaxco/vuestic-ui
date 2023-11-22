<template>
  <VaImage
    class="w-full md:w-1/2 lg:w-1/3"
    src="https://picsum.photos/1500"
    lazy
    @loaded="consoleLog('lazy image was loaded only after intersection')"
  />
</template>

<script setup>
const consoleLog = (e) => console.log(e)
</script>
