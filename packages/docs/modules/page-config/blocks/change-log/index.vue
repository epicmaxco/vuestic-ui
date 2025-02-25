<script setup lang="ts">
import { MarkdownView } from "../shared/markdown";
import { Anchor } from "../shared/anchor";
import { ChangeLog } from "./types";
import { PropType, computed } from "vue";

const props = defineProps({
  changeLog: { type: Object as PropType<ChangeLog>, required: true },
});

const versions = computed(() => Object.keys(props.changeLog));
</script>

<template>
  <div
    v-for="version in versions"
    :key="version"
    class="page-config-change-log__block"
  >
    <VaCollapse>
      <template #header-content>
        <div class="flex items-center">
          <VaIcon
            name="rocket_launch"
            class="mr-1"
            size="18px"
            color="secondary"
          />
          <h1 class="va-h6 va-link">
            <template v-if="version.includes('next')">
              next
            </template>
            <template v-else>
              <a :href="`https://github.com/epicmaxco/vuestic-ui/releases/tag/v${version}`">
              v{{ version }}
              </a>
            </template>
            <Anchor :text="version" />
          </h1>
        </div>
      </template>

      <ul
        v-for="componentChanges, componentName in changeLog[version]"
        :key="componentName"
        class="va-unordered mb-8"
        style="--va-li-background: var(--va-background-border)"
      >
        <h2
          class="va-h6 mb-2"
          style="font-weight: 600;"
        >
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
      <VaButton
        :href="`https://github.com/epicmaxco/vuestic-ui/releases/tag/v${version}`"
        preset="plain"
      >
        View full release change log
      </VaButton>
    </VaCollapse>
  </div>
</template>

<style lang="scss">
.page-config-change-log {
  margin-top: 2rem;
  margin-bottom: 1rem;

  &__block {
    padding: 1rem 0;
  }

  &__version {
    margin-bottom: 1rem;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
}
</style>
