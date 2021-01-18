<template>
  <div class="va-input-wrapper">
    <div class="va-input-wrapper__control">
      <div class="va-input-wrapper__slot">
        <div
          v-if="$slots.prepend"
          @click="$emit('click:prepend')"
          class="va-input-wrapper__prepend-inner"
        >
          <slot name="prepend" />
        </div>
        <div class="va-input-wrapper__content">
          <slot />
          <div class="va-input-wrapper__details py-0 px-2">
            <va-message-list
              :color="messagesColor"
              :value="messagesComputed"
              :limit="errorLimit"
            />
          </div>
        </div>
        <div
          v-if="$slots.append"
          @click="$emit('click:append')"
          class="va-input-wrapper__append-inner"
        >
          <slot name="append" />
        </div>
      </div>
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
    return (this.error && 'danger') || (this.success && 'success') || ''
  }

  get errorLimit () {
    return this.error ? this.errorCount : 99
  }
}
</script>

<style lang='scss'>
@import '../../../vuestic-sass/resources/resources';

.va-input-wrapper {
  display: flex;
  flex: 1 1 auto;
  align-items: flex-end;
  font-size: 1rem;
  text-align: left;

  &__control,
  &__content {
    width: 100%;
  }

  &__content {
    display: flex;
    flex-direction: column;
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

  &__slot {
    display: inline-flex;
    position: relative;
    width: 100%;
  }

  &__details {
    padding: 0 0.5rem;
    width: 100%;
  }

  &__messages__wrapper {
    font-size: 0.875rem;
  }

  .va-select {
    margin-bottom: 0;
  }
}
</style>
