<template>
  <VaImage
    class="w-full md:w-1/2 lg:w-1/3"
    :src="getImagePath(200)"
    :srcset="`${getImagePath(201)} 400w,
                ${getImagePath(202)} 800w,
                ${getImagePath(203)} 1200w,
                ${getImagePath(204)} 1600w`"
    sizes="(max-width: 400px) 400w,
              (min-width: 400px) and (max-width: 800px) 800w,
              (min-width: 800px) and (max-width: 1200px) 1200w,
              (min-width: 1200px) 1600w"
    @loaded="consoleLog(`srcset rendered image is ${$event}`)"
  />
</template>

<script setup>
const getImagePath = (width, height = 0) => `https://picsum.photos/${width}/${height || width}`
const consoleLog = (e) => console.log(e)
</script>
