<template>
  <div
    class="demo-viewport overflow-hidden relative p-16 border-2 border-solid border-[var(--va-danger)]"
  >
    <div
      class="overflow-hidden p-16 border-2 border-solid border-[var(--va-success)]"
    >
      <VaDropdown
        :model-value="true"
        :auto-placement="false"
        :stateful="false"
        trigger="none"
        placement="top"
        teleport=".demo-viewport"
      >
        <div class="h-screen w-24 bg-[var(--va-primary)]" />

        <template #anchor>
          <button>Anchor</button>
        </template>
      </VaDropdown>
    </div>
  </div>
</template>
