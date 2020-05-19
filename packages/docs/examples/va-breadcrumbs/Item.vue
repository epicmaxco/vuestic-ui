<template>
  <va-breadcrumbs>
    <va-breadcrumbs-item label="One"></va-breadcrumbs-item>
    <va-breadcrumbs-item label="Two" to="/disabled-link" disabled></va-breadcrumbs-item>
    <va-breadcrumbs-item label="Three" to="#examples"></va-breadcrumbs-item>
    <va-breadcrumbs-item label="Four"></va-breadcrumbs-item>
    <va-breadcrumbs-item label="Five">
      <span style="font-style: italic; color: red;">SLOTED CONTENT</span>
    </va-breadcrumbs-item>
  </va-breadcrumbs>
</template>
<script>
export default {
}
</script>
