<template>
  <div class="example">
    <va-breadcrumbs>
      <va-breadcrumbs-item label="Components" to="../" />
      <va-breadcrumbs-item label="VaBreadcrumbs" to="./VaBreadcrumbs.html" />
      <va-breadcrumbs-item label="Default" />
    </va-breadcrumbs>
  </div>
</template>

<script>
  import VaBreadcrumbs from 'vuestic-ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbs'
  import VaBreadcrumbsItem from 'vuestic-ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbsItem/VaBreadcrumbsItem'

  export default {
    components: { VaBreadcrumbs, VaBreadcrumbsItem },
  }
</script>
