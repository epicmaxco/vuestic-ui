<template>
  <va-breadcrumbs separator=">" class="mb-4">
    <va-breadcrumbs-item label="One" />
    <va-breadcrumbs-item label="Two" />
    <va-breadcrumbs-item label="Three" />
  </va-breadcrumbs>

  <va-breadcrumbs separator-color="danger" class="mb-4">
    <va-breadcrumbs-item label="One" />
    <va-breadcrumbs-item label="Two" />
    <va-breadcrumbs-item label="Three" />
  </va-breadcrumbs>

  <va-breadcrumbs class="mb-4">
    <template #separator>
      <va-icon class="fa fa-star fa-lg"></va-icon>
    </template>
    <va-breadcrumbs-item label="One" />
    <va-breadcrumbs-item label="Two" />
    <va-breadcrumbs-item label="Three" />
  </va-breadcrumbs>
</template>
