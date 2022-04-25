<template>
  <div v-if="!isLoaded" class="docs-example__spinner">
    <DocsExampleSpinner />
  </div>
  <div
    v-else
    class="mb-3"
  >
    <component :is="component" />
    <template v-if="!exampleOptions.hideCode">
      <va-button
        v-if="!exampleOptions.forceShowCode"
        class="mt-2 d-block docs-example__show-code-button"
        style="background: transparent !important; box-shadow: none !important;"
        flat
        size="small"
        color="primary"
        :rounded="false"
        @click="showCode = !showCode"
      >
        {{ showCode ? t("docsExample.hideCode") : t("docsExample.showCode") }}
      </va-button>
      <va-content v-if="showCode || exampleOptions.forceShowCode">
        <DocsNavigation
          :code="text"
          :config="exampleOptions.codesandboxConfig"
          :git-url="path"
          :git-component="props.component"
        />
        <DocsCode
          language="markup"
          :code="parsed.template"
        />
        <DocsCode
          v-if="parsed.script"
          :code="parsed.script"
          language="markup"
        />
        <DocsCode
          v-if="parsed.style"
          :code="parsed.style"
          language="markup"
        />
      </va-content>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import DocsCode from "../DocsCode/DocsCode.vue";
import DocsNavigation from "./DocsNavigation.vue";
import DocsExampleSpinner from "./DocsExampleLoader.vue"

const { t } = useI18n();

const props = defineProps({
  component: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  exampleOptions: {
    type: Object,
    default: () => ({})
  }
});

const showCode = ref(false);

const parsed = reactive({
  template: "",
  style: "",
  script: ""
});

const { component, text, isLoaded } = useComponentReader(
  `${props.path}/examples`,
  props.component
);

function parseTemplate(target: string, template: string) {
  const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`;
  const regex = new RegExp(string, "g");
  const parsed = regex.exec(template) || [];

  return parsed[1] || "";
}

function parse(res: string) {
  parsed.template = parseTemplate("template", res);
  parsed.style = parseTemplate("style", res);
  parsed.script = parseTemplate("script", res);
}

watch(() => text, parse, { immediate: true });
</script>

<style lang="scss">
.docs-example {
  &__spinner {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &__show-code-button {
    .va-button {
      &__content {
        padding: 0 !important;
      }
    }
  }
}
</style>

