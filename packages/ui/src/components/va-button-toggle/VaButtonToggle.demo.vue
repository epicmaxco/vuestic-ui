<template>
  <VbDemo>
    <VbCard>
      <table class="table table-bordered">
        <tr>
          <th>Description</th>
          <th></th>
        </tr>
        <tr>
          <td>Types</td>
          <td>
            <va-button-toggle
              v-model="model"
              :options="options"
            />
            <va-button-toggle
              v-model="model"
              v-bind="VaButtonPresets.primary"
              :options="options"
            />
            <va-button-toggle
              v-model="model"
              border-color="primary"
              v-bind="VaButtonPresets.primary"
              :options="options"
            />
            <va-button-toggle
              v-model="model"
              v-bind="VaButtonPresets.secondary"
              :options="options"
            />
            <va-button-toggle
              v-model="model"
              v-bind="VaButtonPresets.plain"
              :options="options"
            />
            <va-button-toggle
              v-model="model"
              v-bind="VaButtonPresets.plainOpacity"
              :options="options"
            />
          </td>
        </tr>
        <tr>
          <td>Sizes</td>
          <td>
            <va-button-toggle
              v-model="model"
              :options="options"
            />
            <va-button-toggle
              size="small"
              v-model="model"
              :options="options"
            />
            <va-button-toggle
              size="large"
              v-model="model"
              :options="options"
            />
          </td>
        </tr>
        <tr>
          <td>Default State Colors</td>
          <td>
            <va-button-toggle
              v-model="model"
              :options="options"
            />
            <va-button-toggle
              color="info"
              v-model="model"
              :options="options"
            />
            <va-button-toggle
              color="danger"
              v-model="model"
              :options="options"
            />
            <va-button-toggle
              color="warning"
              v-model="model"
              :options="options"
            />
            <va-button-toggle
              color="gray"
              v-model="model"
              :options="options"
            />
            <va-button-toggle
              color="dark"
              v-model="model"
              :options="options"
            />
          </td>
        </tr>
        <tr>
          <td>Outline State Colors</td>
          <td>
            <va-button-toggle
              v-model="model"
              border-color="primary"
              v-bind="VaButtonPresets.primary"
              :options="options"
            />
            <va-button-toggle
              border-color="dark"
              v-model="model"
              v-bind="VaButtonPresets.primary"
              :options="options"
            />
            <va-button-toggle
              border-color="gray"
              v-model="model"
              v-bind="VaButtonPresets.primary"
              :options="options"
            />
            <va-button-toggle
              border-color="warning"
              v-model="model"
              v-bind="VaButtonPresets.primary"
              :options="options"
            />
            <va-button-toggle
              border-color="danger"
              v-model="model"
              v-bind="VaButtonPresets.primary"
              :options="options"
            />
            <va-button-toggle
              border-color="info"
              v-model="model"
              v-bind="VaButtonPresets.primary"
              :options="options"
            />
          </td>
        </tr>
        <tr>
          <td>Plain State Colors</td>
          <td>
            <va-button-toggle
              v-model="model"
              v-bind="VaButtonPresets.plain"
              :options="options"
            />
            <va-button-toggle
              v-model="model"
              color="info"
              v-bind="VaButtonPresets.plain"
              :options="options"
            />
            <va-button-toggle
              v-model="model"
              color="warning"
              v-bind="VaButtonPresets.plain"
              :options="options"
            />
            <va-button-toggle
              v-model="model"
              color="gray"
              v-bind="VaButtonPresets.plain"
              :options="options"
            />
            <va-button-toggle
              v-model="model"
              color="dark"
              v-bind="VaButtonPresets.plain"
              :options="options"
            />
            <va-button-toggle
              v-model="model"
              color="danger"
              v-bind="VaButtonPresets.plain"
              :options="options"
            />
          </td>
        </tr>
        <tr>
          <td>Disabled State</td>
          <td>
            <va-button-toggle
              v-model="model"
              :options="options"
              disabled
            />
            <va-button-toggle
              v-model="model"
              border-color="primary"
              v-bind="VaButtonPresets.primary"
              :options="options"
              disabled
            />
            <va-button-toggle
              v-model="model"
              v-bind="VaButtonPresets.plain"
              :options="options"
              disabled
            />
          </td>
        </tr>
        <tr>
          <td>Toggle Colors</td>
          <td>
            <va-button-toggle
              v-model="model"
              toggle-color="warning"
              :options="options"
            />
            <va-button-toggle
              v-model="model"
              toggle-color="danger"
              color="info"
              :options="options"
            />
            <va-button-toggle
              v-model="model"
              border-color="primary"
              toggle-color="danger"
              :options="options"
              v-bind="VaButtonPresets.primary"
            />
            <va-button-toggle
              v-model="model"
              border-color="primary"
              toggle-color="success"
              color="info"
              :options="options"
              v-bind="VaButtonPresets.primary"
            />
            <va-button-toggle
              v-model="model"
              toggle-color="info"
              :options="options"
              v-bind="VaButtonPresets.plain"
            />
            <va-button-toggle
              v-model="model"
              toggle-color="dark"
              color="info"
              :options="options"
              v-bind="VaButtonPresets.plain"
            />
          </td>
        </tr>
        <tr>
          <td>Button Toggle With Icons</td>
          <td>
            <va-button-toggle
              v-model="model"
              :options="optionsWithIcons"
            />
            <va-button-toggle
              v-model="model"
              :options="optionsOnlyIcons"
            />
          </td>
        </tr>
      </table>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaButtonToggle } from './index'
import { VaButtonPresets } from '../va-button/VaButton'

export default {
  components: {
    VaButtonToggle,
  },
  data: () => ({
    VaButtonPresets,
    options: [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
      { label: 'Three', value: 'three' },
    ],
    optionsWithIcons: [
      { label: 'One', value: 'one', icon: 'home' },
      { label: 'Two', value: 'two', iconRight: 'home' },
      { label: 'Three', value: 'three', icon: 'home', iconRight: 'home' },
    ],
    optionsOnlyIcons: [
      { value: 'one', icon: 'home' },
      { value: 'two', iconRight: 'home' },
      { value: 'three', icon: 'home', iconRight: 'home' },
    ],
    model: 'two',
  }),
}
</script>

<style lang="scss">
.va-button-toggle {
  margin-bottom: 16px;
}
</style>
