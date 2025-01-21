<template>
  <table>
    <tbody>
      <tr>
        <td colspan="2">
          <div class="title va-text-center mb-2">
            Offset direction
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="p-[4rem]">
          <div class="flex flex-col items-center">
            <VaDropdown :model-value="true" :placement="placementWIthAlias" :close-on-click-outside="false"
              :close-on-anchor-click="false" :close-on-content-click="false" :offset="offset" :stateful="false">
              <template #anchor>
                <div>
                  <Coordinates :placement="placement" />
                </div>
              </template>

              <VaDropdownContent> Dropdown </VaDropdownContent>
            </VaDropdown>
          </div>
        </td>
      </tr>
      <tr>
        <td class="pr-4">
          Placement:
        </td>
        <td>
          <VaSelect v-model="placementWIthAlias" class="w-[10rem] sm:w-[unset]" :options="placements" />
        </td>
      </tr>
      <tr>
        <td class="text-[var(--va-primary)]">
          Main:
        </td>
        <td>
          <VaCounter v-model="offset[0]" manual-input />
        </td>
      </tr>
      <tr>
        <td class="text-[var(--va-secondary)]">
          Cross:
        </td>
        <td>
          <VaCounter v-model="offset[1]" manual-input />
        </td>
      </tr>
    </tbody>
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
