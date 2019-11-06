<template>
  <div class="va-input-wrapper">
    <div class="va-input-wrapper__control">
      <div class="va-input-wrapper__slot">
        <div
          v-if="$slots.prepend"
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
              :limit="error ? errorCount : 99"
            />
          </div>
        </div>
        <div
          v-if="$slots.append"
          class="va-input-wrapper__append-inner"
        >
          <slot name="append" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VaMessageList from './VaMessageList'
import { ContextPluginMixin, getContextPropValue } from '../../context-test/context-provide/ContextPlugin'

export default {
  name: 'VaInputWrapper',
  components: { VaMessageList },
  mixins: [ContextPluginMixin],
  props: {
    disabled: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'disabled', false)
      },
    },
    error: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'error', false)
      },
    },
    success: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'success', false)
      },
    },
    messages: {
      type: Array,
      default () {
        return getContextPropValue(this, 'messages', [])
      },
    },
    errorMessages: {
      type: Array,
      default () {
        return getContextPropValue(this, 'errorMessages', [])
      },
    },
    errorCount: {
      type: Number,
      default () {
        return getContextPropValue(this, 'errorCount', 1)
      },
    },
  },
  computed: {
    messagesComputed () {
      return this.error ? this.errorMessages : this.messages
    },
    messagesColor () {
      return (this.error && 'danger') || (this.success && 'success') || ''
    },
  },
}
</script>

<style lang='scss'>
@import '../../vuestic-sass/resources/resources';

.va-input-wrapper {
  display: flex;
  flex: 1 1 auto;
  align-items: flex-end;
  font-size: 1rem;
  text-align: left;
  margin-bottom: 1rem;

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
    display: flex;
    position: relative;
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
