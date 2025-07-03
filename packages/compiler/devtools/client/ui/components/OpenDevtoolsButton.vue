<script setup lang="ts">
  import { ref } from 'vue';
  import { useModal } from 'vuestic-ui';

  const doShow = ref(localStorage.getItem('vuestic-devtools') !== 'false')

  const { confirm } = useModal()

  async function toggleDevtools() {
    const res = await confirm({
      title: 'Remove toggle devtools button',
      message: `Are you sure you want to remove the toggle Vuestic Devtools button? You can set 'vuestic-devtools' in localStorage to 'true' to show it again.`,
    })

    if (res) {
      const currentState = localStorage.getItem('vuestic-devtools')
      localStorage.setItem('vuestic-devtools', currentState === 'false' ? 'true' : 'false')
      doShow.value = !doShow.value
    }
  }
</script>

<template>
  <div v-if="doShow" class="va-open-devtools-button">
    <img src="https://ui.vuestic.dev/favicon.ico" height="16px" />
    <div class="va-open-devtools-button__close">
      <VaIcon name="va-close" @click.stop="toggleDevtools" color="textPrimary" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .va-open-devtools-button {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    position: fixed;
    top: 90%;
    right: 0px;
    background-color: var(--va-background-secondary);
    color: var(--va-on-primary);
    padding: 0.75rem 0.75rem;
    white-space: nowrap;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: right 0.3s ease-in-out;

    &__close {
      transition: height 0.3s ease-in-out, margin-top 0.3s ease-in-out;
      height: 0;
      overflow: hidden;
    }

    &:hover {
      .va-open-devtools-button__close {
        height: 1rem;
        margin-top: 1rem;
      }
    }
  }
</style>
