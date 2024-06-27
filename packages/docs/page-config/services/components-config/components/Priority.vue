<template>
  <div class="flex flex-col">
    <p class="my-2 mx-auto">
      Less important
    </p>
    <div
      v-for="priority, index in [
        'Component `default` prop value',
        'Global `all` props value',
        'Component props from Global Config',
        'Component props form VaConfig',
        'Props value from component preset',
        'Props bound directly to component',
      ]"
      :key="priority"
    >
      <div
        class="border-2 border-solid border-[var(--va-background-border)] p-4"
      >
        {{ priority }}
      </div>
      <div v-if="index !== 5" class="w-0 mx-auto justify-self-center border-r-2 border-solid border-[var(--va-background-border)] h-4" />
    </div>
    <p class="my-2 mx-auto">
      More important
    </p>
  </div>
</template>
