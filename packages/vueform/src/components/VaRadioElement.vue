<template>
  <ElementLayout>
    <template #element>
      <VaRadio v-bind="props" :model-value="value" @update:model-value="handleInput" v-on="listeners" ref="input" :error="isError">
        <template v-for="slotKey in vuesticSlotKeys" #[slotKey]="slotProps">
          <slot :name="slotKey" v-bind="slotProps" />
        </template>

        <template v-for="(component, slot) in schemaSlots" #[slot]="slotProps">
          <slot :name="slot" :el$="el$" v-bind="slotProps">
            <component :is="component" :el$="el$" />
          </slot>
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

const propsToOmit = ['rules', 'messages']

const props = {
  ...omit(extractComponentProps(VaRadio), propsToOmit),
}

export default defineVuesticElement({ name: 'VaRadioElement', components: [VaRadio], emits: VaRadio.emits, props, propsToOmit })
</script>

<style>
label.vf-label {
  display: none;
}
</style>
