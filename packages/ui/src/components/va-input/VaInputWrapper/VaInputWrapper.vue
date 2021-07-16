<template>
  <div class="va-input-wrapper">
    <div
      v-if="$slots.prepend"
      class="va-input-wrapper__prepend-inner"
      @click="$emit('click:prepend')"
    >
      <slot name="prepend" />
    </div>

    <div class="va-input-wrapper__content">
      <slot />

      <div class="va-input-wrapper__message-list-wrapper">
        <va-message-list
          :color="messagesColor"
          :value="messagesComputed"
          :limit="errorLimit"
        />
      </div>
    </div>

    <div
      v-if="$slots.append"
      class="va-input-wrapper__append-inner"
      @click="$emit('click:append')"
    >
      <slot name="append" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'

import VaMessageList from '../VaMessageList'

class Props {
  disabled = prop<boolean>({ type: Boolean, default: false })
  error = prop<boolean>({ type: Boolean, default: false })
  success = prop<boolean>({ type: Boolean, default: false })
  messages = prop<any[]>({ type: Array, default: () => [] })
  errorMessages = prop<any[]>({ type: Array, default: () => [] })
  errorCount = prop<number>({ type: Number, default: 1 })
}

@Options({
  name: 'VaInputWrapper',
  components: { VaMessageList },
})
export default class VaInputWrapper extends Vue.with(Props) {
  get messagesComputed () {
    return this.error ? this.errorMessages : this.messages
  }

  get messagesColor () {
    if (this.error) {
      return 'danger'
    }

    if (this.success) {
      return 'success'
    }
  }

  get errorLimit () {
    return this.error ? this.errorCount : 99
  }
}
</script>

<style lang='scss'>
@import '../../../styles/resources/resources';

.va-input-wrapper {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  font-size: 1rem;
  text-align: left;

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__prepend-inner,
  &__append-inner {
    display: inline-flex;
    align-items: center;
  }

  &__prepend-inner {
    margin-right: 0.5rem;
  }

  &__append-inner {
    margin-left: 0.5rem;
  }

  &__message-list-wrapper {
    padding: 0 0.5rem;
    width: 100%;
  }
}
</style>
