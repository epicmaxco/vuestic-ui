<template>
  <va-button-dropdown
    v-if="count"
    flat
    color="primary"
    label="Github"
    class="github-dropdown"
  >
    <div class="github-dropdown-content">
      <va-button
        flat
        :round="false"
        color="primary"
        href="https://github.com/epicmaxco/vuestic-ui/issues"
        target="_blank"
      >
        Open issues: {{count}}
      </va-button>
      <va-button
        flat
        :round="false"
        color="primary"
        href="https://github.com/epicmaxco/vuestic-ui/issues/new/choose"
        target="_blank"
      >
        Add new issue
      </va-button>
    </div>
  </va-button-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class VersionDropdown extends Vue {
  count = 0

  async mounted () {
    const settings: any = {
      per_page: 100,
    }
    const resPulls = await fetch('https://api.github.com/repos/epicmaxco/vuestic-ui/pulls', settings)
    const resRepo = await fetch('https://api.github.com/repos/epicmaxco/vuestic-ui')
    const repo = await resRepo.json()
    const pulls = await resPulls.json()
    this.count = repo.open_issues_count - pulls.length
  }
}
</script>

<style lang="scss">
  .github-dropdown .va-button__content {
    font-weight: bold;
  }

  .github-dropdown .github-dropdown-content {
    display: flex;
    flex-direction: column;
  }
</style>
