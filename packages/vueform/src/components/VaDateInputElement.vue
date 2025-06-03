<template>
  <ElementLayout>
    <template #element>
      <VaDateInput v-bind="props" :model-value="value" @update:model-value="handleInput" v-on="listeners" ref="input" type="day" :error="isError">
        <template v-for="slotKey in vuesticSlotKeys" #[slotKey]="slotProps">
          <slot :name="slotKey" v-bind="slotProps" />
        </template>

        <template v-for="(component, slot) in schemaSlots" #[slot]="slotProps">
          <slot :name="slot" :el$="el$" v-bind="slotProps">
            <component :is="component" :el$="el$" />
          </slot>
        </template>
      </VaDateInput>
    </template>
  </ElementLayout>
</template>
<script>

import { VaDateInput } from 'vuestic-ui';
import { extractComponentProps } from '../../../ui/src/utils/component-options'
import { omit } from '../../../ui/src/utils/omit';
import { defineVuesticElement } from '../defineVuesticElement';
import { pick } from '../../../ui/src/utils/pick';

const propsToOmit = ['rules', 'isOpen']

const props = {
  ...omit(extractComponentProps(VaDateInput), propsToOmit),
}

export default defineVuesticElement({ name: 'VaDateInputElement', components: [VaDateInput], emits: VaDateInput.emits, props, propsToOmit })
</script>

<style>
label.vf-label {
  display: none;
}
</style>
