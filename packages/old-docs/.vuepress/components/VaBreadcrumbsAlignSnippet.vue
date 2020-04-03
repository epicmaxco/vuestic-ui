<template>
  <div class="example">
    <va-breadcrumbs align="center">
      <va-breadcrumbs-item label="Application" />
      <va-breadcrumbs-item label="Dashboard" />
      <va-breadcrumbs-item label="Page" />
    </va-breadcrumbs>
    <br/>
    <va-breadcrumbs align="right">
      <va-breadcrumbs-item label="Application" />
      <va-breadcrumbs-item label="Dashboard" />
      <va-breadcrumbs-item label="Page" />
    </va-breadcrumbs>
    <br/>
    <va-breadcrumbs align="between">
      <va-breadcrumbs-item label="Application" />
      <va-breadcrumbs-item label="Dashboard" />
      <va-breadcrumbs-item label="Page" />
    </va-breadcrumbs>
  </div>
</template>

<script>
  import VaBreadcrumbs from '../../../ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbs'
  import VaBreadcrumbsItem from '../../../ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbsItem'

  export default {
    components: {
      VaBreadcrumbs,
      VaBreadcrumbsItem,
     },
  }
</script>
