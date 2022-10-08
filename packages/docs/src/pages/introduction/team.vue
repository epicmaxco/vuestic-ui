<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import teamConfig from '../../page-configs/introduction/team/page-config'

@Options({
  name: 'DocsTeam',
  components: {
    DocsContent,
  },
})
export default class Team extends Vue {
  get configComputed () {
    return teamConfig
  }
}
</script>
