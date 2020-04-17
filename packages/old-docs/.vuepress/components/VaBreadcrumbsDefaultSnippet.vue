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
  import VaBreadcrumbs from '../../../ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbs'
  import VaBreadcrumbsItem from '../../../ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbsItem'

  export default {
    components: { VaBreadcrumbs, VaBreadcrumbsItem },
  }
</script>
