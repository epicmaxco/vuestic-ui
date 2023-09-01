<script setup lang="ts">
import { reactive } from 'vue'
import VaLayout from './VaLayout.vue'

const state = reactive({
  doShowSidebar: true,
})
</script>

<template>
  <VbDemo class="layout-demo">
    <VbCard title="All slots">
      <VaLayout style="background-color: var(--va-primary); width: 300px; height: 300px;">
        <template #content>
          <div>
            Content
          </div>
        </template>
        <template #left>
          <div style="height: 100%;">
            Leftbar
          </div>
        </template>
        <template #right>
          <div style="height: 100%;">
            Rightbar
          </div>
        </template>

        <template #top>
          <div>
            Header
          </div>
        </template>

        <template #bottom>
          <div>
            Footer
          </div>
        </template>
      </VaLayout>
    </VbCard>

    <VbCard title="Fixed top">
      <div class="page" style="height: 300px; overflow: scroll;">
        <VaLayout style="background-color: var(--va-primary);" :top="{ fixed: true }">
          <template #content>
            <div style="height: 800px;">
              Content
            </div>
          </template>
          <template #left>
            <div style="height: 300px;">
              Leftbar
            </div>
          </template>
          <template #right>
            <div style="height: 100%;">
              Rightbar
            </div>
          </template>

          <template #top>
            <div>
              Header
            </div>
          </template>

          <template #bottom>
            <div>
              Footer
            </div>
          </template>
        </VaLayout>
      </div>
    </VbCard>

    <VbCard title="Top, left, content slots">
      <VaLayout style="width: 300px; height: 300px;">
        <template #content>
          <div>
            Content
          </div>
        </template>
        <template #left>
          <div style="height: 100%;">
            Leftbar
          </div>
        </template>

        <template #top>
          <div>
            Header
          </div>
        </template>
      </VaLayout>
    </VbCard>

    <VbCard title="Left order">
      <VaLayout
        style="width: 300px; height: 300px;"
        :left="{ order: 1 }"
      >
        <template #content>
          <div>
            Content
          </div>
        </template>
        <template #left>
          <div style="height: 100%;">
            Leftbar
          </div>
        </template>

        <template #top>
          <div>
            Header
          </div>
        </template>
      </VaLayout>
    </VbCard>

    <VbCard title="Left order 1, bottom order 2">
      <VaLayout
        style="width: 300px; height: 300px;"
        :left="{ order: 1 }"
        :bottom="{ order: 2 }"
      >
        <template #content>
          <div>
            Content
          </div>
        </template>
        <template #left>
          <div style="height: 100%;">
            Leftbar
          </div>
        </template>
        <template #right>
          <div style="height: 100%;">
            Rightbar
          </div>
        </template>

        <template #top>
          <div>
            Header
          </div>
        </template>

        <template #bottom>
          <div>
            Footer
          </div>
        </template>
      </VaLayout>
    </VbCard>

    <VbCard title="Right order 1, bottom order 2">
      <VaLayout
        style="width: 300px; height: 300px;"
        :right="{ order: 1 }"
        :bottom="{ order: 2 }"
      >
        <template #content>
          <div>
            Content
          </div>
        </template>
        <template #left>
          <div style="height: 100%;">
            Leftbar
          </div>
        </template>
        <template #right>
          <div style="height: 100%;">
            Rightbar
          </div>
        </template>

        <template #top>
          <div>
            Header
          </div>
        </template>

        <template #bottom>
          <div>
            Footer
          </div>
        </template>
      </VaLayout>
    </VbCard>

    <VbCard title="Right order 1">
      <VaLayout
        style="background-color: var(--va-primary); width: 300px; height: 300px;"
        :right="{ order: 1 }"
      >
        <template #content>
          <div>
            Content
          </div>
        </template>
        <template #right>
          <div style="height: 100%; width: 200px;">
            Rightbar width 200px
          </div>
        </template>
        <template #bottom>
          <div>
            Footer
          </div>
        </template>
      </VaLayout>
    </VbCard>

    <VbCard title="With animation">
      <VaLayout
        style="background-color: var(--va-primary); width: 300px; height: 300px;"
      >
        <template #content>
          <div>
            Content
          </div>
        </template>
        <template #left>
          <div
            style="
height: 100%;
transition: width 0.3s ease-in-out;
"
            :style="{ width: state.doShowSidebar ? '200px' : '100px' }"
          >
            <button @click="state.doShowSidebar = !state.doShowSidebar">
              Toggle
            </button>
          </div>
        </template>
      </VaLayout>
    </VbCard>

    <VbCard title="Absolute">
      <VaLayout
        style="width: 300px; height: 300px; margin-bottom: 2rem;"
        :left="{ absolute: true }"
      >
        <template #top>
          <div>
            <button @click="state.doShowSidebar = !state.doShowSidebar">
              Toggle
            </button>
          </div>
        </template>
        <template #content>
          <div>
            Content
          </div>
        </template>
        <template #left>
          <div
            style="
height: 100%;
transition: width 0.3s ease-in-out;
"
            :style="{ width: state.doShowSidebar ? '200px' : '0px' }"
          >
          </div>
        </template>
      </VaLayout>

      <VaLayout
        style="width: 300px; height: 300px;"
        :right="{ absolute: true }"
      >
        <template #top>
          <div>
            <button @click="state.doShowSidebar = !state.doShowSidebar">
              Toggle
            </button>
          </div>
        </template>
        <template #content>
          <div>
            Content Order 0
          </div>
        </template>
        <template #right>
          <div
            style="
height: 100%;
transition: width 0.3s ease-in-out;
"
            :style="{ width: state.doShowSidebar ? '200px' : '0px' }"
          >
            Order 1
          </div>
        </template>
      </VaLayout>
    </VbCard>

    <VbCard title="Absolute with Order">
      <VaLayout
        style="width: 300px; height: 300px; margin-bottom: 2rem;"
        :right="{ absolute: true }"
      >
        <template #top>
          <div>
            <button @click="state.doShowSidebar = !state.doShowSidebar">
              Toggle
            </button>
          </div>
        </template>
        <template #content>
          <div>
            Content
          </div>
        </template>
        <template #right>
          <div
            style="
height: 100%;
transition: width 0.3s ease-in-out;
"
            :style="{ width: state.doShowSidebar ? '200px' : '0px' }"
          >
            Order 0
          </div>
        </template>
      </VaLayout>

      <VaLayout
        style="width: 300px; height: 300px;"
        :bottom="{ order: 2 }"
        :right="{ absolute: true, order: 1 }"
      >
        <template #top>
          <div>
            <button @click="state.doShowSidebar = !state.doShowSidebar">
              Toggle
            </button>
          </div>
        </template>
        <template #content>
          <div>
            Content Order 0
          </div>
        </template>
        <template #right>
          <div
            style="
transition: width 0.3s ease-in-out;
height: 100%;
"
            :style="{ width: state.doShowSidebar ? '200px' : '0px' }"
          >
            Order 1
          </div>
        </template>
        <template #bottom>
          Order 2
        </template>
      </VaLayout>
    </VbCard>

    <VbCard title="Large sidebar">
      <VaLayout style="background-color: var(--va-primary);">
        <template #content>
          <div>
            Content
          </div>
        </template>
        <template #left>
          <div style="height: 300px;">
            Leftbar
          </div>
        </template>
        <template #right>
          <div style="height: 100%;">
            Rightbar
          </div>
        </template>

        <template #top>
          <div>
            Header
          </div>
        </template>

        <template #bottom>
          <div>
            Footer
          </div>
        </template>
      </VaLayout>
    </VbCard>
  </VbDemo>
</template>

<style lang="scss">
.layout-demo {
  .va-layout {
    background: linear-gradient(45deg, var(--va-primary), var(--va-success));

    &__area {
      &--left {
        background: #3a86ff;
        color: white;
      }

      &--top {
        background: #8338ec;
        color: white;
      }

      &--right {
        background: #ff006e;
        color: white;
      }

      &--bottom {
        background: #fb5607;
        color: white;
      }

      &--content {
        color: white;
      }
    }
  }
}
</style>
