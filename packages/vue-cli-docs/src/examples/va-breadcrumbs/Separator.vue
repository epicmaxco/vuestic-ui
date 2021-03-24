<template>
  <div>
    <va-breadcrumbs separator=">">
      <va-breadcrumbs-item label="One" />
      <va-breadcrumbs-item label="Two" />
      <va-breadcrumbs-item label="Three" />
    </va-breadcrumbs>
    <va-breadcrumbs separator-color="danger">
      <va-breadcrumbs-item label="One" />
      <va-breadcrumbs-item label="Two" />
      <va-breadcrumbs-item label="Three" />
    </va-breadcrumbs>
    <va-breadcrumbs>
      <va-icon slot="separator" class="fa fa-star fa-lg"></va-icon>
      <va-breadcrumbs-item label="One" />
      <va-breadcrumbs-item label="Two" />
      <va-breadcrumbs-item label="Three" />
    </va-breadcrumbs>
  </div>
</template>
