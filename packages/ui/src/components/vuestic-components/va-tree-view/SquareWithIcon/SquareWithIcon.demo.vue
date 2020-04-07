<template>
  <VbDemo>
    <VbCard title="Default">
      <square-with-icon icon-class="check" />
      <square-with-icon
        icon-class="check"
        color="danger"
      />
    </VbCard>
  </VbDemo>
</template>

<script>
import SquareWithIcon from './SquareWithIcon.vue'

export default {
  components: { SquareWithIcon },
}
</script>
