<script setup lang="ts">
import { reactive } from 'vue'
import VaLayout from './VaLayout.vue'

const state = reactive({
  doShowSidebar: false,
})
</script>

<template>
  <VbDemo>
    <VbCard title="All slots">
      <VaLayout style="background-color: var(--va-primary); width: 300px; height: 300px;">
        <template #content>
          <div style="background-color: #ff00ff; height: 100%;">
            Content
          </div>
        </template>
        <template #left>
          <div style="background-color: var(--va-secondary); height: 100%;">
            Leftbar
          </div>
        </template>
        <template #right>
          <div style="background-color: var(--va-secondary); height: 100%;">
            Rightbar
          </div>
        </template>

        <template #top>
          <div style="background-color: var(--va-primary);">
            Header
          </div>
        </template>

        <template #bottom>
          <div style="background-color: var(--va-danger);">
            Footer
          </div>
        </template>
      </VaLayout>
    </VbCard>

    <VbCard title="Top, left, content slots">
      <VaLayout style="background-color: var(--va-primary); width: 300px; height: 300px;">
        <template #content>
          <div style="background-color: #ff00ff; height: 100%;">
            Content
          </div>
        </template>
        <template #left>
          <div style="background-color: var(--va-secondary); height: 100%;">
            Leftbar
          </div>
        </template>

        <template #top>
          <div style="background-color: var(--va-primary);">
            Header
          </div>
        </template>
      </VaLayout>
    </VbCard>
  </VbDemo>
</template>
