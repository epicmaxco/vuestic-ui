<template>
  <table>
    <tr>
      <td colspan="2">
        <div class="title va-text-center mb-2">
          Offset direction
        </div>
      </td>
    </tr>
    <tr>
      <td
        colspan="2"
        style="padding: 4rem;"
      >
        <div class="flex flex-col items-center">
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
        <va-select
          v-model="placementWIthAlias"
          :options="placements"
        />
      </td>
    </tr>
    <tr>
      <td style="color: var(--va-primary);">
        Main:
      </td>
      <td>
        <va-counter
          v-model="offset[0]"
          manual-input
        />
      </td>
    </tr>
    <tr>
      <td style="color: var(--va-secondary);">
        Cross:
      </td>
      <td>
        <va-counter
          v-model="offset[1]"
          manual-input
        />
      </td>
    </tr>
  </table>
</template>

<script>
import { ref, computed } from "vue";

import { aliasToPlacement } from "vuestic-ui/src/composables";

import Coordinates from "../components/Coordinates.vue";

const aliases = [
  "top-left",
  "left-top",
  "top-right",
  "right-top",
  "bottom-left",
  "left-bottom",
  "bottom-right",
  "right-bottom",
];

export default {
  components: { Coordinates },

  setup: () => {
    const placementWIthAlias = ref("auto");
    return {
      placementWIthAlias,
      placement: computed(() => {
        return (
          aliasToPlacement[placementWIthAlias.value] || placementWIthAlias.value
        );
      }),
      placements: ["top", "bottom", "left", "right"]
        .reduce(
          (acc, position) => [
            ...acc,
            position,
            `${position}-start`,
            `${position}-end`,
            `${position}-center`,
          ],
          ["auto"]
        )
        .concat(aliases),
    };
  },

  data: () => ({
    offset: [10, 0],
  }),
};
</script>
