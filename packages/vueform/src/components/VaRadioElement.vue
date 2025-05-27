<template>
  <ElementLayout>
    <template #element>
      <VaRadio v-bind="props" :model-value="value" @update:model-value="handleInput" v-on="listeners" ref="input">
        <template v-for="slotKey in vuesticSlotKeys" #[slotKey]="slotProps">
          <slot :name="slotKey" v-bind="slotProps" />
        </template>
      </VaRadio>
    </template>
  </ElementLayout>
</template>
<script>

import { VaRadio } from 'vuestic-ui';
import { extractComponentProps } from '../../../ui/src/utils/component-options'
import { omit } from '../../../ui/src/utils/omit';
import { defineVuesticElement } from '../defineVuesticElement';

const propsToOmit = ['rules', 'label', 'messages']

const props = {
  ...omit(extractComponentProps(VaRadio), propsToOmit),
}

export default defineVuesticElement({ name: 'VaRadioElement', components: [VaRadio], emits: VaRadio.emits, props, propsToOmit })
</script>
