<script setup lang="ts">
import { DefineComponent, PropType } from 'vue';
import { CodeView } from "../shared/code";

const props = defineProps({
  component: {
    type: Object as PropType<DefineComponent>,
  },
  source: {
    type: String as PropType<string>,
  },
});

const source = await props.source

function parseTemplate (target: string, template: string) {
  const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
  const regex = new RegExp(string, 'g')
  const parsed = regex.exec(template) || []
  return parsed[1] || ''
}

const template = parseTemplate('template', source)
const script = parseTemplate('script', source)
const style = parseTemplate('style', source)
</script>

<template>
  <div class="mb-3">
    <va-card outlined class="docs-example-card" color="background-primary">
      <va-card-content>
        <component :is="component" />
      </va-card-content>
    </va-card>

    <div>
      <CodeView
        v-if="template"
        language="markup"
        :code="template"
      />
      <CodeView
        v-if="script"
        :code="script"
        language="javascript"
      />
      <CodeView
        v-if="style"
        :code="style"
        language="css"
      />
    </div>
  </div>
</template>
