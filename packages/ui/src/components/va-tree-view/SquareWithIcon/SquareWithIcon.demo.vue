<template>
  <VbDemo>
    <VbCard title="Default">
      <square-with-icon icon="check" />
      <square-with-icon
        icon="check"
        color="danger"
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import SquareWithIcon from './index'

export default {
  components: { SquareWithIcon },
}
</script>
