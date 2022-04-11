<template>
  <div
    class="va-list-item-section"
    :class="computedClass"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

export default defineComponent({
  name: 'VaListItemSection',
  props: {
    icon: { type: Boolean as PropType<boolean>, default: false },
    avatar: { type: Boolean as PropType<boolean>, default: false },
  },
  setup: (props) => ({
    computedClass: computed(() => ({
      'va-list-item-section--main': !props.icon && !props.avatar,
      'va-list-item-section--icon': props.icon,
      'va-list-item-section--avatar': props.avatar,
    })),
  }),
})
</script>

<style lang="scss">
@import "variables";

.va-list-item-section {
  display: flex;
  font-family: var(--va-font-family);

  &--main {
    min-width: 0; // for ellipsis to work correctly
    flex-direction: column;
    flex: 1 0;
  }

  &--icon {
    min-width: var(--va-list-item-section-icon-min-width);
    align-items: var(--va-list-item-section-icon-align-items);
    justify-content: var(--va-list-item-section-icon-justify-content);
    margin: var(--va-list-item-section-icon-margin);

    .va-icon {
      font-size: var(--va-list-item-section-icon-font-size);
    }
  }

  &--avatar {
    min-width: var(--va-list-item-section-avatar-min-width);
  }
}

.va-list-item-section + .va-list-item-section {
  margin-left: 0.5rem;

  &--icon {
    &:last-child {
      margin-left: 1rem;
    }
  }
}
</style>
