<template>
  <div
    class="va-tree-node"
    :class="{'va-tree-node--highlighted': highlighted}"
  >
    <div
      class="va-tree-node__checkbox"
      v-if="$slots.checkbox"
    >
      <slot name="checkbox" />
    </div>
    <div
      class="va-tree-node__icon"
      v-if="icon"
    >
      <va-icon
        :name="icon"
        :color="$themes['info']"
        :size="24"
      />
    </div>
    <div class="va-tree-node__label">
      <slot />
    </div>
    <div
      class="va-tree-node__icon-right"
      v-if="iconRight"
      :size="24"
    >
      <va-icon
        :name="iconRight"
        :color="$themes['info']"
      />
    </div>
  </div>
</template>

<script lang="ts">
import VaIcon from '../va-icon/VaIcon.vue'
import { Inject, Prop } from 'vue-property-decorator'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { mixins, Options } from 'vue-class-component'

@Options({
  name: 'VaTreeNode',
  components: { VaIcon },
})
export default class VaTreeNode extends mixins(ColorThemeMixin) {
  @Prop(Boolean) highlighted!: boolean
  @Prop({ default: '', type: String }) icon!: string
  @Prop({ default: '', type: String }) iconRight!: string
  @Inject({
    default: () => ({
      onChildMounted: () => undefined,
      onChildUnmounted: () => undefined,
    }),
  }) readonly treeCategory!: any

  mounted () {
    if (this.treeCategory) {
      this.treeCategory.onChildMounted(this)
    }
  }

  beforeUnmount () {
    if (this.treeCategory) {
      this.treeCategory.onChildUnmounted(this)
    }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-tree-node {
  display: flex;
  align-items: center;

  .form-group {
    margin-bottom: 0;
  }

  &__icon {
    margin-right: 0.5rem;
  }

  &__icon-right {
    margin-left: 0.5rem;
  }

  &__label {
    flex-grow: 1;
    word-wrap: break-word;
    overflow: hidden;
  }

  &--highlighted #{&}__label {
    background-color: $vue-light-green;
  }
}
</style>
