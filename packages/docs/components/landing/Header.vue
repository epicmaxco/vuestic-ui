<template>
  <div>
    <HeaderBanner wrapped />

    <header class="header">
      <div class="header__wrapper">
        <div class="header__inner">
          <div class="header__logo">
            <a
              href="/"
              aria-label="go to the main page"
            >
              <LayoutHeaderVuesticLogo
                height="32"
                width="160"
                aria-hidden="true"
                color="textInverted"
              />
            </a>
          </div>

          <nav class="header__links">
            <!-- vuestic buttons -->
            <VaButton
              to="/introduction/overview"
              class="header__links--link"
              preset="landingHeader"
            >
              Docs
            </VaButton>
            <VaButton
              to="/contribution/guide"
              class="header__links--link"
              preset="landingHeader"
            >
              Contribute
            </VaButton>
            <VaButton
              to="/support/consulting"
              class="header__links--link"
              preset="landingHeader"
            >
              Support & Consulting
            </VaButton>
            <VaButton
              href="mailto:hello@epicmax.co"
              target="_blank"
              class="header__links--link"
              preset="landingHeader"
            >
              Contact Us
            </VaButton>
            <!-- vuestic socials -->
            <SocialsLinks
              class="header__links--link"
              color="textInverted"
              size="small"
            />
            <div class="header__links--link">
              <StarsButton
                repo="epicmaxco/vuestic-ui"
                size="small"
              />
            </div>
          </nav>

          <!-- mobile menu -->
          <VaButton
            v-if="!modelValue"
            class="menu-button"
            aria-label="Open menu"
            preset="plain"
            color="textInverted"
            @click="$emit('update:modelValue', true)"
          >
            <VaIcon class="fas fa-bars" />
          </VaButton>

          <!-- mobile -->
          <nav
            class="mobile-menu"
            :class="{ 'mobile-menu--open': modelValue }"
          >
            <HeaderBanner wrapped />

            <div class="mobile-menu__menu-button-wrapper">
              <div class="mobile-menu__menu-button-container">
                <VaButton
                  v-if="modelValue"
                  class="menu-button mobile-menu__menu-button"
                  aria-label="Close menu"
                  preset="plain"
                  @click="$emit('update:modelValue', false)"
                >
                  <VaIcon class="fas fa-times" />
                </VaButton>
              </div>
            </div>

            <VaList class="mobile-menu__list">
              <VaListItem>
                <VaListItemSection class="mobile-menu__link">
                  <RouterLink to="/introduction/overview">
                    Docs
                  </RouterLink>
                </VaListItemSection>
              </VaListItem>
              <VaListItem>
                <VaListItemSection class="mobile-menu__link">
                  <RouterLink to="/contribution/guide">
                    Contribute
                  </RouterLink>
                </VaListItemSection>
              </VaListItem>
              <VaListItem>
                <VaListItemSection class="mobile-menu__link">
                  <RouterLink to="/support/consulting">
                    Support & Consulting
                  </RouterLink>
                </VaListItemSection>
              </VaListItem>
              <VaListItem>
                <VaListItemSection class="mobile-menu__link">
                  <RouterLink to="/introduction/team">
                    Contact Us
                  </RouterLink>
                </VaListItemSection>
              </VaListItem>

              <SocialsLinks
                class="mobile-menu__socials"
                size="large"
              />

              <div class="mobile-menu__stars">
                <StarsButton
                  repo="epicmaxco/vuestic-ui"
                />
              </div>
            </VaList>
          </nav>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
import SocialsLinks from './SocialsLinks.vue'
import StarsButton from './StarsButton.vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
@import "@/assets";

.header {
  width: 100%;
  background: var(--bg-preview-1);
  z-index: var(--header-z-index);

  &__wrapper {
    @include wrapper();
  }

  &__inner {
    @include row-flex();

    position: relative;
    align-items: center;
    height: var(--header-height);
  }

  &__logo {
    @include col();
    @include size(3);
    @include size-sm(12);

    display: flex;
    justify-content: space-between;
  }

  &__links {
    @include col();
    @include size(9);
    @include sm(display, none);

    display: flex;
    justify-content: flex-end;
    align-items: center;

    &--link {
      white-space: nowrap;
      margin-left: 2rem;

      &:first-child {
        margin-left: 0;
      }
    }
  }
}

.menu-button {
  @include sm(display, block);

  position: absolute;
  display: none;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
}

.mobile-menu {
  display: none;
  overflow: auto;

  @include col();
  @include size-sm(12);
  @include sm(margin, 0);
  @include sm(width, 100%);
  @include sm(height, 100vh);
  @include sm(flex-direction, column);
  @include sm(justify-content, flex-start);
  @include sm(background-color, var(--va-background-secondary));
  @include sm(position, fixed);
  @include sm(z-index, 10);
  @include sm(top, 0);
  @include sm(left, 0);

  &--open {
    @include sm(display, flex);
  }

  &__menu-button-wrapper {
    @include wrapper();

    width: 100%;
  }

  &__menu-button-container {
    position: relative;
    height: var(--header-height);
    width: 100%;
    flex-shrink: 0;
  }

  &__menu-button {
    right: 0.5rem;
  }

  &__list {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    padding: 0 2rem 2rem;
  }

  &__language {
    cursor: pointer;

    &.active {
      .language {
        color: var(--va-text-primary);
      }
    }
  }

  &__label {
    font-size: 0.625rem;
    margin-top: 4.5rem;
    margin-bottom: 1rem;
  }

  &__link {
    @include sm(font-size, 1.2rem);
    @include xs(font-size, 1.2rem);

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

  &__socials {
    margin-top: 4.5rem;
  }

  &__stars {
    margin-top: 4.5rem;
    text-align: center;
  }
}
</style>
