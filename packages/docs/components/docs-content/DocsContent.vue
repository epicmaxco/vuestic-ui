<template>
<va-content>
  <dynamic-template v-for="(block, index) in config" :key="index" :block="block"></dynamic-template>
</va-content>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import DynamicTemplate from '../dynamic-template/DynamicTemplate'
import VaContent from '../../../ui/src/components/vuestic-components/va-content/VaContent'
import { Block } from '../../types/configTypes'

@Component({
  components: {
    DynamicTemplate,
    VaContent,
  },
})
export default class DocsContent extends Vue {
  @Prop() readonly config: Block[]
}
</script>
