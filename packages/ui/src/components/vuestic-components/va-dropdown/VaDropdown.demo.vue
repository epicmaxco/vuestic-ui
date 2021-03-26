<template>
  <VbDemo>
    <VbCard title="Click">
      <va-dropdown>
        <template #anchor>
          <button>
            Activator
          </button>
        </template>
        Dropdown text
      </va-dropdown>
    </VbCard>

    <VbCard title="Click outside won't close">
      <va-dropdown
        :close-on-click-outside="false"
      >
      <template #anchor>
        <button>
          Click
        </button>
      </template>
        Should ignore click outside
      </va-dropdown>
    </VbCard>

    <VbCard title="Anchor click won't close">
      <va-dropdown
        :close-on-anchor-click="false"
      >
      <template #anchor>
        <button>
          Click
        </button>
      </template>
        Should ignore click outside
      </va-dropdown>
    </VbCard>

    <VbCard title="Hover">
      <va-dropdown trigger="hover">
        <template #anchor>
          <button>
            Hover
          </button>
        </template>
        Dropdown text
      </va-dropdown>
    </VbCard>

    <VbCard title="Content not hoverable">
      <va-dropdown
        trigger="hover"
        :is-content-hoverable="false"
      >
      <template #anchor>
        <button>
          Hover
        </button>
      </template>
        Dropdown text
      </va-dropdown>
    </VbCard>

    <VbCard title="Doesn't redraw on content change">
      <va-dropdown>
        <template #anchor>
          <button>
            Click
          </button>
        </template>
        <button @click="redrawContentSize = redrawContentSize - 20">
          -
        </button>
        <button @click="redrawContentSize = redrawContentSize + 20">
          +
        </button>
        <div
          :style="{
            width: redrawContentSize + 'px',
            height: redrawContentSize + 'px',
            backgroundColor: '#14bb14',
          }"
        />
      </va-dropdown>
    </VbCard>

    <VbCard title="No trigger">
      <label>
        <input
          type="checkbox"
          v-model="noTriggerValue"
        > Show: {{ noTriggerValue }}
      </label>

      <va-dropdown
        trigger="none"
        :is-content-hoverable="false"
        :modelValue="noTriggerValue"
      >
      <template #anchor>
        <button>
          None
        </button>
      </template>
        Dropdown text
      </va-dropdown>
    </VbCard>

    <VbCard title="Events">
      <label>
        <input
          type="checkbox"
          v-model="logEvents"
        > Log events (spammy): {{ logEvents }}
      </label>
      <template v-if="logEvents">
        <label>
          <input
            type="checkbox"
            v-model="eventsValue"
          > Show: {{ eventsValue }}
        </label>

        <va-dropdown
          trigger="none"
          :is-content-hoverable="false"
          :modelValue="eventsValue"
          @clickOutside="$vb.log('Events: clickOutside')"
          @anchorClick="$vb.log('Events: anchorClick')"
        >
        <template #anchor>
          <button>
            Click
          </button>
        </template>
          Dropdown text
        </va-dropdown>
      </template>
    </VbCard>

    <VbCard title="Anchor width">
      <va-dropdown keep-anchor-width>
        <template #anchor>
          <button>
            ------- Anchor ------
          </button>
        </template>
        Same width as anchor
      </va-dropdown>
    </VbCard>

    <VbCard title="Disabled">
      <va-dropdown disabled>
        <template #anchor>
          <button>
            Click
          </button>
        </template>
        Dropdown text
      </va-dropdown>
      <va-dropdown
        disabled
        trigger="hover"
      >
      <template #anchor>
        <button>
          Hover
        </button>
      </template>
        Dropdown text
      </va-dropdown>
    </VbCard>

    <VbCard title="Ignores hidden overflow in container">
      <div style="width: 50px; height: 50px; overflow: hidden; border: 1px gray solid;">
        <va-dropdown>
          <template #anchor>
            <button>
              Click
            </button>
          </template>
          <div style="width: 150px; height: 150px; background: #4ae387;">
            text
          </div>
        </va-dropdown>
      </div>
    </VbCard>

    <VbCard title="Fixed flag makes possible to ignore even `position: relative`">
      <div style="width: 50px; height: 50px; overflow: hidden; position: relative; border: 1px gray solid;">
        <va-dropdown>
          <template #anchor>
            <button>
              Click
            </button>
          </template>
          <div style="width: 150px; height: 150px; background: #4ae387;">
            not fixed
          </div>
        </va-dropdown>
      </div>
      <div style="width: 50px; height: 50px; overflow: hidden; position: relative; border: 1px gray solid;">
        <va-dropdown fixed>
          <template #anchor>
            <button>
              Click
            </button>
          </template>
          <div style="width: 150px; height: 150px; background: #4ae387;">
            fixed
          </div>
        </va-dropdown>
      </div>
    </VbCard>

    <VbCard title="Can be closed from another component in context">
      <va-dropdown>
        <template #anchor>
          <button>
            Click
          </button>
        </template>
        <DropdownCloseButton />
      </va-dropdown>
    </VbCard>

    <VbCard title="Nesting 3x">
      <va-dropdown debug-id="1">
        <template #anchor>
          <button>
            Click
          </button>
        </template>
        1
        <va-dropdown debug-id="2">
          <template #anchor>
            <button>
              Click
            </button>
          </template>
          2
          <va-dropdown debug-id="3">
            <template #anchor>
              <button>
                Click
              </button>
            </template>
            3
          </va-dropdown>
        </va-dropdown>
      </va-dropdown>
    </VbCard>

    <VbCard title="Placement">
      <div style="display: flex; align-content: center; flex-direction: column; padding: 0 100px;">
        <va-dropdown
          v-for="position in possiblePositions"
          :key="position"
          :position="position"
        >
          <template #anchor>
            <button
              style="width: 70px; height: 70px;"
            >
              {{ position }}
            </button>
          </template>
          <span style="background-color: #222222; color: #babfc2;">{{ position }}</span>
        </va-dropdown>
      </div>
    </VbCard>

    <VbCard title="Offset">
      <div>
        <va-dropdown :offset="40">
          <template #anchor>
            <button
              style="width: 70px; height: 70px;"
            >
              40
            </button>
          </template>
          <span style="background-color: #222222; color: #babfc2;">Content</span>
        </va-dropdown>
        <va-dropdown :offset="[40, 40]">
          <template #anchor>
            <button
              style="width: 70px; height: 70px;"
            >
              [40, 40]
            </button>
          </template>
          <span style="background-color: #222222; color: #babfc2;">Content</span>
        </va-dropdown>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaDropdown from './index'
import DropdownCloseButton from './__demo__/DropdownCloseButton'

export default {
  components: { DropdownCloseButton, VaDropdown },
  data () {
    return {
      possiblePositions: [
        'auto',
        'top',
        'right',
        'bottom',
        'left',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
      ],
      noTriggerValue: false,
      eventsValue: false,
      logEvents: false,
      redrawContentSize: 100,
    }
  },
}
</script>
