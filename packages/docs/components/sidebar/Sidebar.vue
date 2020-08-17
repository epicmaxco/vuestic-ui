<template>
  <va-sidebar
    class="sidebar"
    style="height: auto;"
    color="secondary"
  >
    <template slot="menu">
      <va-list class="sidebar__links">
        {{ value }}
        <va-expand-group v-model="value">
        <va-expand
          v-for="(item, key) in items"
          :key="key"
          class="sidebar__expand"
          :class="{'sidebar__expand--active': value[key]}"
        >
          <template slot="header">
            <va-list-item class="sidebar__category">
              <va-list-item-section>
                <va-list-item-label class="sidebar__category__label">
                  {{ $t(item.displayName) }}
                </va-list-item-label>
              </va-list-item-section>
            </va-list-item>
          </template>
          <!-- links -->
          <div
            v-for="(subMenuItem, index) in item.children"
            :key="index"
          >
            <va-list-label class="">
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
          <!-- /links -->
        </va-expand>
        </va-expand-group>
      </va-list>
    </template>
  </va-sidebar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { NavigationRoute } from './NavigationRoutes'

@Component({})
export default class Sidebar extends Vue {
  value = []
  contacts = [
    { name: 'Audrey Clay', address: '644 Vermont Court, Freelandville, Kentucky, 2619', img: 'https://randomuser.me/api/portraits/women/5.jpg' },
    { name: 'Aguirre Klein', address: '626 Carroll Street, Roulette, Ohio, 1477', img: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Tucker Kaufman', address: '887 Winthrop Street, Tryon, Florida, 3912', img: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { name: 'Herbert Keller', address: '286 NW. Shore St.Longwood, FL 32779', img: 'https://randomuser.me/api/portraits/men/5.jpg' },
  ]

  // @Prop({ type: Boolean, required: true }) readonly minimized!: boolean
  @Prop({ type: Array, default: [] }) readonly items!: NavigationRoute[]

  get categoryTitleStyle () {
    return {
      textTransform: 'uppercase',
      color: (this as any).$themes.gray,
      fontSize: '10px',
      fontWeight: 'bold',
      letterSpacing: '0.6px',
    }
  }

  get route () {
    return this.$route || {}
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  padding-top: 2.5625rem;
  padding-bottom: 2.5rem;

  &__links {
    background-color: inherit;
    max-height: 100vh;
  }

  &__link {
    padding: 1rem 0 1rem 2rem;

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

  &__expand--active {
    .sidebar__category__label {
      color: #2c82e0;
    }
  }
}

.category {
  padding-left: 2rem;
}
</style>
