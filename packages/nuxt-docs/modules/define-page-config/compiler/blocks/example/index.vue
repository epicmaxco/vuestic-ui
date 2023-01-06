<script setup lang="ts">
import { PropType } from 'vue';
import { PageConfigExample } from '.';
import { CodeView } from "../../shared/code";

const props = defineProps({
  config: {
    type: Object as PropType<ReturnType<PageConfigExample>>,
    required: true
  }
})

const source = await props.config.source

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
        <component :is="config.component" />
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
