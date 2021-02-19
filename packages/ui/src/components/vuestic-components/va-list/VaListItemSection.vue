<template>
  <div
    class="va-list-item-section"
    :class="computedClass"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Options, Vue, mixins, prop } from 'vue-class-component'

class ListItemSectionProps {
  icon = prop<boolean>({ type: Boolean, default: false })
  avatar = prop<boolean>({ type: Boolean, default: false })
}

const ListItemSectionPropsMixin = Vue.with(ListItemSectionProps)

@Options({
  name: 'VaListItemSection',
})
export default class VaListItemSection extends mixins(
  ListItemSectionPropsMixin,
) {
  get computedClass () {
    return {
      'va-list-item-section--main': !this.icon && !this.avatar,
      'va-list-item-section--icon': this.icon,
      'va-list-item-section--avatar': this.avatar,
    }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-list-item-section {
  display: flex;

  &--main {
    min-width: 0; // for ellipsis to work correctly
    flex-direction: column;
    flex: 1 0;
  }

  &--icon {
    min-width: 1.5rem;
    align-items: center;
    justify-content: center;
    margin: 0.6rem 0.75rem;

    .va-icon {
      font-size: 1.25rem;
    }
  }

  &--avatar {
    min-width: 3rem;
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
