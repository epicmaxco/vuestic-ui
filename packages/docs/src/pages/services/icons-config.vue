<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import iconsConfigConfig from '../../components/page-configs/services/icons-config/page-config'

@Options({
  name: 'DocsIconsConfig',
  components: {
    DocsContent,
  },
})
export default class IconsConfig extends Vue {
  get configComputed () {
    return iconsConfigConfig
  }
}
</script>
