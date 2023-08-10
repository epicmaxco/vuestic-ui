import { VaAccordion } from './'
import { VaCollapse } from '../va-collapse'

export default {
  title: 'VaAccordion',
  component: VaAccordion,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaAccordion, VaCollapse },
  setup () {
    return {
      state: [false, false, false],
      collapses: [
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
      ],
    }
  },
  template: `
    <va-accordion v-model="state">
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

export const Stateful = () => ({
  components: { VaAccordion, VaCollapse },
  setup () {
    return {
      collapses: [
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
      ],
    }
  },
  template: `
    <va-accordion stateful>
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

export const Multiple = () => ({
  components: { VaAccordion, VaCollapse },
  setup () {
    return {
      state: [false, true, false],
      collapses: [
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
      ],
    }
  },
  template: `
    <va-accordion v-model="state" multiple>
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

export const Inset = () => ({
  components: { VaAccordion, VaCollapse },
  setup () {
    return {
      state: [true, true, false, false, true],
      collapses: [
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
      ],
    }
  },
  template: `
    <va-accordion v-model="state" inset multiple>
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

export const Popout = () => ({
  components: { VaAccordion, VaCollapse },
  setup () {
    return {
      state: [true, true, false, false, true],
      collapses: [
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
        { title: 'Collapse', content: 'Content' },
      ],
    }
  },
  template: `
    <va-accordion v-model="state" popout multiple>
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
