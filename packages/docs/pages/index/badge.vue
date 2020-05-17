<template>
  <docs-content :config="badgeConfig"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DocsContent from '../../components/docs-content/DocsContent.vue'

@Component({
  components: { DocsContent },
})
export default class Badge extends Vue {
  get badgeConfig () {
    return []
  }
}
</script>
