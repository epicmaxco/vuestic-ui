<template>
  <div class="va-menu-item"
    :class="{
      'va-menu-item--disabled': disabled
    }"
    @click.stop="disabled ? '' : $emit('option-click', $event)"
  >
    <VaIcon class="va-menu-item__icon--left" v-if="icon" :name="icon" />
    <a class="va-menu-item__content" :style="{
      paddingLeft: icon ? '' : '24px',
      paddingRight: rightIcon ? 0 : '24px',
    }">
      {{ name }}
    </a>
    <VaIcon class="va-menu-item__icon--right" v-if="rightIcon" :name="rightIcon" />
  </div>
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

  &__content {
    min-width: 200px;
    margin: 0 8px;
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
