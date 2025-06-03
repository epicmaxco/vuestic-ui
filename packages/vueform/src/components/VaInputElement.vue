<template>
  <ElementLayout>
    <template #element>
      <VaInput v-bind="props" :model-value="value" @update:model-value="handleInput" :type="inputType" v-on="listeners" ref="input" :error="isError">
        <template v-for="slotKey in vuesticSlotKeys" #[slotKey]="slotProps">
          <slot :name="slotKey" v-bind="slotProps" />
        </template>

        <template v-for="(component, slot) in schemaSlots" #[slot]="slotProps">
          <slot :name="slot" :el$="el$" v-bind="slotProps">
            <component :is="component" :el$="el$" />
          </slot>
        </template>
      </VaInput>
    </template>
  </ElementLayout>
</template>

<script>
import { defineVuesticElement } from '../defineVuesticElement';
import { TextElement } from '@vueform/vueform'
import { VaInput } from 'vuestic-ui';
import { extractComponentProps } from '../../../ui/src/utils/component-options'
import { omit } from '../../../ui/src/utils/omit';
import { pick } from '../../../ui/src/utils/pick';

const propsToOmit = ['rules']

const props = {
  ...omit(extractComponentProps(VaInput), propsToOmit),
  ...pick(extractComponentProps(TextElement), ['inputType']),
}

export default defineVuesticElement({ components: [VaInput], emits: VaInput.emits, name: 'VaInputElement', props, propsToOmit })
</script>

<style>
label.vf-label {
  display: none;
}
</style>
