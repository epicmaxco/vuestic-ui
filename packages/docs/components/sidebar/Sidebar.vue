<template>
  <va-sidebar class="sidebar" color="secondary" v-model="minimized">
    <va-search />
    <va-list class="sidebar__links">
      <va-expand-group v-model="value" multiply>
        <va-expand
          v-for="(route, key) in navigationRoutes"
          :key="key"
          class="sidebar__expand"
          :class="{ 'sidebar__expand--active': value[key] }"
        >
          <template slot="header">
            <va-list-item class="sidebar__category">
              <va-list-item-section class="sidebar__category__section">
                <va-list-item-label class="sidebar__category__label">
                  {{ $t(route.displayName) }}
                </va-list-item-label>
              </va-list-item-section>
              <va-list-item-section icon>
                <va-icon
                  :name="value[key] ? 'expand_less' : 'expand_more'"
                  :color="value[key] ? 'primary' : ''"
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
              :to="childRoute.name"
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
        </va-expand>
      </va-expand-group>
    </va-list>
  </va-sidebar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { NavigationRoute } from './NavigationRoutes'
import VaSearch from './va-sidebar/VaSearch.vue'

@Component({
  components: { VaSearch },
})
export default class Sidebar extends Vue {
  value = [] as Array<boolean|undefined>

  @Prop({ type: Array }) readonly navigationRoutes!: NavigationRoute[]
  @Prop({ type: Boolean, default: false }) readonly minimized!: boolean

  mounted () {
    this.value = this.navigationRoutes.map((route, index) => this.value[index] || route?.children?.some(({ name }) => this.$router.currentRoute.name?.includes(name)))
  }
}
</script>

<style lang="scss" scoped>
@import "../../../ui/src/components/vuestic-sass/resources/resources.scss";

.sidebar {
  padding-top: 4rem;

  &__links {
    background-color: inherit;
    padding-bottom: 1rem;
    padding-top: 0;
  }

  &__link {
    padding: 1rem 0 1rem 2rem;
    line-height: 1.1;

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

  &__category {
    font-weight: bold;
  }

  &__expand {
    .sidebar__category__section {
      padding-left: 0.5rem;
      justify-content: center;
    }

    &--active {
      .sidebar__category__label {
        color: $theme-blue-dark;
      }
    }
  }

  &__subcategory {
    &__label {
      &:not(:first-child) {
        padding-top: 1rem;
      }

      text-align: left;
      padding-left: 1.5rem;
      color: #8396a5;
    }
  }
}
</style>
