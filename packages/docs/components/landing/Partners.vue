<template>
  <section class="partners">
    <div class="partners__wrapper">
      <div class="partners__inner">
        <h2 class="partners__title">
          {{ $t('landing.partners.title') }}
        </h2>

        <div class="partners__logos">
          <a
            href="https://nuxt.com/"
            target="_blank"
            title="Nuxt - The Intuitive Web Framework"
            class="partners__logo"
          >
            <LandingIconsIconNuxt />
          </a>

          <a
            href="https://flatlogic.com/"
            target="_blank"
            title="Flatlogic - The best way to create React, Angular and Vue full-stack web applications"
            class="partners__logo"
          >
            <LandingIconsIconFlatlogic />
          </a>

          <a
            href="https://vuejobs.com/"
            class="partners__logo"
            target="_blank"
            title="Vue.js jobs – Browse through dozens of Vue.js openings"
          >
            <LandingIconsIconVueJobs />
            <span class="partners__logo-text">Hire Vue.js developers</span>
          </a>

          <a
            href="https://epicmax.co/"
            target="_blank"
            title="Epicmax - Top Vue.js Development Company"
            class="partners__logo"
          >
            <LandingIconsIconEpicmaxGradient />
          </a>

          <a
            href="https://www.ag-grid.com/"
            target="_blank"
            title=" Data Grid: AG Grid: High-Performance React Grid, Angular Grid, JavaScript Grid"
            class="partners__logo"
          >
            <LandingIconsIconAgGrid />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LandingPartners',
}
</script>

<style lang="scss" scoped>
@import "@/assets/smart-grid";

.partners {
  width: 100%;
  position: relative;
  padding: 3rem 0;
  border-top: 1px solid var(--va-background-border);
  border-bottom: 1px solid var(--va-background-border);
  backdrop-filter: blur(2px);

  &::after {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: var(--va-background-landing);
    opacity: 0.8;
  }

  &__wrapper {
    @include wrapper();
  }

  &__inner {
    @include row-flex();

    align-items: center;
  }

  &__title {
    text-align: center;
    width: 100%;
    font-size: 1.4rem;
  }

  &__logos {
    @include size(12);

    margin-left: auto;
    margin-right: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  &__logo {
    margin-top: 1.3rem;
    word-wrap: break-word;
    margin-left: 15px;
    margin-right: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    color: unset;

    &:active,
    &:visited,
    &:hover {
      color: unset;
    }

    &-text {
      position: relative;
      bottom: -2px;
      font-size: 12px;
      color: var(--va-secondary);
    }
  }
}
</style>
