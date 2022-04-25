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
      />
      <va-button
        type="submit"
        outline
        :rounded="false"
      >
        {{ t("installation.codesandbox.button") }}
      </va-button>
    </form>
  </div>
</template>

<script>
import getSandboxParams from '~~/components/docs/blocks/DocsExample/DocsNavigation/CodeSandboxExample.ts'

export default defineComponent({
  name: "DocsOpenCodeSandbox",
  setup() {
    const query = "?query=file=/src/App.vue";

    return {
      ...useI18n(),
      sandboxParams: getSandboxParams(),
      sandboxDefineUrl: `https://codesandbox.io/api/v1/sandboxes/define${query}`,
    }
  },
})
</script>
