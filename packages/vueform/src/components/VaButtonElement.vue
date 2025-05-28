<template>
  <ElementLayout>
    <template #element>
      <VaButton :model-value="value" @update:model-value="handleInput" v-on="listeners" ref="input">
        <template v-for="slotKey in vuesticSlotKeys" >
          <slot :name="slotKey"  />
        </template>
      </VaButton>
    </template>
  </ElementLayout>
</template>
<script>

import { VaButton } from 'vuestic-ui';
import { extractComponentProps } from '../../../ui/src/utils/component-options'
import { omit } from '../../../ui/src/utils/omit';
import { defineVuesticElement } from '../defineVuesticElement';

const propsToOmit = ['rules', 'label']

const props = {
  ...omit(extractComponentProps(VaButton), propsToOmit),
   submit: { type: Boolean, default: false },
}

export default defineVuesticElement({ name: 'VaButtonElement', components: [VaButton], emits: VaButton.emits, props, propsToOmit })
</script>
