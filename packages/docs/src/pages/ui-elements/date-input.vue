<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import dateInputConfig from '../../page-configs/ui-elements/date-input/page-config'

@Options({
  name: 'DocsDateInput',
  components: {
    DocsContent,
  },
})
export default class DateInput extends Vue {
  get configComputed () {
    return dateInputConfig
  }
}
</script>
