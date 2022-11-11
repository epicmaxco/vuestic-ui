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
        Should ignore anchor click
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
      <va-dropdown
        :close-on-content-click="false"
      >
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
      <va-dropdown :keep-anchor-width="keepAnchorWidth">
        <template #anchor>
          <button>
            --- Anchor ---
          </button>
        </template>
        Same width as anchor
      </va-dropdown>
      <input type="checkbox" v-model="keepAnchorWidth" />
    </VbCard>

    <VbCard title="Anchor width with v-model true by default">
      <va-dropdown v-model="anchorDefaultValue" keep-anchor-width>
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
        <va-dropdown prevent-overflow>
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

    <VbCard title="DisableAttachment flag makes possible to render component inside initial parent">
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
        <va-dropdown disableAttachment>
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
      <va-dropdown
        :close-on-content-click=false
      >
        <template #anchor>
          <button>
            Click
          </button>
        </template>
        1
        <va-dropdown
          :close-on-content-click=false
        >
          <template #anchor>
            <button>
              Click
            </button>
          </template>
          2
          <va-dropdown
            :close-on-content-click=false
          >
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
          v-for="placement in possiblePositions"
          :key="placement"
          :placement="placement"
        >
          <template #anchor>
            <button
              style="width: 70px; height: 70px;"
            >
              {{ placement }}
            </button>
          </template>
          <span style="background-color: #222222; color: #babfc2;">{{ placement }}</span>
        </va-dropdown>
      </div>
    </VbCard>

    <VbCard title="Root">
      <va-dropdown attachElement=".VbPage__right-block" placement="left">
        <template #anchor>
          <button
            style="width: 70px; height: 70px;"
          >
            Stick to root
          </button>
        </template>
        <span style="background-color: #222222; color: #babfc2;">Content</span>
      </va-dropdown>
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
        <va-dropdown :offset="[40, 200]">
          <template #anchor>
            <button
              style="width: 70px; height: 70px;"
            >
              [40, 200]
            </button>
          </template>
          <span style="background-color: #222222; color: #babfc2;">Content</span>
        </va-dropdown>

        <va-dropdown placement="left" :offset="[0, 40]">
          <template #anchor>
            <button
              style="width: 70px; height: 70px;"
            >
              Left [0, 40]
            </button>
          </template>
          <span style="background-color: #222222; color: #babfc2;">Content</span>
        </va-dropdown>

        <va-dropdown placement="left" :offset="[40, 40]">
          <template #anchor>
            <button
              style="width: 70px; height: 70px;"
            >
              Left [40, 40]
            </button>
          </template>
          <span style="background-color: #222222; color: #babfc2;">Content</span>
        </va-dropdown>

        <va-dropdown placement="right" :offset="[0, 40]">
          <template #anchor>
            <button
              style="width: 70px; height: 70px;"
            >
              Right [0, 40]
            </button>
          </template>
          <span style="background-color: #222222; color: #babfc2;">Content</span>
        </va-dropdown>

        <va-dropdown placement="right" :offset="[40, 40]">
          <template #anchor>
            <button
              style="width: 70px; height: 70px;"
            >
              Right [40, 40]
            </button>
          </template>
          <span style="background-color: #222222; color: #babfc2;">Content</span>
        </va-dropdown>

        <va-dropdown placement="top" :offset="[40, 200]">
          <template #anchor>
            <button
              style="width: 70px; height: 70px;"
            >
              Top [40, 200]
            </button>
          </template>
          <span style="background-color: #222222; color: #babfc2;">Content</span>
        </va-dropdown>

        <va-dropdown placement="bottom-end" :offset="[0, 200]">
          <template #anchor>
            <button
              style="width: 70px; height: 70px;"
            >
              Bottom-end [0, 200]
            </button>
          </template>
          <span style="background-color: #222222; color: #babfc2;">Content</span>
        </va-dropdown>

        <va-dropdown placement="bottom-start" :offset="[0, 200]">
          <template #anchor>
            <button
              style="width: 70px; height: 70px;"
            >
              Bottom-start [0, 200]
            </button>
          </template>
          <span style="background-color: #222222; color: #babfc2;">Content</span>
        </va-dropdown>
      </div>
    </VbCard>

    <VbCard title="Dropdown Content">
      <div>
        <va-dropdown keep-anchor-width stateful>
          <template #anchor>
            <va-input placeholder="Auto complete" />
          </template>

          <va-dropdown-content>
            <p>Minsk</p>
            <p>Kyiv</p>
            <p>London</p>
          </va-dropdown-content>
        </va-dropdown>
        <va-dropdown stateful>
          <template #anchor>
            <va-input placeholder="Auto complete" />
          </template>

          <va-dropdown-content>
            <p>City</p>
            <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
          </va-dropdown-content>
        </va-dropdown>
      </div>
    </VbCard>

    <VbCard title="Ref Target">
      <div class="target" ref="target">
        <va-dropdown keep-anchor-width :target="target" placement="left" prevent-overflow>
          <template #anchor>
            Position left, but parent is target
          </template>

          <va-dropdown-content>
            <p>Minsk</p>
            <p>Kyiv</p>
            <p>London</p>
          </va-dropdown-content>
        </va-dropdown>
      </div>
    </VbCard>

    <VbCard title="Auto placement">
      <div class="target" ref="autoPlacementTarget">
        <va-dropdown :target="autoPlacementTarget" placement="top" auto-placement prevent-overflow>
          <template #anchor>
            <va-badge right text="vertical overflow">
              a
            </va-badge>
          </template>

          <va-dropdown-content>
            <p>Minsk</p>
            <p>Kyiv</p>
            <p>London</p>
          </va-dropdown-content>
        </va-dropdown>
        <va-dropdown :target="autoPlacementTarget" placement="left" auto-placement prevent-overflow>
          <template #anchor>
            <va-badge bottom text="horizontal overflow">
              rrrrrrrrrrrrrrrrrr
            </va-badge>
          </template>

          <va-dropdown-content>
            rrrrrrrrrrrrrrrrrrrr
          </va-dropdown-content>
        </va-dropdown>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import { ref } from 'vue'
import { VaDropdown, VaDropdownContent } from './'
import DropdownCloseButton from './__demo__/DropdownCloseButton'
import { VaInput } from '../va-input'
import { VaBadge } from '../va-badge'

export default {
  components: { DropdownCloseButton, VaDropdown, VaInput, VaDropdownContent, VaBadge },
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
        'right-start',
        'right-end',
        'left-start',
        'left-end',
      ],
      noTriggerValue: false,
      eventsValue: false,
      logEvents: false,
      redrawContentSize: 100,
      anchorDefaultValue: true,
      keepAnchorWidth: true,
    }
  },

  setup () {
    return {
      target: ref(null),
      autoPlacementTarget: ref(null),
    }
  },
}
</script>

<style lang="scss" scoped>
.target {
  width: 300px;
  background-color: #eeeeee;
  height: 100px;
}
</style>
