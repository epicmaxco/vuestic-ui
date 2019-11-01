<template>
  <VbDemo>
    <VbCard title="Default">
      <square-with-icon iconClass="check"/>
      <square-with-icon iconClass="check" color="danger"/>
    </VbCard>
  </VbDemo>
</template>

<script>
import SquareWithIcon from './SquareWithIcon.vue'

export default {
  components: { SquareWithIcon },
}
</script>
