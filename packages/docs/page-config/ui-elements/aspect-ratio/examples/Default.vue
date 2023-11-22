<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
    <VaAspectRatio
      class="col-span-1 p-2 border border-solid border-gray-300 rounded"
      :ratio="16/9"
    >
      <div class="flex flex-col">
        <h3>16/9</h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    </VaAspectRatio>

    <VaAspectRatio
      class="col-span-1 p-2 border border-solid border-gray-300 rounded"
      :ratio="4/3"
    >
      <div class="flex flex-col">
        <h3>4/3</h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    </VaAspectRatio>

    <VaAspectRatio
      class="col-span-1 p-2 border border-solid border-gray-300 rounded"
      :ratio="1"
    >
      <div class="flex flex-col">
        <h3>1/1</h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    </VaAspectRatio>
  </div>
</template>
