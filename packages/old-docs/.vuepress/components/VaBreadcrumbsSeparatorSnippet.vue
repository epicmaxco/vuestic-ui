<template>
  <div class="example">
    <va-breadcrumbs separator="-">
      <va-breadcrumbs-item label="Application" />
      <va-breadcrumbs-item label="Dashboard" />
      <va-breadcrumbs-item label="Page" />
    </va-breadcrumbs>
    <br/>
    <va-breadcrumbs>
      <template #separator>
        <va-icon name="arrow_forward_ios" />
      </template>
      <va-breadcrumbs-item label="Application" />
      <va-breadcrumbs-item label="Dashboard" />
      <va-breadcrumbs-item label="Page" />
    </va-breadcrumbs>
  </div>
</template>

<script>
  import VaBreadcrumbs from '../../../ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbs'
  import VaBreadcrumbsItem from '../../../ui/src/components/vuestic-components/va-breadcrumbs/VaBreadcrumbsItem'
  import VaIcon from '../../../ui/src/components/vuestic-components/va-icon/VaIcon'

  export default {
    components: {
      VaBreadcrumbs,
      VaBreadcrumbsItem,
      VaIcon,
    },
  }
</script>
