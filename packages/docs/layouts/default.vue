<template>
  <div
    :key="doShowLoader + ''"
    class="docs-layout"
    :class="[`docs-layout--theme-${currentPresetName}`]"
  >
    <div
      v-show="doShowLoader"
      class="docs-layout__loader"
    />
    <VaLayout
      :top="{ fixed: true, order: 2 }"
      :left="{ fixed: true, absolute: breakpoints.smDown, overlay: breakpoints.smDown && isSidebarVisible, order: 1 }"
      @left-overlay-click="isSidebarVisible = false"
    >
      <template #top>
        <LayoutHeader
          v-model:isSidebarVisible="isSidebarVisible"
          v-model:isOptionsVisible="isOptionsVisible"
        />
      </template>

      <template #left>
        <LayoutSidebar
          v-model:visible="isSidebarVisible"
          :mobile="breakpoints.xs"
        />
      </template>

      <template #content>
        <main class="docs-layout__main-content">
          <article class="docs-layout__page-content">
            <Suspense>
              <NuxtPage />
            </Suspense>
          </article>
        </main>
      </template>
    </VaLayout>
  </div>
</template>

<script setup lang="ts">
const breakpoints = useBreakpoint()

const { currentPresetName } = useColors()

const isSidebarVisible = ref(false)
const isOptionsVisible = ref(false)
const doShowLoader = ref(true)

watch(() => breakpoints.smDown, (newValue: boolean) => {
  isSidebarVisible.value = !newValue
  isOptionsVisible.value = false
})

const { afterEach } = useRouter()
afterEach(() => {
  isSidebarVisible.value = !breakpoints.smDown
  isOptionsVisible.value = false
})


// Halloween background animation
const mouse = ref({ x: 0, y: 0 })
const mouseInertia = ref({ x: 0, y: 0 })

const onMouseMove = (e: MouseEvent) => {
  mouse.value = { x: e.clientX, y: e.clientY }
  mouseInertia.value = {
    x: mouseInertia.value.x * 0.9 + (mouse.value.x - mouseInertia.value.x) * 0.1,
    y: mouseInertia.value.y * 0.9 + (mouse.value.y - mouseInertia.value.y) * 0.1,
  }
}

onMounted(() => {
  isSidebarVisible.value = !breakpoints.smDown
  // setTimeout(() => {
  doShowLoader.value = false
  // }, 300);

  if (window.localStorage.getItem('eventConfig')) {
    window.localStorage.setItem('eventConfig', 'none')
  }

  if (currentPresetName.value === 'halloween') {
    currentPresetName.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  window.addEventListener('mousemove', onMouseMove)

  const resetInertia = () => {
    mouseInertia.value = {
      x: mouseInertia.value.x * 0.9 + -1 * 0.1,
      y: mouseInertia.value.y * 0.9 + -1 * 0.1,
    }
    requestAnimationFrame(resetInertia)
  }

  requestAnimationFrame(resetInertia)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})

useHead({
  link: [
    { href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css', rel: 'stylesheet' },
    { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', rel: 'stylesheet' },
    { href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css", rel: "stylesheet" },
  ],
  script: [
    { src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js', type: 'module' },
  ],
})
</script>

<style lang="scss">
@import 'vuestic-ui/styles/resources';
@import '@/assets/fonts-imports.scss';
@import '@/assets/smart-grid.scss';
// Need to import tailwind in layout, because otherwise Vuestic component's css will has a higher priority
// @import '~/assets/css/tailwind.css';

html {
  font-family: var(--va-font-family);
  color: var(--va-text-primary);
  background: var(--va-background-primary);
}

.docs-layout {
  font-family: var(--va-font-family);
  // Halloween background
  position: relative;
  z-index: 0;

  // &--theme-halloween {
  //   &::before {
  //     content: '';
  //     position: absolute;
  //     height: 100%;
  //     min-height: 100vh;
  //     width: 100%;
  //     background-image: url("https://i.imgur.com/rpnciUN.png");
  //     background-size: 30%;
  //     background-color: #000;
  //     z-index: 0;
  //     opacity: 0.5;
  //   }

  //   &::after {
  //     content: '';
  //     position: fixed;
  //     top: 0;
  //     height: 100%;
  //     width: 100%;
  //     background: radial-gradient(circle at v-bind("mouse.x + 'px'") v-bind("mouse.y + 'px'"), transparent 0%, #000 v-bind("(mouseInertia.x + mouseInertia.y) * 0.5 + 'px'"));
  //     background-size: 200%;
  //     z-index: 0;
  //     pointer-events: none;
  //   }

  //   .docs-layout__loader {
  //     // Halloween loader
  //     background-image: url("https://i.imgur.com/yLvFZoB.png");
  //     background-position: center;
  //     background-repeat: no-repeat;
  //     animation: background-jump 1s infinite;
  //   }

  //   .docs-sidebar {
  //     // Halloween background
  //     background-image: url("https://i.imgur.com/fLEstk9.png");
  //     background-repeat: no-repeat;
  //     background-blend-mode: multiply;
  //   }

  //   .docs-header {
  //     // Halloween background
  //     background-image: url("https://i.imgur.com/BNkuj2J.png");
  //     background-position: center;
  //     background-blend-mode: multiply;
  //   }
  // }

  & > * {
    z-index: 1;
  }

  @keyframes background-jump {
    0% {
      background-position: center;
    }
    50% {
      background-position: center 45%;
    }
    100% {
      background-position: center;
    }
  }

  &__loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999999;
    background: var(--va-background-primary);
  }

  &__main-section {
    display: flex;
    flex-grow: 2;
    overflow: auto;
    position: relative;
  }

  &__main-content {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &__page-content {
    width: 100%;
    max-width: 1080px;
    padding: 1.75rem 3.5rem;
    box-sizing: border-box;

    @include sm(padding, 2em);
  }
}
</style>
