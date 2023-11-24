<template>
  <VaBreadcrumbs>
    <VaBreadcrumbsItem label="One" />
    <VaBreadcrumbsItem
      label="Two"
      to="/"
      disabled
    />
    <VaBreadcrumbsItem
      label="Three"
      to="#examples"
    />
    <VaBreadcrumbsItem label="Four" />
    <VaBreadcrumbsItem label="Five">
      <span class="italic text-[var(--va-danger)]">
        Slotted content</span>
    </VaBreadcrumbsItem>
  </VaBreadcrumbs>
</template>
