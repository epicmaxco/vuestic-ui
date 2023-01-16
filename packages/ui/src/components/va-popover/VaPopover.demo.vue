<template>
  <VbDemo>
    <VbCard>
      <table class="table">
        <tr>
          <th>Description</th>
          <th>VaPopover</th>
        </tr>
        <tr>
          <td>Placement<br> (default - bottom)</td>
          <td>
            <va-popover
              message="Placement Bottom"
              class="mr-6"
            >
              <va-button>Bottom</va-button>
            </va-popover>
            <va-popover
              placement="top"
              message="Placement Top"
              class="mr-6"
            >
              <va-button>Top</va-button>
            </va-popover>
            <va-popover
              placement="left"
              message="Placement Left"
              class="mr-6"
            >
              <va-button>Left</va-button>
            </va-popover>

            <va-popover
              placement="right"
              message="Placement Right"
            >
              <va-button>Right</va-button>
            </va-popover>
          </td>
        </tr>
        <tr>
          <td>With icon</td>
          <td>
            <va-popover
              placement="right"
              icon="error"
              message="Popover with icon"
              class="mr-6"
            >
              <va-button>Hover me</va-button>
            </va-popover>
          </td>
        </tr>
        <tr>
          <td>With Title</td>
          <td>
            <va-popover
              placement="right"
              title="Popover title"
              message="Popover text"
              class="mr-6"
            >
              <va-button>Hover me</va-button>
            </va-popover>
          </td>
        </tr>
        <tr>
          <td>With Icon & Title</td>
          <td>
            <va-popover
              placement="right"
              title="Popover title"
              icon="error"
              message="Popover dummy text"
              class="mr-6"
            >
              <va-button>Hover me</va-button>
            </va-popover>
          </td>
        </tr>
        <tr>
          <td>Background</td>
          <td>
            <va-popover
              placement="right"
              message="Popover dummy text"
              color="warning"
              class="mr-6"
            >
              <va-button color="warning">
                Hover me
              </va-button>
            </va-popover>

            <va-popover
              placement="right"
              message="Popover dummy text"
              color="info"
              class="mr-6"
            >
              <va-button color="info">
                Hover me
              </va-button>
            </va-popover>

            <va-popover
              placement="right"
              message="Popover dummy text"
              color="danger"
              class="mr-6"
            >
              <va-button color="danger">
                Hover me
              </va-button>
            </va-popover>

            <va-popover
              placement="right"
              message="Popover dummy text"
              color="textPrimary"
              class="mr-6"
            >
              <va-button color="textPrimary">
                Hover me
              </va-button>
            </va-popover>

            <va-popover
              placement="right"
              message="Popover dummy text"
              color="secondary"
              class="mr-6"
            >
              <va-button color="secondary">
                Hover me
              </va-button>
            </va-popover>

            <va-popover
              placement="right"
              message="Popover dummy text"
            >
              <va-button>Hover me</va-button>
            </va-popover>
          </td>
        </tr>
        <tr>
          <td>Trigger - click</td>
          <td>
            <va-popover
              placement="right"
              message="Popover dummy text"
              trigger="click"
            >
              <va-button>Click me</va-button>
            </va-popover>
          </td>
        </tr>
        <tr>
          <td>Default open</td>
          <td>
            <va-popover
              :model-value="true"
              :auto-hide="false"
              trigger="click"
              placement="right"
              message="Popover dummy text"
            >
              <va-button>Hover me</va-button>
            </va-popover>
          </td>
        </tr>
        <tr>
          <td>Slots</td>
          <td>
            <va-popover trigger="click">
              <va-button>Click me</va-button>
              <template #icon>
                <va-button icon="create" size="small" />
              </template>
              <template #title>
                <i>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</i>
              </template>
              <template #body>
                <p>Suspendisse pharetra risus magna, in luctus turpis mollis non.</p>
                <p>Donec est nulla, imperdiet id dapibus sed, consequat eget odio.</p>
              </template>
            </va-popover>
          </td>
        </tr>
      </table>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaPopover, VaButton } from '../index'

export default {
  components: { VaPopover, VaButton },
}
</script>

<style scoped>
.table {
  border-collapse: separate;
  border-spacing: 1rem;
}
</style>
