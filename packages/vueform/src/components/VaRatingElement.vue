<template>
  <ElementLayout>
    <template #element>
      <VaRating v-bind="props" :model-value="value" @update:model-value="handleInput" v-on="listeners" ref="input">
        <template v-for="slotKey in vuesticSlotKeys" #[slotKey]="slotProps">
          <slot :name="slotKey" v-bind="slotProps" />
        </template>
      </VaRating>
    </template>
  </ElementLayout>
</template>
<script>

import { VaRating } from 'vuestic-ui';
import { extractComponentProps } from '../../../ui/src/utils/component-options'
import { omit } from '../../../ui/src/utils/omit';
import { defineVuesticElement } from '../defineVuesticElement';

const propsToOmit = ['rules', 'label']

const props = {
  ...omit(extractComponentProps(VaRating), propsToOmit),
}

export default defineVuesticElement({ name: 'VaRatingElement', components: [VaRating], emits: VaRating.emits, props, propsToOmit })
</script>
