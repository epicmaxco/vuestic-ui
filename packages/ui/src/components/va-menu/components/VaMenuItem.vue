<template>
  <tr class="va-menu-item"
    :class="{
      'va-menu-item--disabled': disabled
    }"
    @click.stop="disabled ? '' : $emit('option-click', $event)"
  >
    <td class="va-menu-item__cell va-menu-item__cell--left">
      <slot name="left-icon">
        <VaIcon class="va-menu-item__icon--left" v-if="icon" :name="icon" />
      </slot>
    </td>

    <td class="va-menu-item__cell va-menu-item__cell--center">
      <slot>
        <a class="va-menu-item__content">
          {{ name }}
        </a>
      </slot>
    </td>

    <td class="va-menu-item__cell va-menu-item__cell--right">
      <slot name="right-icon">
        <VaIcon v-if="rightIcon" class="va-menu-item__icon--right" :name="rightIcon" />
      </slot>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { VaIcon } from '../../va-icon/'
import { useColors } from '../../../composables'

export default defineComponent({
  name: 'VaMenuItem',
  components: { VaIcon },
  props: {
    name: { type: String, default: '' },
    icon: { type: String, defatult: '' },
    rightIcon: { type: String, defatult: '' },
    disabled: { type: Boolean, default: false },
    color: { type: String, default: 'primary' },
  },
  setup (props) {
    const { getColor, getHoverColor, getFocusColor, setHSLAColor } = useColors()

    const hoverColor = computed(() => setHSLAColor(getColor(props.color), { a: 0.1 }))
    const focusColor = computed(() => getFocusColor(getColor(props.color)))

    return {
      hoverColor,
    }
  },
})
</script>

<style lang="scss">
.va-menu-item {
  display: table-row;
  cursor: pointer;

  &__cell {
    display: table-cell;
    vertical-align: middle;

    &--center {
      padding: 0 var(--va-menu-padding-x);
      text-align: left;
      width: 100%;
    }

    &--left,
    &--right {
      padding: 0 var(--va-menu-padding-x);
      text-align: center;
      min-width: 1px;

      &:empty {
        padding: 0;
      }
    }

    &--left {
      padding-right: 0;
    }

    &--right {
      padding-left: 0;
    }
  }

  &:hover {
    opacity: 0.9999;
    background-color: v-bind("hoverColor");
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
