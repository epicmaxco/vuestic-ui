<template>
  <ElementLayout>
    <template #element>
      <VaButton v-bind="props" :model-value="value" @update:model-value="handleInput" v-on="listeners" ref="input" :type="props.submits ? 'submit' : 'button'">
        <template v-for="slotKey in vuesticSlotKeys">
          <slot :name="slotKey" />
        </template>

        <template v-for="(component, slot) in schemaSlots" #[slot]="slotProps">
          <slot :name="slot" :el$="el$" v-bind="slotProps">
            <component :is="component" :el$="el$" />
          </slot>
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

const propsToOmit = ['rules', 'type']

const props = {
  ...omit(extractComponentProps(VaButton), propsToOmit),
  submits: { type: Boolean, default: false },
}

export default defineVuesticElement({ name: 'VaButtonElement', components: [VaButton], emits: VaButton.emits, props, propsToOmit })
</script>

<style>
label.vf-label {
  display: none;
}
</style>
