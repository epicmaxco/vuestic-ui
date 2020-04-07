<template>
  <div class="example">
    <va-breadcrumbs color="purple">
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
    components: { VaBreadcrumbs, VaBreadcrumbsItem },
  }
</script>
