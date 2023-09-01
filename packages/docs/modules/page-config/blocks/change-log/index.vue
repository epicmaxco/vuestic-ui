<script setup lang="ts">
import { MarkdownView } from "../shared/markdown";
import { Anchor } from "../shared/anchor";
import { ChangeLog } from "./types";
import { PropType, computed } from "vue";

const props = defineProps({
  log: { type: Object as PropType<ChangeLog>, required: true },
});

const versions = computed(() => Object.keys(props.log));
</script>

<template>
  <VaCollapse
    class="page-config-change-log"
    flat
  >
    <template #header>
      <div class="page-config-change-log__title">
        <h2 class="va-h5">
          Change log
          <Anchor text="Change log" />
        </h2>
        <VaIcon name="va-arrow-down" />
      </div>
    </template>

    <div
      v-for="version in versions"
      :key="version"
      class="page-config-change-log__block"
    >
      <h3 class="va-h6 page-config-change-log__version">
        v{{ version }}
      </h3>
      <ul class="va-unordered">
        <li
          v-for="logs in log[version]"
          :key="logs"
        >
          <MarkdownView :content="logs" />
        </li>
      </ul>
      <VaButton
        :href="`https://github.com/epicmaxco/vuestic-ui/releases/tag/v${version}`"
        preset="plain"
      >
        View full release change log
      </VaButton>
    </div>
  </VaCollapse>
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
  }
}
</style>
