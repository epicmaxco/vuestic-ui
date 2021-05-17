<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import avatarConfig from '../../components/page-configs/ui-elements/va-avatar/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class Avatar extends Vue {
  get configComputed () {
    return avatarConfig
  }
}
</script>
