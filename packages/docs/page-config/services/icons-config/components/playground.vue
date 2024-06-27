<template>
  <div>
    <div class="demo-header mb-2">
      <div class="col px-0">
        <VaSelect
          v-model="exampleValue"
          :rounded="false"
          :options="exampleOptions"
          text-by="label"
          value-by="value"
        />
      </div>

      <div
        class="pr-0 w-full"
      >
        <div class="va-code-snippet py-2">
          <span class="tag">va-icon name="<CodeInput
            v-model="iconName"
            class="code-input"
          />"
            /</span>
        </div>
      </div>
    </div>

    <div class="va-code-snippet">
      const fonts = [{
      <div class="ml-6">
        <div>
          name: '<CodeInput
            v-model="configName"
            class="code-input"
          />',
        </div>
        {{ resolveFnName }}: (<span class="params">{{ args }}</span>) => ({
        <div
          v-for="key in Object.keys(resolve)"
          :key="key"
          class="ml-6 mb-1"
        >
          {{ key }}: <CodeInput v-model="(resolve as any)[key]" />,
        </div>
        })
      </div>
      }]
      <VaButton
        class="copy-button"
        preset="secondary"
        icon="content_copy"
        @click="copy"
      />
    </div>

    <div class="demo-footer mt-2">
      <div class="flex items-center">
        <div
          class="va-code-snippet va-code-snippet--icon mr-2 w-[64px]"
          v-html="renderHTML(iconName)"
        />
        <div
          class="va-code-snippet w-full"
        >
          {{ renderHTML(iconName) }}
        </div>
      </div>
    </div>

    <MarkdownView
      v-if="description"
      class="mt-2"
      :value="description"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import CodeInput from "./CodeInput.vue";
import { getArgs, parseConfig } from "./playground-utils";
import { useCopyToClipboard } from "./use-copy-to-clipboard";
import { useExampleSelect } from "./use-example-select";

const resolve = reactive({
  class: "",
  content: "",
  attrs: "",
  tag: "",
});
const configName = ref("");
const iconName = ref("fa-book");
const isRegex = computed(
  () => configName.value.startsWith("/") && configName.value.endsWith("/")
);
const resolveFnName = computed(() =>
  isRegex.value ? "resolveFromRegex" : "resolve"
);
const description = ref<string | undefined>("");
const args = computed(() => {
  return getArgs(iconName.value, configName.value);
});

const { exampleOptions, exampleValue } = useExampleSelect((example) => {
  (Object.keys(resolve) as (keyof typeof resolve)[]).forEach((key) => {
    resolve[key] = example.resolve[key] || "";
  });
  configName.value = example.name;
  iconName.value = example.exampleName;
  description.value = example.description;
});

const renderHTML = (iconName: string) => {
  const {
    tag = "i",
    class: className = "",
    attrs = {},
    content = "",
  } = parseConfig(iconName, configName.value, resolve);

  const attributes = [
    className ? `class="${className}"` : undefined,
    ...Object.entries(attrs).map(([key, value]) => `${key}="${value}"`),
  ]
    .filter(Boolean)
    .join(" ");

  return `<${tag} ${attributes}>${content}</${tag}>`;
};

const renderResolve = (tab = 4) => {
  return Object.entries(resolve)
    .filter(([key, value]) => Boolean(value))
    .map(([key, value]) => `${" ".repeat(tab)}${key}: ${value},`)
    .join("\n");
};

const renderConfig = () => {
  return `const fonts = [{
  name: '${configName.value}',
  resolve: ({ ${args.value} }) => ({
${renderResolve()}
  }),
}]`;
};

const copyToClipboard = useCopyToClipboard();

const copy = () => {
  copyToClipboard(renderConfig());
};
</script>

<style lang="scss" scoped>
.params {
  color: var(--va-primary);
}

.tag {
  &::before {
    content: "<";
  }

  &::after {
    content: ">";
  }
}

.va-code-snippet {
  color: currentColor;
  background: var(--va-background-element);
  position: relative;

  .copy-button {
    position: absolute;
    right: 8px;
    top: 8px;
  }
}

.demo-header {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  & > * {
    padding: 0.5rem;
  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: stretch;

    & > * {
      width: 100%;
    }
  }

  .va-code-snippet {
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--va-input-min-height);
    padding-top: 0;
    padding-bottom: 0;
  }
}

.demo-footer {
  .va-code-snippet {
    height: 48px;
    display: flex;
    align-items: center;

    &--icon {
      width: 48px;
      justify-content: center;
      padding: 0;
    }
  }
}
</style>
