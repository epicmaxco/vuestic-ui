import { VaBacktop } from './'
import { VaRadio } from '../va-radio'

export default {
  title: 'VaBacktop',
  component: VaBacktop,
}

export const Default = () => ({
  components: { VaBacktop },
  template: `
    <p class="m-1">{{$vb.lorem(10000)}}</p>
    <va-backtop/>
  `,
})

export const Color = () => ({
  components: { VaBacktop },
  template: `
    <p class="m-1">{{$vb.lorem(10000)}}</p>
    <va-backtop color="warning"/>
  `,
})

export const Offset = () => ({
  components: { VaBacktop },
  template: `
    <p class="m-1">{{$vb.lorem(10000)}}</p>
    <va-backtop 
      horizontalOffset="4rem" 
      verticalOffset="4rem"
    />
  `,
})

const OPTIONS_X = ['left', 'right']
const OPTIONS_Y = ['top', 'bottom']

export const Position = () => ({
  components: { VaBacktop, VaRadio },
  data: () => ({ optionsY: OPTIONS_Y, valueY: OPTIONS_Y[1], optionsX: OPTIONS_X, valueX: OPTIONS_X[1]}),
  template: `
    [Horizontal Position]
    <va-radio v-model="valueY" :options="optionsY"/>
    [Vertical Position]
    <va-radio v-model="valueX" :options="optionsX"/>
    <p class="m-1">{{$vb.lorem(10000)}}</p>
    <va-backtop 
      :horizontalPosition="valueX"
      :verticalPosition="valueY"
    />
  `,
})

export const ClikcEvent = () => ({
  components: { VaBacktop },
  template: `
    <p class="m-1">{{$vb.lorem(10000)}}</p>
    <va-backtop ref="backtop"/>
    <button @click="$refs.backtop.scrollToTop()">
      [Emit click]
    </button>
  `,
})

export const Target = () => ({
  components: { VaBacktop },
  template: `
    [not the target]
    <div class="h-48 overflow-y-auto">
      <p class="m-1">{{$vb.lorem(10000)}}</p>
    </div>
    [the target]
    <div id="target" class="h-48 overflow-y-auto">
      <p class="m-1">{{$vb.lorem(10000)}}</p>
    </div>
    <va-backtop target="#target"/>
  `,
})