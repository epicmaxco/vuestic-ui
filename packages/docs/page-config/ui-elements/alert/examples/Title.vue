<template>
  <VaAlert
    color="info"
    title="Hello World!"
    class="mb-6"
  >
    Who-hoooo! You successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.
  </VaAlert>
  <VaAlert
    color="#265c83"
    class="mb-6"
  >
    <template #title>
      <h4>You can use slotted title</h4>
    </template>
    <VaDivider />
    You can add a divider, close button, links, icons, change the color and you can do whatever you need with Vuestic UI!
  </VaAlert>
</template>
