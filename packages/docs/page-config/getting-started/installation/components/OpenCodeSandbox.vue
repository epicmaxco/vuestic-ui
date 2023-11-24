<template>
  <div>
    <form
      :action="sandboxDefineUrl"
      method="POST"
      target="_blank"
    >
      <input
        type="hidden"
        name="parameters"
        :value="sandboxParams"
      >
      <VaButton
        type="submit"
        preset="secondary"
        border-color="primary"
      >
        Try Vuestic-UI on CodeSandbox
      </VaButton>
    </form>
  </div>
</template>

<script>
import { createCodeSandbox } from "@/composables/code-sandbox";

export default {
  name: "DocsOpenCodeSandbox",
  props: {},
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
