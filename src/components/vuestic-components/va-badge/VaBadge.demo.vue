<template>
  <VbDemo>
    <VbCard title="controls">
      Label: <va-input v-model="label"/>
      Outline: <va-toggle v-model="outline"/>
      Dot: <va-toggle v-model="dot"/>
      VisibleEmpty: <va-toggle v-model="visibleEmpty"/>
    </VbCard>
    <VbCard title="controls">
      Left: <va-toggle v-model="left"/>
      Bottom: <va-toggle v-model="bottom"/>
      Overlap: <va-toggle v-model="overlap"/>
    </VbCard>
    <VbCard title="controls">
      TextColor prop control
      <va-advanced-color-picker v-model="textColor"/>
      {{ textColor }}
    </VbCard>
    <VbCard title="controls">
      Transparent Slider
      <va-slider
        range
        step.number="1"
        v-model="transparentSlide"
      />
      Transparent: {{ transparentSlide }}%
    </VbCard>
    <VbCard title="Dynamic data badges">
      <va-badge label="Regular">
        Default
      </va-badge>
      <va-badge :transparent="transparent" :outline="outline"  :bottom="bottom" :left="left" :overlap="overlap" :label="label" :visibleEmpty="visibleEmpty" :dot="dot">
        Default
      </va-badge>
      &nbsp;&nbsp;&nbsp;
      <va-badge :textColor="textColor" :transparent="transparent"  :outline="outline"  :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty" color="info">
        Info
      </va-badge>
      &nbsp;&nbsp;&nbsp;
      <va-badge :textColor="textColor" :transparent="transparent"  :outline="outline"  :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty" color="danger">
        Danger
      </va-badge>
      &nbsp;&nbsp;&nbsp;
      <va-badge :textColor="textColor" :transparent="transparent"  :outline="outline"  :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty" color="warning">
        Warning
      </va-badge>
      &nbsp;&nbsp;&nbsp;
      <va-badge :textColor="textColor" :transparent="transparent"  :outline="outline"  :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty" color="gray">
        Gray
      </va-badge>
      &nbsp;&nbsp;&nbsp;
      <va-badge :textColor="textColor" :transparent="transparent"  :outline="outline"  :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty" color="dark">
        Dark
      </va-badge>
      &nbsp;&nbsp;&nbsp;
      <va-badge :textColor="textColor" :transparent="transparent"  :outline="outline"  :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty">
        <div style="width: 100px; height: 100px; border: 2px solid red">
          Custom
          <br />
          size
        </div>
      </va-badge>
      <va-badge :textColor="textColor" :transparent="transparent"  :outline="outline"  :bottom="bottom" :left="left" :overlap="overlap" :label="label" :dot="dot" :visibleEmpty="visibleEmpty" approximateNumber>
        approximate number
      </va-badge>
    </VbCard>
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
    <VbCard title="Color text">
      <div><va-badge label="Default text color" /></div>
      <div><va-badge text-color="#000" label="Black hex text color" /></div>
      <div><va-badge text-color="rgb(14, 74, 196)" label="RGB text color" /></div>
      <div><va-badge text-color="rgba(14, 74, 196, 0.6)" label="RGBA text color (0.6 opacity)" /></div>
      <div><va-badge outline text-color="rgba(14, 74, 196, 0.2)" label="RGBA text color (0.2 opacity) outline" /></div>
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
      <div>
        With Icon:
        <va-badge>
          <template v-slot:badge>
              <span>
                <va-icon name="icon brandico brandico-twitter mx-2"/>
                text
                <va-icon name="icon brandico brandico-instagram mx-2"/>
              </span>
          </template>
        </va-badge>
      </div>
    </VbCard>

  </VbDemo>
</template>

<script>
import VaBadge from './VaBadge'
import VaInput from '../va-input/VaInput'
import VaToggle from '../va-toggle/VaToggle'
import VaIcon from '../va-icon/VaIcon'
import VaAdvancedColorPicker from '../va-color-picker/VaAdvancedColorPicker'
import VaSlider from '../va-slider/VaSlider'

export default {
  components: { VaBadge, VaInput, VaToggle, VaIcon, VaAdvancedColorPicker, VaSlider },
  computed: {
    transparent () {
      return Number(this.transparentSlide) / 100 || 0
    },
  },
  data () {
    return {
      label: '1234',
      left: false,
      bottom: false,
      overlap: false,
      dot: false,
      outline: false,
      transparentSlide: 100,
      visibleEmpty: false,
      textColor: '#fff',
    }
  },
}
</script>
