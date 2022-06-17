<template>
  <VbDemo>
    <VbCard class="va-button-demo">
      <table class="table table-bordered">
        <tr>
          <td>Types</td>
          <td>
            <va-config :components="{ VaButton: {} }">
              <va-button>Accent (default)</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
              <va-button>Primary</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.secondary } }">
              <va-button>Secondary</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.plain } }">
              <va-button>Plain</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.plainOpacity } }">
              <va-button>Plain with opacity</va-button>
            </va-config>
          </td>
        </tr>

        <tr>
          <td>Small size</td>
          <td>
            <va-config :components="{ VaButton: { size: 'small' } }">
              <va-button>Accent (default)</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.primary, size: 'small' } }">
              <va-button>Primary</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.secondary, size: 'small' } }">
              <va-button>Secondary</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.plain, size: 'small' } }">
              <va-button>Plain</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.plainOpacity, size: 'small' } }">
              <va-button>Plain with opacity</va-button>
            </va-config>
          </td>
        </tr>
        <tr>
          <td>With icons</td>
          <td>
            <va-config :components="{ VaButton: {} }">
              <va-button icon="create">Edit Button</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.secondary } }">
              <va-button icon="gavel" iconRight="clear">Mixed Button</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.plainOpacity } }">
              <va-button icon="gavel">Plain with icon</va-button>
            </va-config>
            <va-config :components="{ VaButton: { size: 'small' } }">
              <va-button icon="create">Small Edit Button</va-button>
            </va-config>
            <va-config :components="{ VaButton: {} }">
              <va-button icon="gavel" icon-color="warning">Mixed Colors</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
              <va-button icon-right="clear">Dropdown Button</va-button>
            </va-config>
          </td>
        </tr>
        <tr>
          <td>Button Colors</td>
          <td>
            <va-config :components="{ VaButton: {} }">
              <va-button color="info">Info</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
              <va-button color="danger">Danger</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.secondary } }">
              <va-button color="warning">Warning</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.plain } }">
              <va-button color="gray">Gray</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.plainOpacity } }">
              <va-button color="dark">Dark</va-button>
            </va-config>
          </td>
        </tr>
        <tr>
          <td>Disabled state</td>
          <td>
            <va-config :components="{ VaButton: {} }">
              <va-button disabled>Accent (default)</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
              <va-button disabled>Primary</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.secondary } }">
              <va-button disabled>Secondary</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.plain } }">
              <va-button disabled>Plain</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.plainOpacity } }">
              <va-button disabled>Plain with opacity</va-button>
            </va-config>
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
            <va-config :components="{ VaButton: {}, VaIcon: { color: '#f00' } }">
              <va-button color="danger" space-between-items>
                <va-icon name="gavel" color="white" />
                Colored icons
                <va-icon name="shield" color="white" />
              </va-button>
              <va-button color="warning" plain space-between-items>
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
            <va-config :components="{ VaButton: { ...vaButtonPresets.secondary, borderColor: 'primary' } }">
              <va-button icon="create">Secondary</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.secondary, borderColor: 'primary' } }">
              <va-button iconRight="clear">Secondary</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.secondary, borderColor: 'primary' } }">
              <va-button icon="create" iconRight="clear">Secondary</va-button>
            </va-config>
          </td>
        </tr>
        <tr>
          <td>Icons-only Buttons</td>
          <td>
            <va-config :components="{ VaButton: {} }">
              <va-button icon="block" />
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
              <va-button icon="block" />
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.secondary } }">
              <va-button icon="block" />
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.plain } }">
              <va-button icon="block" />
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.plainOpacity } }">
              <va-button icon="block" />
            </va-config>
          </td>
        </tr>
        <tr>
          <td>
            Buttons with loading status
          </td>
          <td>
            <va-config :components="{ VaButton: {} }">
              <va-button :loading="buttonLoading" @click="buttonLoading = true">Start loading</va-button>
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
              <va-button :loading="buttonLoading" @click="buttonLoading = true">Start loading</va-button>
            </va-config>
            <va-config :components="{ VaButton: {} }">
              <va-button @click="buttonLoading = false">Stop loading</va-button>
            </va-config>
          </td>
        </tr>
        <tr>
          <td>
            Round button
          </td>
          <td>
            <va-config :components="{ VaButton: {} }">
              <va-button round icon="block" />
            </va-config>
            <va-config :components="{ VaButton: { ...vaButtonPresets.primary } }">
              <va-button round icon="block" />
            </va-config>
          </td>
        </tr>

        <tr>
          <td>
            Space between items
          </td>
          <td>
            <va-config :components="{ VaButton: {} }">
              <va-button spaceBetweenItems>
                <va-icon name="block" />
                <va-icon name="block" />
                <va-icon name="block" />
              </va-button>
            </va-config>
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

export default {
  components: { VaButton, VaIcon, VaConfig },
  data: () => ({
    // temp
    vaButtonPresets: {
      primary: {
        backgroundOpacity: 0.1,
        hoverBehaviour: 'opacity',
        hoverOpacity: 0.07,
        pressedBehaviour: 'opacity',
        pressedOpacity: 0.13,
      },
      secondary: {
        backgroundOpacity: 0,
        hoverBehaviour: 'opacity',
        hoverOpacity: 0.07,
        pressedBehaviour: 'opacity',
        pressedOpacity: 0.13,
      },
      plain: {
        plain: true,
        hoverBehaviour: 'mask',
        hoverOpacity: 0.15,
        pressedBehaviour: 'mask',
        pressedOpacity: 0.13,
      },
      plainOpacity: {
        plain: true,
        textOpacity: 0.6,
        hoverBehaviour: 'opacity',
        hoverOpacity: 1,
        pressedBehaviour: 'opacity',
        pressedOpacity: 0.9,
      },
    },
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
