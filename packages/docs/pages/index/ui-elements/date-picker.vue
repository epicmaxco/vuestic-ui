<template>
  <docs-content :config="configComputed"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DocsContent from '../../../components/DocsContent.vue'
import datePickerConfig from '../../../components/page-configs/va-date-picker/page-config'

@Component({
  components: {
    DocsContent,
  },
})
export default class DatePicker extends Vue {
  get configComputed () {
    return datePickerConfig
  }
}
</script>
