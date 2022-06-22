<template>
  <va-popover placement="right" trigger="click">
    <va-button>Click me</va-button>

    <template #icon>
      <va-button icon="create" size="small" />
    </template>

    <template #title>
      <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</i>
    </template>

    <template #body>
      <p>Suspendisse pharetra risus magna, in luctus turpis mollis non.</p>
      <p>Donec est nulla, imperdiet id dapibus sed, consequat eget odio.</p>
    </template>
  </va-popover>
</template>
