<template>
  <va-breadcrumbs>
    <va-breadcrumbs-item label="One"/>
    <va-breadcrumbs-item label="Two" to="/disabled-link" disabled/>
    <va-breadcrumbs-item label="Three" to="#examples"/>
    <va-breadcrumbs-item label="Four"/>
    <va-breadcrumbs-item label="Five">
      <span style="font-style: italic; color: red;">Slotted content</span>
    </va-breadcrumbs-item>
  </va-breadcrumbs>
</template>
