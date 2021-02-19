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
            <va-button
              icon="create"
            >
              Plus Button
            </va-button>
            <va-button
              icon-right="clear"
            >
              Dropdown button
            </va-button>
            <va-button
              icon="create"
              icon-right="clear"
            >
              Mixed button
            </va-button>
          </td>
        </tr>
        <tr>
          <td>Outline Buttons With icons</td>
          <td>
            <va-button
              outline
              icon="create"
            >
              Plus Button
            </va-button>
            <va-button
              outline
              icon-right="clear"
            >
              Dropdown button
            </va-button>
            <va-button
              outline
              icon="create"
              icon-right="clear"
            >
              Mixed button
            </va-button>
          </td>
        </tr>
        <tr>
          <td>Flat Buttons With icons</td>
          <td>
            <va-button
              flat
              icon="create"
            >
              Plus Button
            </va-button>
            <va-button
              flat
              icon-right="clear"
            >
              Dropdown button
            </va-button>
            <va-button
              flat
              icon="create"
              icon-right="clear"
            >
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
              icon-right="clear"
            >
              Dropdown button
            </va-button>
            <va-button
              flat
              size="large"
              icon="create"
              icon-right="clear"
            >
              Mixed button
            </va-button>
          </td>
        </tr>
        <tr>
          <td>Small Buttons With icons</td>
          <td>
            <va-button
              size="small"
              icon="create"
            >
              Plus Button
            </va-button>
            <va-button
              outline
              size="small"
              icon-right="clear"
            >
              Dropdown button
            </va-button>
            <va-button
              flat
              size="small"
              icon="create"
              icon-right="clear"
            >
              Mixed button
            </va-button>
          </td>
        </tr>
        <tr>
          <td>All Buttons Without Title</td>
          <td>
            <va-button icon="block" />
            <va-button
              size="large"
              icon="block"
            />
            <va-button
              size="small"
              icon="block"
            />
            <va-button
              outline
              icon="block"
            />
            <va-button
              outline
              size="large"
              icon="block"
            />
            <va-button
              outline
              size="small"
              icon="block"
            />
            <va-button
              flat
              icon="block"
            />
            <va-button
              flat
              size="large"
              icon="block"
            />
            <va-button
              flat
              size="small"
              icon="block"
            />
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
              :round="false"
              size="small"
              style="margin-right: 10px;"
            >
              Square Button
            </va-button>
            <va-button
              :round="false"
              size="medium"
              style="margin-left: 10px;"
            >
              Square Button
            </va-button>
            <va-button
              :round="false"
              size="large"
              style="margin-left: 10px;"
            >
              Square Button
            </va-button>
            <va-button
              :round="false"
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
      </table>
    </VbCard>
  </VbDemo>
</template>

<script>

import VaButton from './index'

export default {
  components: {
    VaButton,
  },
  data () {
    return {
      buttonLoading: true,
    }
  },
}
</script>
