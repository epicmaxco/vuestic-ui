<script setup lang="ts">
import { PropType } from 'vue';
import { Card } from './types';

const props = defineProps({
  cards: {
    type: [Object, Array] as PropType<Card | Card[]>,
    required: true
  }
})

const { t } = useI18n()

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
      <va-card
        :color="card.color || 'backgroundElement'"
        :shadow="false"
        class="flex flex-col"
      >
        <va-card-content class="flex-1">
          <h4
            v-if="card.title"
            class="va-h4"
          >
            {{ t(card.title ) }}
          </h4>
          <p v-if="card.text">
            {{ t(card.text) }}
          </p>
        </va-card-content>
        <va-card-actions v-if="card.link">
          <va-button
            :href="card.link.href"
            :color="getTextColor(getColor(card.color || 'backgroundElement'))"
          >
            {{ t(card.link.text) }}
          </va-button>
        </va-card-actions>
      </va-card>
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
