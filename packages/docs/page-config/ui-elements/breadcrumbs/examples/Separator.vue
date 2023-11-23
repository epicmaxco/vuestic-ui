<template>
  <VaBreadcrumbs
    separator=">"
    class="mb-6"
  >
    <VaBreadcrumbsItem label="One" />
    <VaBreadcrumbsItem label="Two" />
    <VaBreadcrumbsItem label="Three" />
  </VaBreadcrumbs>

  <VaBreadcrumbs
    separator-color="danger"
    class="mb-6"
  >
    <VaBreadcrumbsItem label="One" />
    <VaBreadcrumbsItem label="Two" />
    <VaBreadcrumbsItem label="Three" />
  </VaBreadcrumbs>

  <VaBreadcrumbs class="mb-6">
    <template #separator>
      <VaIcon class="fa fa-star fa-lg" />
    </template>
    <VaBreadcrumbsItem label="One" />
    <VaBreadcrumbsItem label="Two" />
    <VaBreadcrumbsItem label="Three" />
  </VaBreadcrumbs>
</template>
