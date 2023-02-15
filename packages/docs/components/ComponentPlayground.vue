<script setup lang="ts">
import { ComponentOptions, computed, PropType } from "vue";
import type { PlaygroundOption } from "@/composables/useComponentPlayground";
import { getWindow } from "vuestic-ui/src/utils/ssr";

const props = defineProps({
  options: {
    type: Array as PropType<(PlaygroundOption & { value: any })[]>,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  slots: {
    type: Array as PropType<{ name: string; value: string }[]>,
    required: true,
  },
});

const optionValues = computed(() => {
  const values = {} as Record<string, any>;
  props.options.forEach(({ key, value, defaultValue }) => {
    const isDefault = defaultValue ? defaultValue === value : !value;
    if (isDefault) {
      return null;
    }
    values[key] = value;
  });
  return values;
});

const codeEl = ref<HTMLElement>();
const copyButtonIcon = ref('content_copy')

const copyCode = async () => {
  await getWindow()?.navigator.clipboard.writeText(codeEl.value!.innerText);
  copyButtonIcon.value = 'check'
  setTimeout(() => {
    copyButtonIcon.value = 'content_copy'
  }, 1000)
};
</script>

<template>
  <div class="component-playground flex-col sm:flex-row">
    <div class="component-playground__example">
      <slot v-bind="{ bind: optionValues, slots }" />
    </div>
    <va-card
      class="component-playground__options"
      square
    >
      <va-card-content>
        <div
          v-for="option in options"
          :key="option.key"
          class="mb-2"
        >
          <va-input
            v-if="option.type === 'input'"
            v-model="option.value"
            class="w-full"
            :label="option.key"
          />
          <va-select
            v-if="option.type === 'select'"
            v-model="option.value"
            class="w-full"
            :options="option.options"
            :label="option.key"
            clearable
            prevent-overflow
          />
          <va-select
            v-if="option.type === 'multiselect'"
            v-model="option.value"
            class="w-full"
            :options="option.options"
            :label="option.key"
            clearable
            multiple
            prevent-overflow
          />
          <va-checkbox
            v-if="option.type === 'checkbox'"
            v-model="option.value"
            :label="option.key"
            :true-value="true"
            :false-value="false"
          />
        </div>
      </va-card-content>
    </va-card>
  </div>
  <div class="component-playground">
    <div
      ref="codeEl"
      class="component-playground__code"
    >
      <CodeView
        :code="code"
        language="html"
      />
    </div>
    <VaButton
      class="component-playground__copy-code-button"
      :icon="copyButtonIcon"
      preset="secondary"
      @click="copyCode"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "vuestic-ui/styles/resources";

.component-playground {
  background: var(--va-background-element);
  padding: 1rem;
  display: flex;
  position: relative;

  --va-card-box-shadow: none;

  & + & {
    padding-top: 0;
  }

  &__example {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--va-background-primary);
    width: 100%;
    padding: 1rem;
  }

  &__options {
    max-height: 350px;
    overflow-y: scroll;

    @include va-scroll(var(--va-primary));
  }

  &__code {
    width: 100%;
    border: 1px solid var(--va-background-primary);
    position: relative;
    z-index: 0;
    font-size: 0.8rem;

    &:deep(.DocsCode) {
      background: transparent;
    }

    &::after {
      pointer-events: none;
      content: "";
      background: var(--va-background-border);
      opacity: 0.05;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  }

  &__copy-code-button {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    z-index: 1;
  }
}
</style>
