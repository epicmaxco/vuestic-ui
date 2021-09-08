<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import guideConfig from '../../components/page-configs/contribution/guide/page-config'

@Options({
  name: 'DocsGuide',
  components: {
    DocsContent,
  },
})
export default class Guide extends Vue {
  get configComputed () {
    return guideConfig
  }
}
</script>
