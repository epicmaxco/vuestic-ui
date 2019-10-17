<template>
  <VbDemo>
    <VbCard title="default">
      <va-breadcrumbs>
        <va-breadcrumb-item label="One"/>
        <va-breadcrumb-item label="Two"/>
        <va-breadcrumb-item label="Three"/>
      </va-breadcrumbs>
    </VbCard>

    <VbCard title="routes">
      <va-breadcrumbs>
        <va-breadcrumb-item label="One" to="#one"/>
        <va-breadcrumb-item label="Two" to="#two"/>
        <va-breadcrumb-item label="Three" to="#three"/>
      </va-breadcrumbs>
    </VbCard>

    <VbCard title="Align" width="300px">
      Left:
      <va-breadcrumbs align="left">
        <va-breadcrumb-item label="One"/>
        <va-breadcrumb-item label="Two"/>
        <va-breadcrumb-item label="Three"/>
      </va-breadcrumbs>
      <br/>
      Center:
      <va-breadcrumbs align="center">
        <va-breadcrumb-item label="One"/>
        <va-breadcrumb-item label="Two"/>
        <va-breadcrumb-item label="Three"/>
      </va-breadcrumbs>
      <br/>
      Right:
      <va-breadcrumbs align="right">
        <va-breadcrumb-item label="One"/>
        <va-breadcrumb-item label="Two"/>
        <va-breadcrumb-item label="Three"/>
      </va-breadcrumbs>
      <br/>
      Between:
      <va-breadcrumbs align="between">
        <va-breadcrumb-item label="One"/>
        <va-breadcrumb-item label="Two"/>
        <va-breadcrumb-item label="Three"/>
      </va-breadcrumbs>
      <br/>
      Around:
      <va-breadcrumbs align="around">
        <va-breadcrumb-item label="One"/>
        <va-breadcrumb-item label="Two"/>
        <va-breadcrumb-item label="Three"/>
      </va-breadcrumbs>
    </VbCard>

    <VbCard title="Color">
      Color:
      <va-breadcrumbs color="danger">
        <va-breadcrumb-item label="One"/>
        <va-breadcrumb-item label="Two"/>
        <va-breadcrumb-item label="Three"/>
      </va-breadcrumbs>
      <br/>
      Separator color:
      <va-breadcrumbs separator-color="danger">
        <va-breadcrumb-item label="One"/>
        <va-breadcrumb-item label="Two"/>
        <va-breadcrumb-item label="Three"/>
      </va-breadcrumbs>
      <br/>
      Active color:
      <va-breadcrumbs active-color="danger">
        <va-breadcrumb-item label="One"/>
        <va-breadcrumb-item label="Two"/>
        <va-breadcrumb-item label="Three"/>
      </va-breadcrumbs>
      <br/>
    </VbCard>

    <VbCard title="Separator">
      Custom separator:
      <va-breadcrumbs separator=">">
        <va-breadcrumb-item label="One"/>
        <va-breadcrumb-item label="Two"/>
        <va-breadcrumb-item label="Three"/>
      </va-breadcrumbs>
      <br/>
      Slotted separator:
      <va-breadcrumbs>
        <template v-slot:separator>👌</template>

        <va-breadcrumb-item label="One"/>
        <va-breadcrumb-item label="Two"/>
        <va-breadcrumb-item label="Three"/>
      </va-breadcrumbs>
      <br/>
    </VbCard>

    <VbCard title="Disabled">
      <va-breadcrumbs>
        <va-breadcrumb-item disabled label="One"/>
        <va-breadcrumb-item disabled label="Two"/>
        <va-breadcrumb-item disabled label="Three"/>
      </va-breadcrumbs>
      <br/>
      With routes
      <va-breadcrumbs>
        <va-breadcrumb-item disabled label="One" to="#one"/>
        <va-breadcrumb-item label="Two" to="#two"/>
        <va-breadcrumb-item label="Three" to="#three"/>
      </va-breadcrumbs>
      <br/>
      Active color + disabled:
      <va-breadcrumbs active-color="primary">
        <va-breadcrumb-item disabled label="One"/>
        <va-breadcrumb-item label="Two"/>
        <va-breadcrumb-item label="Three"/>
      </va-breadcrumbs>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaBreadcrumbs from './VaBreadcrumbs'
import VaBreadcrumbItem from './VaBreadcrumbItem'

export default {
  components: {
    VaBreadcrumbs,
    VaBreadcrumbItem,
  },
}
</script>
