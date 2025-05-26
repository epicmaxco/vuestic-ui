<template>
  <ElementLayout>
    <template #element>
      <VaSelect v-bind="props" :model-value="value" @update:model-value="handleInput" v-on="listeners" ref="input">
        <template v-for="slotKey in vuesticSlotKeys" #[slotKey]="slotProps">
          <slot :name="slotKey" v-bind="slotProps" />
        </template>
      </VaSelect>
    </template>
  </ElementLayout>
</template>

<script>
import { VaSelect } from 'vuestic-ui';
import { extractComponentProps } from '../../../ui/src/utils/component-options'
import { omit } from '../../../ui/src/utils/omit';
import { defineVuesticElement } from '../defineVuesticElement';

const propsToOmit = ['rules', 'label', 'isOpen', 'search']

const props = {
  ...omit(extractComponentProps(VaSelect), propsToOmit),
}

export default defineVuesticElement({ name: 'VaSelectElement', components: [VaSelect], emits: VaSelect.emits, props, propsToOmit })
</script>
