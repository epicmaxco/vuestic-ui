<template>
  <VaCard class="hover:shadow-xl transition-all duration-300 cursor-pointer">
    <VaCardContent class="flex flex-col items-center text-center p-6">
      <img src="./codesandbox_logotype.svg" alt="CodeSandbox logo" class="w-24 h-16 mb-4" />

      <h3 class="text-xl font-semibold mb-2">CodeSandbox</h3>

      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Experiment right in your browser via CodeSandbox.
      </p>

      <form
        :action="sandboxDefineUrl"
        method="POST"
        target="_blank"
      >
        <input
          type="hidden"
          name="parameters"
          :value="sandboxParams"
        />
      </form>
    </VaCardContent>
  </VaCard>
</template>

<script>
import { createCodeSandbox } from "@/composables/code-sandbox";

export default {
  name: "DocsOpenCodeSandbox",
  data() {
    return {
      query: "?query=file=/src/App.vue",
    };
  },
  computed: {
    sandboxDefineUrl() {
      return `https://codesandbox.io/api/v1/sandboxes/define${this.query}`;
    },
    sandboxParams() {
      return createCodeSandbox();
    },
  },
};
</script>
