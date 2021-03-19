<template>
  <va-sidebar class="sidebar" color="secondary" v-model="minimized">
    <algolia-search />
    <va-list class="sidebar__links">
      <va-accordion v-model="value" multiply>
        <va-collapse
          v-for="(route, key) in navigationRoutes"
          :key="key"
          class="sidebar__expand"
        >
          <template #header>
            <va-list-item class="sidebar__category">
              <va-list-item-section class="sidebar__category__section">
                <va-list-item-label class="sidebar__category__label">
                  {{ $t(route.displayName) }}
                </va-list-item-label>
              </va-list-item-section>
              <va-list-item-section icon>
                <va-icon
                  :name="value[key] ? 'expand_less' : 'expand_more'"
                />
              </va-list-item-section>
            </va-list-item>
          </template>
          <div v-for="(childRoute, index) in route.children" :key="index">
            <va-list-label
              v-if="childRoute.category"
              class="sidebar__subcategory__label"
              color="gray"
            >
              {{ $t(childRoute.category) }}
            </va-list-label>
            <va-list-item
              :to="`/${$root.$i18n.locale}/${route.name}/${childRoute.name}`"
              class="sidebar__link"
              active-class="sidebar__link--active"
            >
              <va-list-item-section>
                <va-list-item-label>
                  {{ $t(childRoute.displayName) }}
                </va-list-item-label>
              </va-list-item-section>
            </va-list-item>
          </div>
        </va-collapse>
      </va-accordion>
    </va-list>
  </va-sidebar>
</template>

<script lang="ts">
import { watch } from 'vue'
import { Options, Vue, prop, mixins } from 'vue-class-component'
import { NavigationRoute } from './NavigationRoute'
import AlgoliaSearch from './algolia-search/AlgoliaSearch.vue'

class Props {
  navigationRoutes = prop<any[]>({ type: Array, default: () => [] })
  minimized = prop<boolean>({ type: Boolean, default: false })
}

const PropsMixin = Vue.with(Props)

@Options({
  components: { AlgoliaSearch },
})
export default class Sidebar extends mixins(PropsMixin) {
  value = [] as boolean[]

  created () {
    watch(() => this.$route, this.onRouteChange, { immediate: true })
  }

  onRouteChange () {
    this.setActiveExpand()
  }

  setActiveExpand () {
    this.value = this.navigationRoutes.map((route, index) => {
      const pathSteps: string[] = this.$route.path.split('/').filter(Boolean)
      return (
        this.value[index] ||
        // @ts-ignore
        !!route.children?.some(({ name }) =>
          pathSteps.includes(name),
        )
      )
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~vuestic-ui-dev/src/components/vuestic-sass/resources/resources.scss";

.sidebar {
  z-index: 1000;
  padding-top: 4rem;

  @include media-breakpoint-down(sm) {
    padding-top: 8rem;
  }

  .va-list-item {
    &:hover {
      background-color: $light-gray3;
      cursor: pointer;
    }

    &--focus {
      background-color: $light-gray3;
    }

    &.sidebar__link {
      padding: 1rem 0 1rem 2rem;
      line-height: 1.1;
      display: block;

      &:hover {
        background: $light-blue;

        .va-list-item-label {
          color: $theme-blue-dark;
        }
      }

      &--active {
        .va-list-item-label {
          color: $theme-blue-dark;
        }
      }
    }
  }

  &__links {
    background-color: inherit;
    padding-bottom: 1rem;
    padding-top: 0;
  }

  &__category {
    font-weight: bold;
  }

  &__expand {
    .sidebar__category__section {
      padding-left: 0.5rem;
      justify-content: center;
    }
  }

  &__subcategory {
    &__label {
      &:not(:first-child) {
        padding-top: 1rem;
      }

      text-align: left;
      padding-left: 1.5rem;
      color: $default-gray;
    }
  }
}
</style>
