<template>
  <div
    class="header-wrapper"
    :class="isOptionsVisible && 'header-wrapper--expanded'"
  >
    <HeaderBanner closeable />

    <VaNavbar
      v-show="!isOptionsVisible"
      class="header docs-header"
      color="background-secondary"
    >
      <template #left>
        <HeaderSelector
          class="mr-3"
          :minimized="isSidebarVisible"
          @toggle-sidebar="toggleSidebar"
        />
        <NuxtLink
          :to="landing.to"
          :aria-label="landing.text"
        >
          <VuesticLogo
            height="32"
            width="160"
            aria-hidden="true"
          />
        </NuxtLink>
        <LazyAlgoliaSearch class="header__searchbar" />
      </template>

      <template #right>
        <div
          class="header__options hidden sm:flex"
        >
          <VaButton preset="secondary" to="/Play">
            Playground
          </VaButton>
          <VaButton
            v-for="(link, index) in links"
            :key="index"
            preset="secondary"
            class="mr-1"
            :to="link.to"
            :href="link.url"
            :target="link.target"
          >
            {{ link.text }}
          </VaButton>
          <!-- <ColorDropdown class="mr-2" /> -->
          <ThemeSwitch class="mr-4" />
          <VersionDropdown />
        </div>

        <!-- options mobile menu -->
        <VaButton
          class="sm:hidden"
          aria-label="Open options menu"
          preset="plain"
          @click="toggleOptions"
        >
          <VaIcon class="fas fa-bars" />
        </VaButton>
      </template>
    </VaNavbar>

    <!-- mobile options -->
    <nav
      v-show="isOptionsVisible"
      class="mobile-options header__mobile-options"
    >
      <div class="mobile-options__menu-button-wrapper">
        <VaButton
          v-if="isOptionsVisible"
          aria-label="Close options menu"
          preset="plain"
          @click="toggleOptions"
        >
          <VaIcon class="fas fa-times" />
        </VaButton>
      </div>

      <VaList class="mobile-options__list">
        <VaListItem
          v-for="(link, index) in links"
          :key="index"
        >
          <VaListItemSection class="mobile-options__link">
            <VaButton
              preset="plain"
              :to="link.to"
              :href="link.url"
              :target="link.target"
              class="mobile-options__link-button"
            >
              {{ link.text }}
            </VaButton>
          </VaListItemSection>
        </VaListItem>

        <div class="mobile-options__items">
          <VaButton preset="primary" to="/play">
            Playground
          </VaButton>
          <ThemeSwitch class="mb-8" />
          <SocialsLinks size="large" />
          <LazyLandingStarsButton repo="epicmaxco/vuestic-ui" />
          <VersionDropdown />
        </div>
      </VaList>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import VersionDropdown from './header/VersionDropdown.vue'
import ColorDropdown from './header/ColorDropdown.vue'
import HeaderSelector from './header/HeaderSelector.vue'
import VuesticLogo from './header/VuesticDocsLogo.vue'
import ThemeSwitch from './header/ThemeSwitch.vue'
import SocialsLinks from '../landing/SocialsLinks.vue'

const props = defineProps({
  isSidebarVisible: {
    type: Boolean,
    default: false,
  },
  isOptionsVisible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:isSidebarVisible', 'update:isOptionsVisible'])

const breakpoints = useBreakpoint()

const isOptionsMenuVisible = ref(false)
const isOptionsListVisible = ref(false)

const landing = computed(() => ({
  text: 'Home',
  to: '/',
}))

const links = computed(() => [
{
    text: 'Discord',
    url: 'https://discord.gg/jTKTjj2weV',
    target: '_blank',
  },
  {
    text: 'GitHub',
    url: 'https://github.com/epicmaxco/vuestic-ui',
    target: '_blank',
  },
  {
    text: 'Contribution',
    to: '/contribution/guide',
  },
])

const toggleSidebar = () => {
  emit('update:isSidebarVisible', !props.isSidebarVisible)
}

const toggleOptions = () => {
  emit('update:isOptionsVisible', !props.isOptionsVisible)
}

watch(() => breakpoints.smDown, (newValue: boolean) => {
  isOptionsMenuVisible.value = newValue
  isOptionsListVisible.value = !newValue
})

onMounted(() => {
  isOptionsMenuVisible.value = breakpoints.smDown
  isOptionsListVisible.value = !breakpoints.smDown
})
</script>

<style lang="scss">
@import "vuestic-ui/src/styles/resources";
@import "@/assets/smart-grid.scss";

.header-wrapper {
  --va-navbar-mobile-height: auto;
  --navbar-padding: 1.2rem 1rem;
  --navbar-padding-xs: 0.75rem 1rem;

  &--expanded {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
  }
}

.header {
  box-shadow: 0 2px 8px var(--va-shadow);

  &.va-navbar {
    padding: var(--navbar-padding);

    @include sm(display, flex);
    @include sm(flex-direction, row);
    @include sm(justify-content, space-between);
    @include sm(align-items, center);
    @include sm(height, unset);

    @include xs(padding, var(--navbar-padding-xs));
  }

  .va-navbar__left {
    align-items: center;
    flex-grow: 1;
  }

  .va-navbar__center {
    @include sm(width, unset);
  }

  .va-navbar__right {
    align-items: center;

    @include sm(width, unset);
  }

  &__searchbar {
    margin-left: 1.5rem;

    @include sm(margin-left, 1rem);
    @include xs(margin-left, auto);
    @include xs(margin-right, 1rem);
  }

  &__options {
    display: flex;
    align-items: center;
  }

  &__mobile-options {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: auto;
  }
}

.mobile-options {
  position: fixed;
  width: 100%;
  height: 100%;
  background: var(--va-background-primary);

  &__menu-button-wrapper {
    width: 100%;
    flex-shrink: 0;
    text-align: right;
    padding: var(--navbar-padding);

    @include xs(padding, var(--navbar-padding-xs));
  }

  &__list {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    padding: 0 2rem 2rem;
    max-width: 25rem;
    align-self: center;
  }

  &__languages {
    margin-top: 3.5rem;
  }

  &__label {
    font-size: 0.625rem;
    margin-bottom: 0.5rem;
  }

  &__language {
    cursor: pointer;

    &.active {
      .language {
        color: var(--va-text-primary);
      }
    }
  }

  &__link {
    @include sm(font-size, 1.2rem);

    align-self: center;
    font-weight: 600;
    text-align: center;

    span,
    a {
      color: var(--va-primary);
      padding: 0.5rem 0;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        color: var(--va-text-primary);
      }
    }
  }

  &__link-button {
    margin-top: 0.5rem;

    .va-button__content {
      @include sm(font-size, 1.2rem);
    }
  }

  &__items {
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > * {
      margin-top: 2rem;
    }
  }
}
</style>
