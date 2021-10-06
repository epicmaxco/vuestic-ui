<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import timeInputConfig from '../../components/page-configs/ui-elements/va-time-input/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class TimeInput extends Vue {
  get configComputed () {
    return timeInputConfig
  }
}
</script>
