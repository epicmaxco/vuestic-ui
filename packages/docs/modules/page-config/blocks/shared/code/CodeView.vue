<template>
  <div>
    <VaTabs
      v-if="!isString"
      v-model="index"
      class="DocsCode__tabs"
    >
      <template #tabs>
        <VaTab
          v-for="tab in tabs"
          :key="tab"
        >
          {{ tab }}
        </VaTab>
      </template>
    </VaTabs>
    <div class="relative">
      <CodeHighlightWrapper
        :code="escapeVuesticImport(contents[index])"
        :lang="$props.language"
        class="DocsCode va-typography-block pr-12"
      />
      <VaButton preset="secondary" size="small" class="absolute right-2 top-2" @click="copyCode" :color="copyButtonColor">
        Copy
      </VaButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch, nextTick } from "vue";
import { getWindow } from 'vuestic-ui/src/utils/ssr'

import CodeHighlightWrapper from "./CodeHighlightWrapper.vue";

export default defineComponent({
  name: "DocsCode",
  components: { CodeHighlightWrapper },
  props: {
    language: { type: String as PropType<string>, default: "javascript" },
    code: {
      type: [Object, String] as PropType<Record<string, string> | string>,
      default: "",
    },
  },
  setup(props) {
    const isString = computed(() => typeof props.code === "string");

    const tabs = computed(() =>
      isString.value ? [] : Object.keys(props.code)
    );

    const contents = computed(() =>
      isString.value
        ? [(props.code as string).trim()]
        : tabs.value.map((tab) => (props.code as Record<string, string>)[tab].trim())
    );

    const index = ref(0);

    const doShowCode = ref(true);

    const forceUpdate = () => {
      doShowCode.value = false;
      nextTick(() => {
        doShowCode.value = true;
      }); // nextTick() triggers v-if, that causes re-rendering of component.
    };

    // Hack: Remove this with alias when moving to vite.
    const escapeVuesticImport = (code: string) => {
      return code.replace(/vuestic-ui\/src\/main/g, "vuestic-ui");
    };

    watch(() => props.code, forceUpdate, { immediate: true });

    const { getTextColor, colors, currentPresetName } = useColors();

    const codeRed = computed(() =>
      getTextColor(colors.backgroundSecondary, "#c02d2e", "#FF006E")
    );
    const codeGreen = computed(() =>
      getTextColor(colors.backgroundSecondary, "#54790d", "#7EBD00")
    );
    const codeCyan = computed(() =>
      getTextColor(colors.backgroundSecondary, "#015692", "#00AFFA")
    );
    const codeOrange = computed(() =>
      getTextColor(colors.backgroundSecondary, "#b75501", "#FC834A")
    );
    const codeGray = computed(() =>
      getTextColor(colors.backgroundSecondary, "#656e77", "#A0A6B6")
    );

    const tabsColor = computed(() => currentPresetName.value === 'dark' ? colors.backgroundSecondary : colors.backgroundBorder)

    const copyButtonColor = ref<'' | 'success' | 'danger'>()
    const copyCode = async () => {
      try {
        await getWindow()?.navigator.clipboard.writeText(escapeVuesticImport(contents.value[index.value]))
        copyButtonColor.value = 'success'
      } catch (e: any) {
        if (e.message === 'NotAllowedError') {
          copyButtonColor.value = 'danger'
        }
      } finally {
        setTimeout(() => copyButtonColor.value = '', 1000)
      }
    }

    return {
      copyButtonColor,
      copyCode,
      codeRed,
      codeGreen,
      codeCyan,
      codeOrange,
      codeGray,
      tabsColor,
      isString,
      tabs,
      contents,
      index,
      escapeVuesticImport,
    };
  },
});
</script>

<style lang="scss">
$radius: 0.25rem;

.DocsCode__tabs {
  background: v-bind(tabsColor);
  border-top-left-radius: $radius;
  border-top-right-radius: $radius;

  & + .DocsCode {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}

.DocsCode {
  margin-bottom: 0.2rem !important;
  background: var(--va-background-element);
  font-size: 0.8rem !important;
  border-radius: $radius;

  code[class*="language-"],
  pre[class*="language-"] {
    color: currentColor;
    background: none;
    font-family:
      Source Code Pro,
      Consolas,
      Monaco,
      "Andale Mono",
      "Ubuntu Mono",
      monospace;
    font-size: 1rem;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
    border-radius: 0.25rem;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: var(--va-background-element);
  }

  /* Inline code */
  :not(pre) > code[class*="language-"] {
    padding: 0.1rem;
    border-radius: 0.3rem;
    white-space: normal;
  }

  /*!
   * Based on StackOverflow.com style
   *
   * @stackoverflow/stacks v0.56.0
   * https://github.com/StackExchange/Stacks
   */
  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: var(--va-text-primary);
    background: var(--va-background-element);
    font-family:
      Source Code Pro,
      Consolas,
      Monaco,
      "Andale Mono",
      "Ubuntu Mono",
      monospace;
  }

  .hljs-comment {
    color: v-bind(codeGray);
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-meta-keyword,
  .hljs-doctag,
  .hljs-section,
  .hljs-selector-class,
  .hljs-meta,
  .hljs-selector-pseudo,
  .hljs-attr {
    color: v-bind(codeCyan);
  }

  .hljs-attribute {
    color: #803378;
  }

  .hljs-name,
  .hljs-type,
  .hljs-number,
  .hljs-selector-id,
  .hljs-quote,
  .hljs-template-tag,
  .hljs-built_in,
  .hljs-title,
  .hljs-literal {
    color: v-bind(codeOrange);
  }

  .hljs-string,
  .hljs-regexp,
  .hljs-symbol,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-link,
  .hljs-selector-attr,
  .hljs-meta-string {
    color: v-bind(codeGreen);
  }

  .hljs-bullet,
  .hljs-code {
    color: #535a60;
  }

  .hljs-deletion {
    color: v-bind(codeRed);
  }

  .hljs-addition {
    color: v-bind(codeGreen);
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }
}
</style>
