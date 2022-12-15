<template>
    <table>
      <tr>
        <td colspan="2">
          <div class="title text--center mb-2">Offset direction</div>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 4rem;">
          <div class="d-flex flex-direction-column align-center">
            <va-dropdown
              :model-value="true"
              :placement="placementWIthAlias"
              :close-on-click-outside="false"
              :close-on-anchor-click="false"
              :close-on-content-click="false"
              :offset="offset"
            >
              <template #anchor>
                  <Coordinates :placement="placement" />
              </template>

              <va-dropdown-content> Dropdown </va-dropdown-content>
            </va-dropdown>
          </div>
        </td>
      </tr>
      <tr>
        <td>Placement:</td>
        <td>
          <va-select :options="$options.placements" v-model="placementWIthAlias" />
        </td>
      </tr>
      <tr>
        <td style="color: var(--va-primary);">Main:</td>
        <td><va-counter v-model="offset[0]" manual-input /></td>
      </tr>
      <tr>
        <td style="color: var(--va-secondary);">Cross:</td>
        <td><va-counter v-model="offset[1]" manual-input /></td>
      </tr>
    </table>
</template>

<script>
import Coordinates from '../components/Coordinates.vue'
import { usePlacementAliases } from 'vuestic-ui/src/composables'
import { computed } from 'vue'

const { aliasToPlacement } = usePlacementAliases()

const aliases = ['top-left', 'left-top', 'top-right', 'right-top', 'bottom-left', 'left-bottom', 'bottom-right', 'right-bottom']

export default {
  components: { Coordinates },
  data () {
    return {
      placementWIthAlias: 'auto',
      offset: [10, 0],
    }
  },

  placement: computed(() => {
    return aliasToPlacement[this.placementWIthAlias] || this.placementWIthAlias
  }),

  placements: ['top', 'bottom', 'left', 'right'].reduce(
    (acc, position) => [
      ...acc,
      position,
      `${position}-start`,
      `${position}-end`,
      `${position}-center`,
    ],
    ['auto'],
  ).concat(aliases),
}
</script>
