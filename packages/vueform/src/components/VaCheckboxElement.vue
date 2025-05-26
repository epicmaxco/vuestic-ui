<template>
  <ElementLayout>
    <template #element>
      <VaCheckbox v-bind="props" :model-value="value" @update:model-value="handleInput" v-on="listeners" ref="input">
        <template v-for="slotKey in vuesticSlotKeys" #[slotKey]="slotProps">
          <slot :name="slotKey" v-bind="slotProps" />
        </template>
      </VaCheckbox>
    </template>
  </ElementLayout>
</template>
<script>

import { VaCheckbox } from 'vuestic-ui';
import { extractComponentProps } from '../../../ui/src/utils/component-options'
import { omit } from '../../../ui/src/utils/omit';
import { defineVuesticElement } from '../defineVuesticElement';

const propsToOmit = ['rules', 'label']

const props = {
  ...omit(extractComponentProps(VaCheckbox), propsToOmit),
}

export default defineVuesticElement({ name: 'VaCheckboxElement', components: [VaCheckbox], emits: VaCheckbox.emits, props, propsToOmit })
</script>
