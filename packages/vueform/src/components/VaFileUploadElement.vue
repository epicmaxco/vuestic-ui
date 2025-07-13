<template>
  <ElementLayout>
    <template #element>
      <VaFileUpload v-bind="props" :model-value="value" @update:model-value="handleInput" v-on="listeners" ref="input" :type="props.uploadType">
        <template v-for="slotKey in vuesticSlotKeys" #[slotKey]="slotProps">
          <slot :name="slotKey" v-bind="slotProps" />
        </template>

        <template v-for="(component, slot) in schemaSlots" #[slot]="slotProps">
          <slot :name="slot" :el$="el$" v-bind="slotProps">
            <component :is="component" :el$="el$" />
          </slot>
        </template>
      </VaFileUpload>
    </template>
  </ElementLayout>
</template>
<script>

import { VaFileUpload } from 'vuestic-ui';
import { extractComponentProps } from '../../../ui/src/utils/component-options'
import { omit } from '../../../ui/src/utils/omit';
import { defineVuesticElement } from '../defineVuesticElement';

const propsToOmit = ['rules', 'type']

const props = {
  ...omit(extractComponentProps(VaFileUpload), propsToOmit),
  uploadType: {
    type: String,
    default: 'list'
  }
}

export default defineVuesticElement({ name: 'VaFileUploadElement', components: [VaFileUpload], emits: VaFileUpload.emits, props, propsToOmit, nullValue: [] })
</script>

<style>
label.vf-label {
  display: none;
}
</style>
