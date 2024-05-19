<template>
  <VaModal
    v-model="modelValue"
    hide-default-actions
    no-padding
    close-button
    :mobile-fullscreen="false"
    class="request-audit-modal landing"
    @close="emit('close')"
  >
    <template #content>
      <div class="request-audit-modal__inner flex grow modal">
        <div class="request-audit-modal__content">
          <RequestAuditForm />
        </div>
        <div class="request-audit-modal__image">
          <img src="/landing/modals/request-audit.png" alt="Code audit bundle">
        </div>
      </div>
    </template>
  </VaModal>
</template>

<script setup lang='ts'>
import RequestAuditForm from '../forms/RequestAuditForm.vue'

const modelValue = defineModel<boolean>()

const emit = defineEmits<{
  (e: "close"): void;
}>()
</script>

<style scoped lang='scss'>
@import "@/assets";

:global(.request-audit-modal .va-modal__close) {
  @include xs(color, var(--va-secondary));

  color: var(--va-on-primary);
}

.request-audit-modal {
  &__content {
    padding: 64px 40px;

    @include xs(padding, 32px);

    overflow: hidden;
  }

  &__image {
    @include xs(display, none);

    display: flex;
    align-items: center;
    justify-content: center;
    background: #2450be;
    flex-basis: 45%;
    flex-shrink: 0;
  }
}
</style>
