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
    <VbCard title="transparent">
      <div><va-badge transparent dot label="Is Dot" /></div>
      <div><va-badge transparent color="warning" label="transparent colored" /></div>
      <div><va-badge transparent label="transparent default" /></div>
      <div><va-badge transparent outline label="transparent outline" /></div>
      <div><va-badge transparent="0.6" label="transparent 0.6"></va-badge></div>
      <div><span style="background-color: #000; color: #fff; padding: 0 10px;">black background <va-badge transparent label="transparent default" /></span></div>
    </VbCard>
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
        <va-badge>
          Without multiline prop
          <template v-slot:badge>
            1 line of 3<br />
            2 line of 3<br />
            3 line of 3
          </template>
        </va-badge>
      </div>
      <div>
        <va-badge multiline>
          With multiline prop
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
    <VbCard title="controls">
      <va-input v-model="badgeFloatingText"/>
      Left: <va-toggle v-model="left"/>
      Bottom: <va-toggle v-model="bottom"/>
      Overlap: <va-toggle v-model="overlap"/>
      Dot: <va-toggle v-model="dot"/>
      Circle: <va-toggle v-model="circle"/>
    </VbCard>
    <VbCard title="floating, overlap and transitions">
      <va-badge :circle="circle" :bottom="bottom" :left="left" :overlap="overlap" :label="badgeFloatingText" :dot="dot">
        Default
      </va-badge>
      &nbsp;&nbsp;&nbsp;
      <va-badge :circle="circle" :bottom="bottom" :left="left" :overlap="overlap" :label="badgeFloatingText" :dot="dot" color="info">
        Info
      </va-badge>
      &nbsp;&nbsp;&nbsp;
      <va-badge :circle="circle" :bottom="bottom" :left="left" :overlap="overlap" :label="badgeFloatingText" :dot="dot" color="danger">
        Danger
      </va-badge>
      &nbsp;&nbsp;&nbsp;
      <va-badge :circle="circle" :bottom="bottom" :left="left" :overlap="overlap" :label="badgeFloatingText" :dot="dot" visibleEmpty>
        <div style="width: 100px; height: 100px; border: 1px solid red">
          VisibleEmpty
          <br />
          Custom size
        </div>
      </va-badge>
    </VbCard>

  </VbDemo>
</template>

<script>
import VaBadge from './VaBadge'
import VaInput from '../va-input/VaInput'
import VaToggle from '../va-toggle/VaToggle'

export default {
  components: { VaBadge, VaInput, VaToggle },
  data () {
    return {
      badgeFloatingText: 'text',
      left: false,
      bottom: false,
      overlap: false,
      dot: false,
      circle: true,
    }
  },
}
</script>
