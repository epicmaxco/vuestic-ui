<template>
  <Story title="va-badge">
    <Variant title="default">
      <va-badge text="Paid" />
      <va-badge
        text="Success theme color"
        color="success"
      />
    </Variant>
    <Variant title="text color">
      <va-badge text="Default" />
      <va-badge
        text="Dark theme color"
        text-color="textPrimary"
      />
    </Variant>
    <Variant title="transparent">
      Dot:
      <va-badge
        dot
        transparent
      />
      <br>
      Default:
      <va-badge
        text="label"
        transparent
      />
      <br>
      <br>
      Slotted:
      <va-badge
        text="label"
        transparent
      >
        content
      </va-badge>
      <br>
    </Variant>
    <Variant title="slotted label">
      <va-badge text="I am Label">
        <template #text>
          I am Badge
        </template>
        label + slotted badge
      </va-badge>
      <br><br>
      <va-badge text="I am Label">
        <template #text>
          <va-icon name="face" />
        </template>
        slotted icon
      </va-badge>
      <br><br>
      <va-badge text="I am Label">
        <template #text>
          <va-icon name="face" />
        </template>
        <va-icon name="face" />
      </va-badge>
      <br><br>
    </Variant>
    <Variant title="multiline badges" style="width: 200px;">
      <div>
        Without multi-line prop:
        <va-badge
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        />
      </div>
      <br>
      <div>
        With multi-line prop
        <va-badge
          multi-line
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        />
      </div>
    </Variant>
    <Variant title="overlapped badges">
      <div style="padding: 0 5rem; display: flex; flex-direction: column; gap: 1.5rem;">
        <va-badge
          v-for="placement in placementsPositionsWithAliases"
          :key="placement"
          :text="placement"
          :placement="placement"
          overlap
        >
          Float at
        </va-badge>
      </div>
    </Variant>
    <Variant title="overlapped badges with dot">
      <div style="padding: 0 5rem; display: flex; flex-direction: column; gap: 1.5rem;">
        <va-badge
          v-for="placement in placementsPositionsWithAliases"
          :key="placement"
          :placement="placement"
          overlap
          dot
        >
          <div style="background-color: wheat;">{{ placement }}</div>
        </va-badge>
      </div>
    </Variant>
    <Variant title="floated badges">
      <div style="padding: 0 5rem; display: flex; flex-direction: column; gap: 1.5rem;">
        <va-badge
          v-for="placement in placementsPositionsWithAliases"
          :key="placement"
          :text="placement"
          :placement="placement"
        >
          Float at
        </va-badge>
      </div>
    </Variant>
    <Variant title="floated badges with huge offset">
      <div style="padding: 0 5rem; display: flex; flex-direction: column; gap: 1.5rem;">
        <va-badge
          v-for="placement in placementsPositionsWithAliases"
          :key="placement"
          :text="placement"
          :placement="placement"
          offset="1rem"
        >
          Float at
        </va-badge>
      </div>
    </Variant>
    <Variant title="dotted badges">
      <va-badge
        dot
        text="Regular"
      >
        Regular
      </va-badge>
      <br><br>
      <va-badge
        dot
        text="Bottom + Start"
        placement="bottom-start"
      >
        Bottom + Start
      </va-badge>
      <br><br>
      <va-badge
        dot
        text="Left + End"
        placement="left-end"
      >
        Left + End
      </va-badge>
      <br><br>
      <va-badge
        dot
        text="Bottom + Start"
        placement="bottom-start"
      >
        Bottom + Start
      </va-badge>
      <br><br>
      <va-badge
        dot
        text="Regular"
      >
        <va-icon name="face" />
      </va-badge>
      <br><br>
    </Variant>
    <Variant title="VisibleEmpty">
      Empty:
      <va-badge />
      <br>
      Empty dot:
      <va-badge dot />
      <br>
      Empty with visibleEmpty prop:
      <va-badge visible-empty />
      <br>
      Dot with visibleEmpty prop:
      <va-badge
        visible-empty
        dot
      />
      <br>
      Not empty:
      <va-badge text="not empty" />
      <br>
    </Variant>

    <Variant title="transitions">
      <table>
        <tr>
          <td>
            Label: <input v-model="label"><br>
            Dot: <input
            type="checkbox"
            v-model="dot"
          ><br>
            Transparent: <input
            type="checkbox"
            v-model="transparent"
          ><br>
            VisibleEmpty: <input
            type="checkbox"
            v-model="visibleEmpty"
          ><br>
            Overlap: <input
            type="checkbox"
            v-model="overlap"
          ><br>
          </td>
          <td>
            <va-badge
              :transparent="transparent"
              :overlap="overlap"
              :text="label"
              :dot="dot"
              :visible-empty="visibleEmpty"
            >
              Default
            </va-badge>
            <br>
            <va-badge
              :transparent="transparent"
              :overlap="overlap"
              :text="label"
              :dot="dot"
              :visible-empty="visibleEmpty"
            >
              <div style="width: 100px; height: 100px; border: 2px solid green;">
                Custom<br>size
              </div>
            </va-badge>
          </td>
        </tr>
      </table>
    </Variant>

    <Variant title="Interaction with components">
      <va-button>
        <va-badge text="10+">
          Button
        </va-badge>
      </va-button>
      <br>
      <br>
      <va-badge
        text="10+"
        overlap
      >
        <va-card>
          <va-card-content>
            Overlap badge outside card
          </va-card-content>
        </va-card>
      </va-badge>
      <br>
      <br>
    </Variant>
    <Variant title="avatar">
      <va-badge-avatar />
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { placementsPositionsWithAliases } from '../../../composables/index'

import { VaBadge, VaButton, VaCard, VaCardContent, VaIcon } from '../../index'
import VaBadgeAvatar from './VaBadge-avatar.vue'

const label = ref('1234')
const overlap = ref(false)
const dot = ref(false)
const transparent = ref(false)
const visibleEmpty = ref(false)
</script>
