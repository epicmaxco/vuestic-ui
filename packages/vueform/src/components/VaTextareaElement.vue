<template>
  <ElementLayout>
    <template #element>
      <VaTextarea v-bind="props" :model-value="value" @update:model-value="handleInput" v-on="listeners" ref="input">
        <template v-for="slotKey in vuesticSlotKeys" #[slotKey]="slotProps">
          <slot :name="slotKey" v-bind="slotProps" />
        </template>
      </VaTextarea>
    </template>
  </ElementLayout>
</template>
<script>

import { VaTextarea } from 'vuestic-ui';
import { extractComponentProps } from '../../../ui/src/utils/component-options'
import { omit } from '../../../ui/src/utils/omit';
import { defineVuesticElement } from '../defineVuesticElement';

const propsToOmit = ['rules', 'label']

const props = {
  ...omit(extractComponentProps(VaTextarea), propsToOmit),
}

export default defineVuesticElement({ name: 'VaTextareaElement', components: [VaTextarea], emits: VaTextarea.emits, props, propsToOmit })
</script>
