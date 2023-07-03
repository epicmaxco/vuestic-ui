<template>
  <section class="partners">
    <div class="partners__wrapper">
      <div class="partners__inner">
        <div class="partners__logos">
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
            target="_blank"
            title="Vue.js jobs – Browse through dozens of Vue.js openings"
            class="partners__logo logo__vue-jobs"
          >
            <LandingIconsIconVueJobs />
            <span class="logo__vue-jobs-text">Hire Vue.js developers</span>
          </a>

          <a
            href="https://epicmax.co/"
            target="_blank"
            title="Epicmax - Top Vue.js Development Company"
            class="partners__logo"
          >
            <LandingIconsIconEpicmaxColor
              height="19"
              width="102"
            />
          </a>

          <a
            href="https://www.ag-grid.com/"
            target="_blank"
            title="Data Grid: AG Grid: High-Performance React Grid, Angular Grid, JavaScript Grid"
            class="partners__logo"
          >
            <LandingIconsIconAgGrid />
          </a>
        </div>

        <h2 class="partners__subtitle">
          Our beloved Partners & Sponsors that support us ❤️
        </h2>
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
@import "@/assets";

.partners {
  $section-padding: 2.5rem 0 3.5rem;
  $section-xs-padding: 1rem 0 2.5rem;

  width: 100%;
  position: relative;
  padding: $section-padding;
  color: var(--va-text-inverted);
  background-color: var(--bg-partners);

  @include xs(padding, $section-xs-padding);

  &__wrapper {
    @include wrapper();
  }

  &__inner {
    @include row-flex();

    align-items: center;
    flex-direction: column;
  }

  &__subtitle {
    @include col();
    @include size(12);
    @include text-font();

    margin-top: 1.75rem;
    text-align: center;
  }

  &__logos {
    @include col();
    @include size(12);
    @include row-flex();

    justify-content: center;
    align-items: flex-end;
    flex-wrap: wrap;
  }

  &__logo {
    margin: 1.3rem 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    color: inherit;

    &:active,
    &:visited,
    &:hover {
      color: unset;
    }

    &.logo__vue-js {
      position: relative;
      bottom: -6px;
    }

    &.logo__vue-jobs {
      position: relative;

      .logo__vue-jobs-text {
        position: absolute;
        bottom: -10px;
        font-size: 8px;
        color: inherit;
      }
    }
  }
}
</style>
