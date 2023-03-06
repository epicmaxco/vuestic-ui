<template>
  <div
    class="demo-viewport"
    style="overflow: hidden;"
  >
    <div
      class="demo-ignore-overflow"
      style="overflow: hidden;"
    >
      <va-dropdown
        :model-value="true"
        :auto-placement="false"
        trigger="none"
        placement="top"
        target=".demo-viewport"
        prevent-overflow
      >
        <div class="demo-square" />

        <template #anchor>
          <button>Anchor</button>
        </template>
      </va-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-square {
  background-color: var(--va-primary);
  width: 100px;
  height: 100vh;
}

.demo-viewport {
  overflow: hidden;
  position: relative;
  padding: 4rem;
  border: 2px solid var(--va-danger);
}

.demo-ignore-overflow {
  padding: 4rem;
  overflow: hidden;
  position: relative;
  border: 2px solid var(--va-success);
}
</style>
