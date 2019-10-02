<template>
  <VbDemo>
    <VbCard title="Badge Types">
      <va-badge>
        Paid
      </va-badge>
      <va-badge outline>
        Paid
      </va-badge>
    </VbCard>
    <VbCard title="Badges Colors">
      <va-badge>
        Paid
      </va-badge>
      <va-badge color="info">
        Info
      </va-badge>
      <va-badge color="danger">
        Danger
      </va-badge>
      <va-badge color="warning">
        On Hold
      </va-badge>
      <va-badge color="gray">
        Processing
      </va-badge>
      <va-badge color="dark">
        New Label
      </va-badge>
    </VbCard>
    <VbCard title="Outline Badges Colors">
      <va-badge outline>
        Paid
      </va-badge>
      <va-badge outline color="info">
        Info
      </va-badge>
      <va-badge outline color="danger">
        Danger
      </va-badge>
      <va-badge outline color="warning">
        On Hold
      </va-badge>
      <va-badge outline color="gray">
        Processing
      </va-badge>
      <va-badge outline color="dark">
        New Label
      </va-badge>
    </VbCard>
    <br />
    <VbCard title="Titled badges">
      <va-badge>
        slotted value
      </va-badge>
      <va-badge label="Title custom value">
        slotted value
      </va-badge>
    </VbCard>
    <VbCard title="Color text">
      <va-badge>
        Default text color
      </va-badge>
      <va-badge text-color="#000">
        Black hex text color
      </va-badge>
      <va-badge text-color="rgb(14, 74, 196)">
        RGB text color
      </va-badge>
      <va-badge text-color="rgba(14, 74, 196, 0.6)">
        RGBA text color (0.6 opacity)
      </va-badge>
      <va-badge outline text-color="rgba(14, 74, 196, 0.2)">
        RGBA text color (0.2 opacity) outline
      </va-badge>
    </VbCard>
    <VbCard title="Multiline">
      <va-badge>
        On line
      </va-badge>
      <va-badge>
        1 line of 3<br />
        2 line of 3<br />
        3 line of 3
      </va-badge>
      <va-badge multiline>
        1 line of 3<br />
        2 line of 3<br />
        3 line of 3
      </va-badge>
    </VbCard>
    <VbCard title="Visible-empty">
      <div>
        Empty: <va-badge />
      </div>
      <div>
        Empty with visible-empty prop: <va-badge visible-empty />
      </div>
      <div>
        Not empty: <va-badge outline>note empty</va-badge>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaBadge from './VaBadge'

export default {
  components: { VaBadge },
}
</script>
