<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../../components/DocsContent.vue'
import avatarConfig from '../../../components/page-configs/va-avatar/page-config'

@Component({
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
