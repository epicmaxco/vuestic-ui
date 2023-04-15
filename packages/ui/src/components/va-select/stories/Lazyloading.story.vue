<script setup lang="ts">
import { VaSelect } from '..'

const setTimeout = (cb: any, timout: number) => window.setTimeout(cb, 2000)

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
</script>

<template>
  <Story title="VaSelect/Lazyloading">
    <Variant
      title="Scroll to bottom to load more"
      :initState="
        () => ({
          value: '',
          options,
        })
      "
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        :options="state.options"
        @scroll-bottom="
          () => {
            state.options = [...state.options, state.options.length + 1];
          }
        "
      />
    </Variant>

    <Variant
      title="Scroll to bottom to load more"
      :initState="
        () => ({
          value: '',
          options,
          isLoading: false
        })
      "
      #default="{ state }"
    >
      <va-select
        v-model="state.value"
        searchable
        :options="state.options"
        :loading="state.isLoading"
        @updateSearch="() => {
          state.isLoading = true
          setTimeout(() => {
            state.isLoading = false
          }, 2000)
        }"
      />
    </Variant>
  </Story>
</template>
