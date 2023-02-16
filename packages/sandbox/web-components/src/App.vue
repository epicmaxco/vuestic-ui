<template>
  <h1 class="va-h1">Web components kitchensink</h1>
  <p>Be aware that there are a lot of issues, because Web Components used incorrectly in Vue demo files</p>
  <p>This is only visual style representation</p>
  <p class="va-text-secondary">
    The main limitation here is that Vue can not assign array\object to Custom Element attribute. So only string/number/boolean are allowed as props
  </p>

  <div v-if="demoList">
    <div v-for="demo in demoList">
      <h1 class="va-h3">{{ demo.name }}</h1>
      <div class="demo">
        <component :is="demo.component" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DefineComponent, markRaw, ref } from 'vue'
const demos = import.meta.glob('../../../docs/src/page-configs/ui-elements/**/Default.vue')

const extractComponentNameFromFolder = (path: string) => path.match(/ui-elements\/(.*)\/examples/)?.[1] || path

Promise.all(
  Object.entries(demos).map(async ([path, component]) => ({
    name: extractComponentNameFromFolder(path),
    component: markRaw((await component()).default) as DefineComponent
  }))
).then((demo) => demoList.value = demo.filter(({ name }) => !['virtual-scroller'].includes(name)))

const demoList = ref<{
  name: string,
  component: DefineComponent
}[]>()
</script>

<style>
  .demo {
    border: 3px solid var(--va-background-element);
    padding: 1rem;
  }
</style>
