<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import typographyConfig
  from '../../page-configs/styles/typography/page-config'

@Options({
  name: 'DocsStylesTypography',
  components: {
    DocsContent,
  },
})
export default class Typography extends Vue {
  get configComputed () {
    return typographyConfig
  }
}
</script>

<style lang="scss">
  .DocsTable {
    &__table {
      font-family: unset;
      font-size: unset;
    }
  }
</style>
