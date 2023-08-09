import { VaAccordion } from './'
import { VaCollapse } from '../va-collapse'

interface Args {
  modelValue: boolean[]
  multiple: boolean
  inset: boolean
  popout: boolean
}

const VaAccordionSetup = {
  value: [false, false, false],
  valueArray: [false, true, false],
  collapses: [
    { title: 'First collapse', content: 'first collapse content' },
    { title: 'Second collapse', content: 'second collapse content' },
    { title: 'Third collapse', content: 'third collapse content' },
  ],
}

export default {
  title: 'VaAccordion',
  component: VaAccordion,
  tags: ['autodocs'],
}

export const Default = (args: Args) => ({
  components: { VaAccordion, VaCollapse },
  setup () {
    return VaAccordionSetup
  },
  template: `
    <va-accordion style="width: 400px;">
      <va-collapse
        v-for="(collapse, index) in collapses"
        :key="index"
        :header="collapse.title"
      >
        <div>
          {{ collapse.content }}
        </div>
      </va-collapse>
    </va-accordion>
  `,
})

export const DefaultWithCustomHeader = (args: Args) => ({
  components: { VaAccordion, VaCollapse },
  setup () {
    return VaAccordionSetup
  },
  template: `
    <va-accordion v-model="value" style="width: 400px;">
      <va-collapse
        v-for="(collapse, index) in collapses"
        :key="index"
      >
        <template #header="{ value }">
          {{ value ? 'opened' : 'closed' }}
        </template>
        <div>
          {{ collapse.content }}
        </div>
      </va-collapse>
    </va-accordion>
  `,
})

export const Multiple = (args: Args) => ({
  components: { VaAccordion, VaCollapse },
  setup () {
    return VaAccordionSetup
  },
  template: `
    <va-accordion v-model="valueArray" multiple style="width: 400px;">
      <va-collapse
        v-for="(collapse, index) in collapses"
        :key="index"
        :header="collapse.title"
      >
        <div>
          {{ collapse.content }}
        </div>
      </va-collapse>
    </va-accordion>
  `,
})

export const Inset = (args: Args) => ({
  components: { VaAccordion, VaCollapse },
  setup () {
    return VaAccordionSetup
  },
  template: `
    <va-accordion v-model="value" inset style="width: 400px;">
      <va-collapse
        v-for="(collapse, index) in collapses"
        :key="index"
        :header="collapse.title"
      >
        <div>
          {{ collapse.content }}
        </div>
      </va-collapse>
    </va-accordion>
  `,
})

export const InsetMultiple = (args: Args) => ({
  components: { VaAccordion, VaCollapse },
  setup () {
    return VaAccordionSetup
  },
  template: `
    <va-accordion v-model="valueArray" inset multiple style="width: 400px;">
      <va-collapse
        v-for="(collapse, index) in collapses"
        :key="index"
        :header="collapse.title"
      >
        <div>
          {{ collapse.content }}
        </div>
      </va-collapse>
    </va-accordion>
  `,
})

export const Popout = (args: Args) => ({
  components: { VaAccordion, VaCollapse },
  setup () {
    return VaAccordionSetup
  },
  template: `
    <va-accordion v-model="value" popout style="width: 400px;">
      <va-collapse
        v-for="(collapse, index) in collapses"
        :key="index"
        :header="collapse.title"
      >
        <div>
          {{ collapse.content }}
        </div>
      </va-collapse>
    </va-accordion>
  `,
})

export const PopoutMultiple = (args: Args) => ({
  components: { VaAccordion, VaCollapse },
  setup () {
    return VaAccordionSetup
  },
  template: `
    <va-accordion v-model="valueArray" popout multiple style="width: 400px;">
      <va-collapse
        v-for="(collapse, index) in collapses"
        :key="index"
        :header="collapse.title"
      >
        <div>
          {{ collapse.content }}
        </div>
      </va-collapse>
    </va-accordion>
  `,
})
