<script setup lang="ts">
import { PropType } from 'vue';
import { Card } from './types';

const props = defineProps({
  cards: {
    type: [Object, Array] as PropType<Card | Card[]>,
    required: true
  }
})

const cordsArray = computed(() => {
  if (Array.isArray(props.cards)) { return props.cards }
  return [props.cards]
})

const { getTextColor, getColor } = useColors()
</script>

<template>
  <div class="page-config-cards">
    <div
      v-for="card in cordsArray"
      :key="card.title"
      class="page-config-cards__card-wrapper"
      :style="{ width: `${100 * (Number(card.cols) || 1)}%`}"
    >
      <VaCard
        :color="card.color || 'backgroundElement'"
        :shadow="false"
        class="flex flex-col"
      >
        <VaCardContent class="flex-1">
          <h4
            v-if="card.title"
            class="va-h4"
          >
            {{ card.title }}
          </h4>
          <p v-if="card.text">
            {{ card.text }}
          </p>
        </VaCardContent>
        <VaCardActions v-if="card.link">
          <VaButton
            :href="card.link.href"
            :color="getTextColor(getColor(card.color || 'backgroundElement'))"
          >
            {{ card.link.text }}
          </VaButton>
        </VaCardActions>
      </VaCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-config-cards {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5rem;

  &__card-wrapper {
    padding: 0.5rem;

    &:deep(.va-card) {
      height: 100%;
    }
  }

  p:last-child {
    margin-bottom: 0;
  }
}
</style>
