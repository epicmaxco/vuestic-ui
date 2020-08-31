<template>
  <va-sidebar
    class="sidebar"
    color="secondary"
  >
    <va-list class="sidebar__links">
      <va-expand-group v-model="value">
        <va-expand
          v-for="(item, key) in items"
          :key="key"
          class="sidebar__expand"
          :class="{'sidebar__expand--active': value[key]}"
        >
          <template slot="header">
            <va-list-item class="sidebar__category">
              <va-list-item-section class="sidebar__category__section">
                <va-list-item-label class="sidebar__category__label">
                  {{ $t(item.displayName) }}
                </va-list-item-label>
              </va-list-item-section>
              <va-list-item-section icon>
                <va-icon
                  :name="value[key] ? 'expand_less' : 'expand_more'"
                  :color="value[key] ? '#2c82e0' : ''"

                />
              </va-list-item-section>
            </va-list-item>
          </template>
          <div
            v-for="(subMenuItem, index) in item.children"
            :key="index"
          >
            <va-list-label
              v-if="subMenuItem.category"
              class="sidebar__subcategory__label"
              color="gray"
            >
              {{ $t(subMenuItem.category) }}
            </va-list-label>
            <va-list-item

              :to="subMenuItem.name"
              class="sidebar__link"
              active-class="sidebar__link--active"
            >
              <va-list-item-section>
                <va-list-item-label>
                  {{ $t(subMenuItem.displayName) }}
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

@Component({})
export default class Sidebar extends Vue {
  value = []

  @Prop({ type: Array, default: [] }) readonly items!: NavigationRoute[]
}
</script>

<style lang="scss" scoped>
.sidebar {
  padding-top: 2.5625rem;
  // padding-bottom: 1rem;

  &__links {
    background-color: inherit;
    // max-height: calc(100vh - 1rem);
    padding-bottom: 1rem;
  }

  &__link {
    padding: 1rem 0 1rem 2rem;
    line-height: 1.1;

    &:hover {
      background: #ecf4f8;

      .va-list-item-label {
        color: #2c82e0;
      }
    }

    &--active {
      .va-list-item-label {
        color: #2c82e0;
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
        color: #2c82e0;
      }
    }
  }

  &__subcategory {
    &__label {
      padding-top: 1rem;
      text-align: left;
      padding-left: 1.5rem;
      color: #8396a5;
    }
  }
}
</style>
