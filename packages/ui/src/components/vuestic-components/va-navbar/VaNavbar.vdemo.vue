<template>
  <VbDemo>
    <VbCard style="width: 100%;">
      <va-navbar>
        <template #selector>
          SELECTOR
        </template>
        <template #logo>
          LOGO
        </template>
        <template #center>
          CENTER
        </template>
        <div>
          WITHOUT SLOT
        </div>
      </va-navbar>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaNavbar from './VaNavbar'

export default {
  components: {
    VaNavbar,
  },
}
</script>

<style lang="scss" scoped>
  .va-navbar {
    color:white;
  }
</style>
