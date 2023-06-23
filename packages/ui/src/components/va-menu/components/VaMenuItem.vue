<template>
  <div class="va-menu-item">
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
// import {  } from '../../composables/'

export default defineComponent({
  name: 'VaMenuItem',
  components: { VaIcon },
  props: {
    name: { type: String, default: '' },
    icon: { type: String, defatult: '' },
    rightIcon: { type: String, defatult: '' },
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
