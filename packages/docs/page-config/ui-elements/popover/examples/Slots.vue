<template>
  <VaPopover
    placement="right"
    trigger="click"
  >
    <VaButton>Click me</VaButton>

    <template #icon>
      <VaButton
        icon="create"
        size="small"
      />
    </template>

    <template #title>
      <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</i>
    </template>

    <template #body>
      <p>Suspendisse pharetra risus magna, in luctus turpis mollis non.</p>
      <p>Donec est nulla, imperdiet id dapibus sed, consequat eget odio.</p>
    </template>
  </VaPopover>
</template>
