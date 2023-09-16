<script setup lang="ts">
defineProps({
  changeLog: { type: Object, default: () => ({}) }
})
</script>

<template>
  <VaCollapse
    v-for="changes, version in $props.changeLog"
    :key="version"
    class="change-log"
  >
    <template #header-content>
      <div class="flex items-center">
        <VaIcon
          name="rocket_launch"
          class="mr-1"
          size="18px"
          color="secondary"
        />
        <h1 class="va-h6">
          <a :href="`https://github.com/epicmaxco/vuestic-ui/releases/tag/v${version}`">
            v{{ version }}
          </a>
        </h1>
      </div>
    </template>

    <ul
      v-for="componentChanges, componentName in changes"
      :key="componentName"
      class="va-unordered mb-8"
      style="--va-li-background: var(--va-background-border)"
    >
      <h2 class="va-h6 mb-2" style="font-weight: 600;">
        {{ componentName }}
      </h2>
      <li
        v-for="change in componentChanges"
        :key="change"
        class="my-1"
      >
        <!-- <div class="page-config-api-change-log__circle" /> -->
        <MarkdownView :content="change.slice(2)" />
      </li>
    </ul>
  </VaCollapse>
</template>

<style lang="scss">
  .change-log {
    a {
      color: var(--va-primary);
    }

    h1, h2, h3 {
      font-weight: 600;
    }

    p {
      margin: 0;
    }
  }
</style>
