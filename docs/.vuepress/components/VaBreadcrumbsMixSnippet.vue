<template>
  <div class="example">
    <va-breadcrumbs>
      <va-breadcrumbs-item label="Components" to="../" />
      <va-breadcrumbs-item label="VaBreadcrumbs" to="./VaBreadcrumbs.html" />
      <va-breadcrumbs-item label="#mix" />
    </va-breadcrumbs>
  </div>
</template>

<script>
  import VaBreadcrumbs from '../../../src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbs'
  import VaBreadcrumbsItem from '../../../src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbsItem'

  export default {
    components: { VaBreadcrumbs, VaBreadcrumbsItem },
  }
</script>
