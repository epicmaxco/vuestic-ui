<template>
  <div class="icons">
    <VaIcon
      v-for="({ name, flip, position }, index) in iconsList"
      :key="index"
      :name="name"
      :flip="flip"
      size="large"
      @click="() => handleIconClick(position)"
    />
  </div>
  <VaModal
    v-model="showModal"
    draggable
    :draggable-position="initialPosition"
    :title="initialPosition"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut lobortis
    dui.
  </VaModal>
</template>

<script setup>
import { ref } from "vue";

const iconsList = [
  { name: 'arrow_outward', flip: 'vertical', position: { x: 0, y: 0 } },
  { name: 'arrow_upward', position: { x: '50%', y: 0 } },
  { name: 'arrow_outward', position: { x: '100%', y: 0 } },
  { name: 'arrow_back', position: { x: 0, y: '50%' } },
  { name: 'circle', position: { x: '50%', y: '50%' } },
  { name: 'arrow_forward', position: { x: '100%', y: '50%' } },
  { name: 'arrow_outward', flip: 'both', position: { x: 0, y: '100%' } },
  { name: 'arrow_downward', position: { x: '50%', y: '100%' } },
  { name: 'arrow_outward', flip: 'horizontal', position: { x: '100%', y: '100%' } },
]

const showModal = ref(false)
const initialPosition = ref(iconsList[0].position)

const handleIconClick = (position) => {
  initialPosition.value = position
  showModal.value = true
}
</script>

<style lang="scss" scoped>
.icons {
  display: flex;
  flex-wrap: wrap;
  width: 80px;
  gap: 4px;
  align-items: center;

  * {
    flex: 0 0 24px;
    transition: color 0.25s ease-in-out;

    &:hover {
      color: var(--va-primary);
    }
  }
}
</style>
