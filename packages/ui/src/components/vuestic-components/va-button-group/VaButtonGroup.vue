<template>
  <div
    class="va-button-group"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop, setup } from 'vue-class-component'
import { InjectionKey, reactive, provide } from 'vue'

export const ButtonGroupServiceKey: InjectionKey<{ color?: string }> = Symbol('ButtonGroupService')

class Props {
  color = prop<string>({
    type: String,
    default: '',
  })
}

@Options({
  name: 'VaButtonGroup',
})
export default class VaButtonGroup extends Vue.with(Props) {
  context = setup(() => {
    const va = reactive({
      color: this.color,
    })

    provide(ButtonGroupServiceKey, va)

    return {
      va,
    }
  })

  // get computedClass () {
  //   return {
  //     'va-button-group--large': this.large,
  //     'va-button-group--small': this.small,
  //     'va-button-group--normal': !this.large && !this.small,
  //   }
  // }
}
</script>

<style lang='scss'>
@import '../../vuestic-sass/resources/resources';

.va-button-group {
  display: flex;
  justify-content: stretch;
  // margin: 0.375rem 0.5rem;

  &--small {
    border-radius: $btn-border-radius-sm;
  }

  &--large {
    border-radius: $btn-border-radius-lg;
  }

  &--normal {
    border-radius: $btn-border-radius-nrm;
  }

  .va-button {
    margin: 0;
  }

  & > .va-button:last-child {
    width: auto;
    padding-right: 1rem;

    &.va-button--small {
      padding-right: 0.75rem;
    }

    &.va-button--large {
      padding-right: 1.5rem;
    }
  }

  & > .va-button:first-child {
    width: auto;
    padding-left: 1rem;

    &.va-button--small {
      padding-left: 0.75rem;
    }

    &.va-button--large {
      padding-left: 1.5rem;
    }
  }

  & > .va-button:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-right: 0.5rem;
    border-right: 0;
  }

  & > .va-button + .va-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding-left: 0.5rem;
    border-left: 0;
  }
}
</style>
