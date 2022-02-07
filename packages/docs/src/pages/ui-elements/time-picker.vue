<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import timePickerConfig from '../../page-configs/ui-elements/time-picker/page-config'

@Options({
  components: {
    DocsContent,
  },
})
export default class TimePicker extends Vue {
  get configComputed () {
    return timePickerConfig
  }
}
</script>
