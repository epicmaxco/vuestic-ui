<template>
  <VbDemo>
    <VbCard title="empty">
      <va-button />
    </VbCard>

    <VbCard>
      <table class="table table-bordered">
        <tr>
          <th>Description</th>
          <th>Vuestic Button</th>
        </tr>
        <tr>
          <td>Types</td>
          <td>
            <va-button outline>
              Outline Button
            </va-button>
            <va-button flat>
              Flat Button
            </va-button>
          </td>
        </tr>
        <tr>
          <td>Sizes</td>
          <td>
            <va-button>
              Default Button
            </va-button>
            <va-button size="large">
              Large Button
            </va-button>
            <va-button size="small">
              Small Button
            </va-button>
            <va-button outline>
              Default Button
            </va-button>
            <va-button
              size="large"
              outline
            >
              Large Button
            </va-button>
            <va-button
              size="small"
              outline
            >
              Small Button
            </va-button>
            <va-button flat>
              Default Button
            </va-button>
            <va-button
              size="large"
              flat
            >
              Large Button
            </va-button>
            <va-button
              size="small"
              flat
            >
              Small Button
            </va-button>
          </td>
        </tr>
        <tr>
          <td>Primary Button Colors</td>
          <td>
            <div>
              <va-button>
                Success Button
              </va-button>
              <va-button color="info">
                Info Button
              </va-button>
              <va-button color="danger">
                Danger Button
              </va-button>
              <va-button color="warning">
                Warning Button
              </va-button>
              <va-button color="gray">
                Gray Button
              </va-button>
              <va-button color="dark">
                Dark Button
              </va-button>
            </div>
          </td>
        </tr>
        <tr>
          <td>Outline Button Colors</td>
          <td>
            <div>
              <va-button outline>
                Success Button
              </va-button>
              <va-button
                outline
                color="info"
              >
                Info Button
              </va-button>
              <va-button
                outline
                color="danger"
              >
                Danger Button
              </va-button>
              <va-button
                outline
                color="warning"
              >
                Warning Button
              </va-button>
              <va-button
                outline
                color="gray"
              >
                Gray Button
              </va-button>
              <va-button
                outline
                color="dark"
              >
                Dark Button
              </va-button>
            </div>
          </td>
        </tr>
        <tr>
          <td>Flat Button Colors</td>
          <td>
            <div>
              <va-button flat>
                Success Button
              </va-button>
              <va-button
                flat
                color="info"
              >
                Info Button
              </va-button>
              <va-button
                flat
                color="danger"
              >
                Danger Button
              </va-button>
              <va-button
                flat
                color="warning"
              >
                Warning Button
              </va-button>
              <va-button
                flat
                color="gray"
              >
                Gray Button
              </va-button>
              <va-button
                flat
                color="dark"
              >
                Dark Button
              </va-button>
            </div>
          </td>
        </tr>
        <tr>
          <td>Disabled state</td>
          <td>
            <va-button disabled>
              Default Button
            </va-button>
            <va-button
              disabled
              outline
            >
              Outline Button
            </va-button>
            <va-button
              disabled
              flat
            >
              Flat Button
            </va-button>
          </td>
        </tr>
        <tr>
          <td>Button tags</td>
          <td>
            <va-button>
              Default Button
            </va-button>
            <va-button
              href="http://epic-spinners.epicmax.co/"
            >
              A-link Button
            </va-button>
            <va-button
              to="/demo"
            >
              Router-link Button
            </va-button>
          </td>
        </tr>
        <tr>
          <td>Primary Buttons With icons</td>
          <td>
            <va-button icon="create">
              Plus Button
            </va-button>
            <va-button iconRight="clear">
              Dropdown button
            </va-button>
            <va-button icon="create" iconRight="clear">
              Mixed button
            </va-button>
            <va-button icon="palette" color="warning" text-color="danger" />
            <va-button icon-right="create" color="warning" text-color="danger" />
            <va-button icon="palette" icon-right="create" color="warning" text-color="#45ffaa" />
          </td>
        </tr>
        <tr>
          <td>Buttons with icons (As slots with config)</td>
          <td>
            <va-config :components="{ VaIcon: { color: '#f00' } }">
              <va-button color="warning" space-between-items>
                <va-icon name="gavel" color="white" />
                Colored icons
                <va-icon name="shield" color="white" />
              </va-button>

              <va-button color="warning" flat space-between-items>
                <va-icon name="gavel" color="warning" />
                Colored icons
                <va-icon name="shield" color="warning" />
              </va-button>

              <va-button color="warning" outline space-between-items>
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
            <va-button outline icon="create">
              Plus Button
            </va-button>
            <va-button outline iconRight="clear">
              Dropdown button
            </va-button>
            <va-button outline icon="create" iconRight="clear">
              Mixed button
            </va-button>
          </td>
        </tr>
        <tr>
          <td>Flat Buttons With icons</td>
          <td>
            <va-button flat icon="create">
              Plus Button
            </va-button>
            <va-button flat iconRight="clear">
              Dropdown button
            </va-button>
            <va-button flat icon="create" iconRight="clear">
              Mixed button
            </va-button>
          </td>
        </tr>
        <tr>
          <td>Large Buttons With icons</td>
          <td>
            <va-button
              size="large"
              icon="create"
            >
              Plus Button
            </va-button>
            <va-button
              outline
              size="large"
              iconRight="clear"
            >
              Dropdown button
            </va-button>
            <va-button
              flat
              size="large"
              icon="create" iconRight="clear"
            >
              Mixed button
            </va-button>
          </td>
        </tr>
        <tr>
          <td>Small Buttons With icons</td>
          <td>
            <va-button size="small" icon="create">
              Plus Button
            </va-button>
            <va-button outline size="small" iconRight="clear">
              Dropdown button
            </va-button>
            <va-button flat size="small" icon="create" iconRight="clear">
              Mixed button
            </va-button>
          </td>
        </tr>
        <tr>
          <td>All Buttons Without Title</td>
          <td>
            <va-button icon="block" />
            <va-button size="large" icon="block" />
            <va-button size="small" icon="block" />
            <va-button outline icon="block" />
            <va-button outline size="large" icon="block" />
            <va-button outline size="small" icon="block" />
            <va-button flat icon="block" />
            <va-button flat size="large" icon="block" />
            <va-button flat size="small" icon="block" />
          </td>
        </tr>
        <tr>
          <td>
            Buttons with loading status
          </td>
          <td>
            <va-button
              :loading="buttonLoading"
              @click="buttonLoading = true"
              size="small"
            >
              Start loading
            </va-button>
            <va-button
              :loading="buttonLoading"
              @click="buttonLoading = true"
              size="medium"
            >
              Start loading
            </va-button>
            <va-button
              :loading="buttonLoading"
              @click="buttonLoading = true"
              size="large"
            >
              Start loading
            </va-button>
            <va-button
              @click="buttonLoading = false"
            >
              Stop loading
            </va-button>
          </td>
        </tr>
        <tr>
          <td>
            Block button (full width)
          </td>
          <td>
            <va-button block>
              Block Button
            </va-button>
          </td>
        </tr>
        <tr>
          <td>
            Square button
          </td>
          <td style="padding-top: 10px;">
            <va-button
              :rounded="false"
              size="small"
              style="margin-right: 10px;"
            >
              Square Button
            </va-button>
            <va-button
              :rounded="false"
              size="medium"
              style="margin-left: 10px;"
            >
              Square Button
            </va-button>
            <va-button
              :rounded="false"
              size="large"
              style="margin-left: 10px;"
            >
              Square Button
            </va-button>
            <va-button
              :rounded="false"
              size="medium"
              outline
              style="margin-left: 10px;"
            >
              Square Button
            </va-button>
          </td>
        </tr>

        <tr>
          <td>
            Round button
          </td>
          <td style="padding-top: 10px;">
            <va-button
              style="margin-right: 10px;"
              round
            >
            </va-button>
          </td>
        </tr>

        <tr>
          <td>
            Space between items
          </td>
          <td style="padding-top: 10px;">
            <va-button
              style="margin-right: 10px;"
              spaceBetweenItems
            >
              Item
            </va-button>
            <va-button
              style="margin-right: 10px;"
              spaceBetweenItems
            >
              Item
            </va-button>
          </td>
        </tr>

        <tr>
          <td>
            Public methods (focus, blur)
          </td>
          <td style="padding-top: 10px;">
            <va-button
              style="margin-right: 10px;"
              @click="$refs.testButton.focus()"
            >
              Focus right button
            </va-button>
            <va-button
              size="large"
              style="margin-right: 10px;"
              ref="testButton"
            >
              Button
            </va-button>
            <va-button
              style="margin-right: 10px;"
              @click="$refs.testButton.blur()"
            >
              Blur left button
            </va-button>
          </td>
        </tr>

        <tr>
          <td>
            Multiline text
          </td>
          <td style="padding-top: 10px;">
            <va-button style="width: 150px;">
              Default Button with long text
            </va-button>
            <va-button size="large" style="width: 150px;">
              Large Button with long text
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
import VaIcon from '../va-icon'
import VaConfig from '../va-config'
import VaButton from './index'

export default {
  components: {
    VaButton, VaIcon, VaConfig,
  },
  data () {
    return {
      buttonLoading: true,
    }
  },
}
</script>
