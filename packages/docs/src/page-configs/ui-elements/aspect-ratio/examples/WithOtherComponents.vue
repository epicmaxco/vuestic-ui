<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
    <va-image class="col-span-1" :ratio="16/9" src="https://picsum.photos/1500" />

    <va-aspect-ratio class="col-span-1" :ratio="4/3">
      <va-card class="w-full">
        <va-card-title>4/3</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</va-card-content>
      </va-card>
    </va-aspect-ratio>
  </div>
</template>
