<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import stepperConfig from '../../page-configs/ui-elements/stepper/page-config'

@Options({
  name: 'DocsStepper',
  components: {
    DocsContent,
  },
})
export default class Stepper extends Vue {
  get configComputed () {
    return stepperConfig
  }
}
</script>
