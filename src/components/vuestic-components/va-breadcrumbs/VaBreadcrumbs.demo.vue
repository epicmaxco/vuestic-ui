<template>
  <VbDemo>
    <VbCard title="Align">
      <div style="width: 500px;">
      Left:
        <va-breadcrumbs align="left"></va-breadcrumbs>
        <br /><br />
        Center:
        <va-breadcrumbs align="center"></va-breadcrumbs>
        <br /><br />
        Right:
        <va-breadcrumbs align="right"></va-breadcrumbs>
        <br /><br />
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaBreadcrumbs from './VaBreadcrumbs'

export default {
  components: {
    VaBreadcrumbs,
  },
  data () {
    return {
    }
  },
}
</script>
