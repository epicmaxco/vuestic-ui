<template>
  <va-tabs
    v-if="!isString"
    v-model="index"
    class="DocsCode__tabs"
  >
    <template #tabs>
      <va-tab
        v-for="tab in tabs"
        :key="tab"
      >
        {{ tab }}
      </va-tab>
    </template>
  </va-tabs>
  <prism-wrapper
    :code="escapeVuesticImport(contents[index])"
    :lang="$props.language"
    class="DocsCode"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch, nextTick } from "vue";
import PrismWrapper from "./PrismWrapper.vue";
import { useCode } from "./useCode";

export default defineComponent({
  name: "DocsCode",
  components: { PrismWrapper },
  props: {
    language: { type: String as PropType<string>, default: "javascript" },
    code: {
      type: [Object, String] as PropType<Record<string, string> | string>,
      default: "",
    },
  },
  setup(props) {
    const { applyTranslations } = useCode();
    const isString = computed(() => typeof props.code === "string");

    const tabs = computed(() =>
      isString.value ? [] : Object.keys(props.code)
    );

    const contents = computed(() =>
      isString.value
        ? [applyTranslations((props.code as string).trim())]
        : tabs.value.map((tab) =>
            applyTranslations(
              (props.code as Record<string, string>)[tab].trim()
            )
          )
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
      getTextColor(colors.backgroundSecondary, "#990055", "#FF006E")
    );
    const codeGreen = computed(() =>
      getTextColor(colors.backgroundSecondary, "#3A5700", "#7EBD00")
    );
    const codeYellow = computed(() =>
      getTextColor(colors.backgroundSecondary, "#896334", "#C79E6B")
    );
    const codeCyan = computed(() =>
      getTextColor(colors.backgroundSecondary, "#005980", "#00AFFA")
    );
    const codeOrange = computed(() =>
      getTextColor(colors.backgroundSecondary, "#9B3303", "#FC834A")
    );
    const codeGray = computed(() =>
      getTextColor(colors.backgroundSecondary, "#596273", "#A0A6B6")
    );
    const codeGrayMuted = computed(() =>
      getTextColor(colors.backgroundSecondary, "#6B6B6B", "#A6A6A6")
    );

    const tabsColor = computed(() => currentPresetName.value === 'dark' ? colors.backgroundSecondary : colors.backgroundBorder)

    return {
      codeRed,
      codeGreen,
      codeYellow,
      codeCyan,
      codeOrange,
      codeGray,
      codeGrayMuted,
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
$prism-background: var(--va-background-element);
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

/* PrismJS 1.20.0
  https://prismjs.com/download.html#themes=prism&languages=css */

/**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */
// @TODO After removing vue-prism-component need to update markup
// This pre is a bit weird here and exists because of how vue-prism-component applies class
// The structure is temporarily saved.
// Notably it has structure like this: pre.DocsCode > code.DocsCode.
// Here class is being applied twice, while it should have been applied only on external container
.DocsCode {
  margin-bottom: 0.2rem !important;
  background: var(--va-background-element);
  font-size: 0.8rem !important;
  border-radius: $radius;

  code[class*="language-"],
  pre[class*="language-"] {
    color: currentColor;
    background: none;
    font-family: Source Code Pro, Consolas, Monaco, "Andale Mono",
      "Ubuntu Mono", monospace;
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

  .token {
    font-family: Source Code Pro, Consolas, Monaco, "Andale Mono",
      "Ubuntu Mono", monospace;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: $prism-background;
  }

  /* Inline code */
  :not(pre) > code[class*="language-"] {
    padding: 0.1rem;
    border-radius: 0.3rem;
    white-space: normal;
  }

  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: v-bind(codeGray);
  }

  .token.punctuation {
    color: v-bind(codeGrayMuted);
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.function,
  .token.class-name,
  .token.deleted {
    color: v-bind(codeRed);
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: v-bind(codeGreen);
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: v-bind(codeYellow);
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: v-bind(codeCyan);
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: v-bind(codeOrange);
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }
}
</style>
