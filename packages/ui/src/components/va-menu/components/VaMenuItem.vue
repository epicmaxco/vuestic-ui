<template>
  <button class="va-menu-item"
    :class="{
      'va-menu-item--disabled': disabled
    }"
    @click.stop="disabled ? '' : $emit('option-click', $event)"
  >
    <slot name="left-icon">
      <VaIcon class="va-menu-item__icon--left" v-if="icon" :name="icon" />
    </slot>
    <a class="va-menu-item__content" :style="{
      paddingLeft: icon ? '' : '24px',
      paddingRight: rightIcon ? 0 : '24px',
    }">
      {{ name }}
    </a>
    <slot name="right-icon">
      <VaIcon v-if="rightIcon" class="va-menu-item__icon--right" :name="rightIcon" />
      <div v-else />
    </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { VaIcon } from '../../va-icon/'

export default defineComponent({
  name: 'VaMenuItem',
  components: { VaIcon },
  props: {
    name: { type: String, default: '' },
    icon: { type: String, defatult: '' },
    rightIcon: { type: String, defatult: '' },
    disabled: { type: Boolean, default: false },
  },
  setup (props) {
    return {}
  },
})
</script>

<style lang="scss">
.va-menu-item {
  display: flex;
  cursor: pointer;
  padding: 18px;
  align-items: center;
  justify-content: space-evenly;

  &__content {
    min-width: 200px;
    text-align: left;
    // margin: 0 8px;
  }

  &:hover {
    background-color: lightgray;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__icon {
    &--left {
      margin-right: 0;
    }

    &--right {
      margin-left: 0;
    }
  }
}
</style>
