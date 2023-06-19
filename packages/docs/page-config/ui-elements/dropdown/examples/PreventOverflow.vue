<template>
  <div
    class="demo-viewport overflow-hidden relative p-16 border-2 border-solid border-[var(--va-danger)]"
  >
    <div
      class="overflow-hidden p-16 border-2 border-solid border-[var(--va-success)]"
    >
      <va-dropdown
        :model-value="true"
        :auto-placement="false"
        trigger="none"
        placement="top"
        target=".demo-viewport"
        prevent-overflow
      >
        <div class="h-screen w-24 bg-[var(--va-primary)]" />

        <template #anchor>
          <button>Anchor</button>
        </template>
      </va-dropdown>
    </div>
  </div>
</template>
