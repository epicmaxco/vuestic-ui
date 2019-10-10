<template>
  <VbDemo>
    <VbCard title="Align">
      <div style="width: 500px;">
        Left:
        <va-breadcrumbs align="left">
          <va-breadcrumb-item v-for="(item, index) in items" :key="item" :to="to" :disabled="index === items.length - 1" :label="item" />
        </va-breadcrumbs>
        <br />
        Center:
        <va-breadcrumbs align="center">
          <va-breadcrumb-item v-for="(item, index) in items" :key="item" :to="to" :disabled="index === items.length - 1" :label="item" />
        </va-breadcrumbs>
        <br />
        Right:
        <va-breadcrumbs align="right">
          <va-breadcrumb-item v-for="(item, index) in items" :key="item" :to="to" :disabled="index === items.length - 1" :label="item" />
        </va-breadcrumbs>
        <br />
        Between:
        <va-breadcrumbs align="between">
          <va-breadcrumb-item v-for="(item, index) in items" :key="item" :to="to" :disabled="index === items.length - 1" :label="item" />
        </va-breadcrumbs>
        <br />
        Around:
        <va-breadcrumbs align="around">
          <va-breadcrumb-item v-for="(item, index) in items" :key="item" :to="to" :disabled="index === items.length - 1" :label="item" />
        </va-breadcrumbs>
        <br />
      </div>
    </VbCard>

    <VbCard title="Color">
      Color warning:
      <va-breadcrumbs color="warning">
        <va-breadcrumb-item v-for="(item, index) in items" :key="item" :to="to" :disabled="index === items.length - 1" :label="item" />
      </va-breadcrumbs>
      <br />
      Separator color danger:
      <va-breadcrumbs separator-color="danger">
        <va-breadcrumb-item v-for="(item, index) in items" :key="item" :to="to" :disabled="index === items.length - 1" :label="item" />
      </va-breadcrumbs>
      <br />
      Active color danger:
      <va-breadcrumbs active-color="danger">
        <va-breadcrumb-item v-for="(item, index) in items" :key="item" :to="to" :disabled="index === items.length - 1" :label="item" />
      </va-breadcrumbs>
      <br />
    </VbCard>

    <VbCard title="Separator">
      Custom separator:
      <va-breadcrumbs separator=">">
        <va-breadcrumb-item v-for="(item, index) in items" :key="item" :to="to" :disabled="index === items.length - 1" :label="item" />
      </va-breadcrumbs>
      <br />
      Slotted separator:
      <va-breadcrumbs>
        <template v-slot:separator>👌</template>
        <va-breadcrumb-item v-for="(item, index) in items" :key="item" :to="to" :disabled="index === items.length - 1" :label="item" />
      </va-breadcrumbs>
      <br />
    </VbCard>

    <VbCard title="Disabled">
      All items disabled:
      <va-breadcrumbs>
        <va-breadcrumb-item v-for="item in items" :key="item" :to="to" disabled :label="item" />
      </va-breadcrumbs>
      <br />
    </VbCard>
    <VbCard title="Custom items">
      <va-breadcrumbs>
        <va-breadcrumb-item :to="to"><div style="border: 1px solid green">One</div></va-breadcrumb-item>
        <va-breadcrumb-item :to="to"><img src="https://randomuser.me/api/portraits/men/5.jpg" alt="image"></va-breadcrumb-item>
        <va-breadcrumb-item>Tree</va-breadcrumb-item>
      </va-breadcrumbs>
    </VbCard>

    <VbCard title="Multiple labels">
      <va-breadcrumbs>
        <va-breadcrumb-item :to="to" label="One" />
        <va-breadcrumb-item :to="to" label="Two" />
        <va-breadcrumb-item :to="to" label="Tree" />
        <va-breadcrumb-item :to="to" label="Need" />
        <va-breadcrumb-item :to="to" label="More" />
        <va-breadcrumb-item label="Components" />
      </va-breadcrumbs>
      <br />
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
  data () {
    return {
      items: ['One', 'Two', 'Tree'],
      to: './',
    }
  },
}
</script>
