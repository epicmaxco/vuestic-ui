<template>
  <VbDemo>
    <VbCard style="width: 100%;" class="d-flex">
      <va-button>Button</va-button>
      <va-spacer class="example-spacer" />
      <va-button>Button</va-button>
    </VbCard>

    <VbCard style="width: 100%;">
      <va-button>Button</va-button>
      <va-spacer class="example-spacer" />
      <va-button>Button</va-button>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaSpacer } from './index'
import { VaButton } from '../va-button'

export default {
  components: {
    VaSpacer,
    VaButton,
  },
}
</script>

<style lang="scss">
.example-spacer {
  text-align: center;
  border: 2px dashed var(--va-secondary);

  &::after {
    content: "VaSpacer is here!";
  }
}
</style>
