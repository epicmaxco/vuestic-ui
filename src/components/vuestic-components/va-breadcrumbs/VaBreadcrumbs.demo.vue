<template>
  <VbDemo>
    <VbCard title="Align">
      <div style="width: 500px;">
      Left:
        <va-breadcrumbs align="left"></va-breadcrumbs>
        <br />
        Center:
        <va-breadcrumbs align="center"></va-breadcrumbs>
        <br />
        Right:
        <va-breadcrumbs align="right"></va-breadcrumbs>
        <br />
      </div>
    </VbCard>

    <VbCard title="Color">
      Warning:
      <va-breadcrumbs color="warning"></va-breadcrumbs>
      <br />
      Separator color danger:
      <va-breadcrumbs separator-color="danger"></va-breadcrumbs>
      <br />
      Active color danger:
      <va-breadcrumbs active-color="danger"></va-breadcrumbs>
      <br />
    </VbCard>

    <VbCard title="Separator">
      Default separator:
      <va-breadcrumbs></va-breadcrumbs>
      <br />
      Custom separator:
      <va-breadcrumbs separator=">"></va-breadcrumbs>
      <br />
      Slotted separator:
      <va-breadcrumbs>
        <template v-slot:separator>😀</template>
      </va-breadcrumbs>
      <br />
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
