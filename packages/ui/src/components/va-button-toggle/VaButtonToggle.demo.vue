<template>
  <VbDemo class="va-button-toggle-demo">
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
              preset="primary"
              :options="options"
            />
            <va-button-toggle
              v-model="model"
              border-color="primary"
              preset="primary"
              :options="options"
            />
            <va-button-toggle
              v-model="model"
              preset="secondary"
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
              color="secondary"
              v-model="model"
              :options="options"
            />
            <va-button-toggle
              color="textPrimary"
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
              preset="primary"
              :options="options"
            />
            <va-button-toggle
              border-color="textPrimary"
              v-model="model"
              preset="primary"
              :options="options"
            />
            <va-button-toggle
              border-color="secondary"
              v-model="model"
              preset="primary"
              :options="options"
            />
            <va-button-toggle
              border-color="warning"
              v-model="model"
              preset="primary"
              :options="options"
            />
            <va-button-toggle
              border-color="danger"
              v-model="model"
              preset="primary"
              :options="options"
            />
            <va-button-toggle
              border-color="info"
              v-model="model"
              preset="primary"
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
              preset="primary"
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
              preset="primary"
            />
            <va-button-toggle
              v-model="model"
              border-color="primary"
              toggle-color="success"
              color="info"
              :options="options"
              preset="primary"
            />
            <va-button-toggle
              v-model="model"
              toggle-color="info"
              :options="options"
              preset="plain"
            />
            <va-button-toggle
              v-model="model"
              toggle-color="textPrimary"
              color="info"
              :options="options"
              preset="plain"
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

export default {
  components: {
    VaButtonToggle,
  },
  data: () => ({
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
.va-button-toggle-demo {
  .va-button-group {
    margin-bottom: 16px;
  }
}
</style>
