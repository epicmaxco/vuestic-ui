<template>
  <VbDemo>
    <VbCard class="va-button-demo">
      <table class="table table-bordered">
        <tr>
          <td>Types</td>
          <td>
            <va-button>Accent (default)</va-button>
            <va-button v-bind="VaButtonPresets.primary">Primary</va-button>
            <va-button v-bind="VaButtonPresets.secondary">Secondary</va-button>
            <va-button v-bind="VaButtonPresets.plain">Plain</va-button>
            <va-button v-bind="VaButtonPresets.plainOpacity">Plain with opacity</va-button>
          </td>
        </tr>

        <tr>
          <td>Small size</td>
          <td>
            <va-button size="small">Accent (default)</va-button>
            <va-button size="small" v-bind="VaButtonPresets.primary">Primary</va-button>
            <va-button size="small" v-bind="VaButtonPresets.secondary">Secondary</va-button>
            <va-button size="small" v-bind="VaButtonPresets.plain">Plain</va-button>
            <va-button size="small" v-bind="VaButtonPresets.plainOpacity">Plain with opacity</va-button>
          </td>
        </tr>

        <tr>
          <td>Large size</td>
          <td>
            <va-button size="large">Accent (default)</va-button>
            <va-button size="large" v-bind="VaButtonPresets.primary">Primary</va-button>
            <va-button size="large" v-bind="VaButtonPresets.secondary">Secondary</va-button>
            <va-button size="large" v-bind="VaButtonPresets.plain">Plain</va-button>
            <va-button size="large" v-bind="VaButtonPresets.plainOpacity">Plain with opacity</va-button>
          </td>
        </tr>

        <tr>
          <td>With icons</td>
          <td>
            <va-button icon="create">Edit Button</va-button>
            <va-button v-bind="VaButtonPresets.secondary" icon="gavel" iconRight="clear">Mixed Button</va-button>
            <va-button v-bind="VaButtonPresets.plainOpacity" icon="gavel">Plain with icon</va-button>
            <va-button v-bind="VaButtonPresets.primary" size="small" icon="create">Small Edit Button</va-button>
            <va-button v-bind="VaButtonPresets.primary" icon="gavel" icon-color="warning">Mixed Colors</va-button>
            <va-button v-bind="VaButtonPresets.primary" icon-right="clear">Dropdown Button</va-button>
          </td>
        </tr>
        <tr>
          <td>Button Colors</td>
          <td>
            <va-button color="info">Info</va-button>
            <va-button v-bind="VaButtonPresets.primary" color="danger">Danger</va-button>
            <va-button v-bind="VaButtonPresets.secondary" color="warning">Warning</va-button>
            <va-button v-bind="VaButtonPresets.plain" color="gray">Gray</va-button>
            <va-button v-bind="VaButtonPresets.plainOpacity" color="dark">Dark</va-button>
          </td>
        </tr>
        <tr>
          <td>Disabled state</td>
          <td>
            <va-button disabled>Accent (default)</va-button>
            <va-button v-bind="VaButtonPresets.primary" disabled>Primary</va-button>
            <va-button v-bind="VaButtonPresets.secondary" disabled>Secondary</va-button>
            <va-button v-bind="VaButtonPresets.plain" disabled>Plain</va-button>
            <va-button v-bind="VaButtonPresets.plainOpacity" disabled>Plain with opacity</va-button>
          </td>
        </tr>
        <tr>
          <td>Button tags</td>
          <td>
            <va-button>Default</va-button>
            <va-button href="http://epic-spinners.epicmax.co/">A-link Button</va-button>
            <va-button to="/demo">Router-link Button</va-button>
          </td>
        </tr>
        <tr>
          <td>Buttons with icons (as slots with config)</td>
          <td>
            <va-config :components="{ VaIcon: { color: '#f00' } }">
              <va-button color="danger">
                <va-icon name="gavel" color="white" />
                Colored icons
                <va-icon name="shield" color="white" />
              </va-button>
              <va-button v-bind="VaButtonPresets.plain" color="warning">
                <va-icon name="gavel" color="warning" />
                Colored icons
                <va-icon name="shield" color="warning" />
              </va-button>
            </va-config>
          </td>
        </tr>
        <tr>
          <td>Outline Buttons With icons</td>
          <td>
            <va-button border-color="primary" v-bind="VaButtonPresets.secondary" icon="create">Secondary</va-button>
            <va-button border-color="primary" v-bind="VaButtonPresets.secondary" iconRight="clear">Secondary</va-button>
            <va-button border-color="primary" v-bind="VaButtonPresets.secondary" icon="create" iconRight="clear">
              Secondary
            </va-button>
          </td>
        </tr>
        <tr>
          <td>Icons-only Buttons</td>
          <td>
            <va-button icon="block" />
            <va-button v-bind="VaButtonPresets.primary" icon="block" />
            <va-button v-bind="VaButtonPresets.secondary" icon="block" />
            <va-button v-bind="VaButtonPresets.plain" icon="block" />
            <va-button v-bind="VaButtonPresets.plainOpacity" icon="block" />
          </td>
        </tr>
        <tr>
          <td>
            Buttons with loading status
          </td>
          <td>
            <va-button :loading="buttonLoading" @click="buttonLoading = true">Start loading</va-button>
            <va-button v-bind="VaButtonPresets.primary" :loading="buttonLoading" @click="buttonLoading = true">Start
              loading
            </va-button>
            <va-button @click="buttonLoading = false">Stop loading</va-button>
          </td>
        </tr>
        <tr>
          <td>
            Round button
          </td>
          <td>
            <va-button round icon="block" />
            <va-button v-bind="VaButtonPresets.primary" round icon="block" />
          </td>
        </tr>

        <tr>
          <td>
            Public methods (focus, blur)
          </td>
          <td>
            <va-button @click="$refs.testButton.focus()">Focus Main Button</va-button>
            <va-button ref="testButton">Main Button</va-button>
            <va-button @click="$refs.testButton.blur()">Blur Main Button</va-button>
          </td>
        </tr>
        <tr>
          <td>
            Multiline text
          </td>
          <td>
            <va-button style="width: 150px;">
              Default Button with long text
            </va-button>
            <va-button size="small" style="width: 150px;">
              Small Button with long text
            </va-button>
          </td>
        </tr>
      </table>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaIcon } from '../va-icon'
import { VaConfig } from '../va-config'
import { VaButton } from './index'
import { VaButtonPresets } from './VaButton'

export default {
  components: { VaButton, VaIcon, VaConfig },
  data: () => ({
    VaButtonPresets,
    buttonLoading: true,
  }),
}
</script>

<style lang="scss">
.va-button-demo {
  & .va-button {
    margin-right: 16px;
  }

  & td {
    padding-top: 16px;
    display: flex;
    align-items: center;
  }
}
</style>
