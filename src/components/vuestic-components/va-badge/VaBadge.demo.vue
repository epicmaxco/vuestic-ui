<template>
  <VbDemo>
    <VbCard title="Badge Types">
      <va-badge label="Paid" />
      <va-badge outline label="Paid" />
    </VbCard>
    <VbCard title="Badges Colors">
      <va-badge label="Paid" />
      <va-badge label="Info" color="info" />
      <va-badge label="Danger" color="danger" />
      <va-badge label="Warning" color="warning" />
      <va-badge label="gray" color="gray" />
      <va-badge label="dark" color="dark" />
    </VbCard>
    <VbCard title="Outline Badges Colors">
      <va-badge label="Paid" outline />
      <va-badge label="Info" outline color="info" />
      <va-badge label="Danger" outline color="danger" />
      <va-badge label="Warning" outline color="warning" />
      <va-badge label="gray" outline color="gray" />
      <va-badge label="dark" outline color="dark" />
    </VbCard>
    <br />
    <VbCard title="Slotted badges">
      <div>
      <va-badge label="prop value" />
      </div>
      <div>
      <va-badge>
        <template v-slot:badge>
          slotted value
        </template>
        Main text
      </va-badge>
      </div>
      <div>
      <va-badge label="prop value">
        <template v-slot:badge>
          prop and slotted values
        </template>
        Main text
      </va-badge>
      </div>
      <div>
      <va-badge label="A">
        <template v-slot:badge>
          A
        </template>
        Main text
      </va-badge>
      </div>
    </VbCard>
    <VbCard title="Color text">
      <div><va-badge label="Default text color" /></div>
      <div><va-badge text-color="#000" label="Black hex text color" /></div>
      <div><va-badge text-color="rgb(14, 74, 196)" label="RGB text color" /></div>
      <div><va-badge text-color="rgba(14, 74, 196, 0.6)" label="RGBA text color (0.6 opacity)" /></div>
      <div><va-badge outline text-color="rgba(14, 74, 196, 0.2)" label="RGBA text color (0.2 opacity) outline" /></div>
    </VbCard>
    <VbCard title="Multiline">
      <div>
        <va-badge label="One line" />
      </div>
      <div>
        Without multiline prop
        <va-badge>
          <template v-slot:badge>
            1 line of 3<br />
            2 line of 3<br />
            3 line of 3
          </template>
        </va-badge>
      </div>
      <div>
        With multiline prop
        <va-badge multiline>
          <template v-slot:badge>
            1 line of 3<br />
            2 line of 3<br />
            3 line of 3
          </template>
        </va-badge>
      </div>
    </VbCard>
    <VbCard title="Visible-empty">
      <div>
        Empty: <va-badge />
      </div>
      <div>
        Empty with visible-empty prop: <va-badge visible-empty />
      </div>
      <div>
        Not empty: <va-badge outline label="not empty" />
      </div>
    </VbCard>
    <VbCard title="dot">
      <div>
        Dot default: <va-badge dot />
        <va-badge color="info" dot />
        <va-badge color="danger" dot />
        <va-badge color="warning" dot />
        <va-badge color="gray" dot />
        <va-badge color="dark" dot />
      </div>
      <div>
        Dot Outline:
        <va-badge outline dot />
        <va-badge outline dot color="info" />
        <va-badge outline dot color="danger" />
        <va-badge outline dot color="warning" />
        <va-badge outline dot color="gray" />
        <va-badge outline dot color="dark" />
      </div>
      <div>
        Dot with content: "<va-badge dot>content</va-badge>"
      </div>
      <div>
        Dot with prop content: <va-badge dot label="some">[]</va-badge>
      </div>
      <div>
        <va-badge dot label="some">
          Dot with slot content
          <template v-slot:badge>
            1 line of 3<br />
            2 line of 3<br />
            3 line of 3
          </template>
        </va-badge>
      </div>
      <div>
        Dot without prop and default slot: <va-badge dot />
      </div>
    </VbCard>
    <VbCard title="transparent">
      <div>
        Empty: <va-badge transparent label="transparent" />
        Dot: <va-badge transparent dot label="transparent dot" />
      </div>
      <va-badge transparent color="warning" label="transparent colored" />
      <va-badge transparent label="transparent default" />
      <va-badge transparent outline label="transparent outline" />
      <va-badge transparent="0.6" label="transparent 0.6"></va-badge>
      <div style="background-color: #000; color: #fff">black background <va-badge transparent label="transparent default" /></div>
    </VbCard>
    <VbCard title="floating">
      <va-input v-model="badgeFloatingText"/>
      <div>
        <va-badge :label="badgeFloatingText">
          Default
        </va-badge>
      </div>
      <br />
      <div>
        <va-badge bottom :label="badgeFloatingText">
          Bottom
        </va-badge>
      </div>
      <br />
      <div>
        <va-badge left :label="badgeFloatingText">
          Left
        </va-badge>
      </div>
      <br />
      <div>
        <va-badge visibleEmpty :label="badgeFloatingText">
          VisibleEmpty
        </va-badge>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaBadge from './VaBadge'
import VaInput from '../va-input/VaInput'

export default {
  components: { VaBadge, VaInput },
  data () {
    return {
      badgeFloatingText: 'text',
    }
  },
}
</script>
