<template>
  <VbDemo>
    <VbCard refresh title="Tabs usage example">
      <TabsExample/>
    </VbCard>
    <VbCard title="Default">
      <va-tabs v-model="tabValue">
        <va-tab
          v-for="title in tabTitles"
          :key="title"
        >
          {{title}}
        </va-tab>
      </va-tabs>
    </VbCard>
    <VbCard title="Align right" width="400px">
      <va-tabs right v-model="tabValue">
        <va-tab
          v-for="title in tabTitles"
          :key="title"
        >
          {{title}}
        </va-tab>
      </va-tabs>
    </VbCard>
    <VbCard title="Centered" width="400px">
      <va-tabs center v-model="tabValue">
        <va-tab
          v-for="title in tabTitles"
          :key="title"
        >
          {{title}}
        </va-tab>
      </va-tabs>
    </VbCard>
    <VbCard title="Grow" width="400px">
      <va-tabs grow v-model="tabValue">
        <va-tab
          v-for="title in tabTitles"
          :key="title"
        >
          {{title}}
        </va-tab>
      </va-tabs>
    </VbCard>
    <VbCard title="Overflow">
      <va-tabs
        style="width: 120px"
        v-model="tabValue"
      >
        <va-tab
          v-for="title in tabTitles"
          :key="title"
        >
          {{title}}
        </va-tab>
      </va-tabs>
    </VbCard>
    <VbCard title="Overflow text">
      <va-tabs v-model="tabValue">
        <va-tab
          v-for="title in tabTitles"
          :key="title"
        >
          {{title}}
        </va-tab>
        <va-tab>
          Somewhat long long long long long long long long text
        </va-tab>
      </va-tabs>
    </VbCard>
    <VbCard title="Overflow text + grow">
      <va-tabs grow v-model="tabValue">
        <va-tab
          v-for="title in tabTitles"
          :key="title"
        >
          {{title}}
        </va-tab>
        <va-tab>
          Somewhat long long long long long long long long long text
        </va-tab>
      </va-tabs>
    </VbCard>
    <VbCard title="Hide slider">
      <va-tabs hideSlider v-model="tabValue">
        <va-tab
          v-for="title in tabTitles"
          :key="title"
        >
          {{title}}
        </va-tab>
      </va-tabs>
    </VbCard>
    <VbCard title="Tabs problem" style="outline: 2px solid red">
      <va-tabs v-model="tabValue">
        <va-tab
          v-for="title in tabTitles"
          :key="title"
        >
          <va-badge label="!">
            {{title}}
          </va-badge>
        </va-tab>
      </va-tabs>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTabs from './VaTabs'
import VaTab from './VaTab'
import VaBadge from '../va-badge/VaBadge'
import TabsExample from './__demo__/TabsExample'

export default {
  components: {
    TabsExample,
    VaBadge,
    VaTabs,
    VaTab,
  },
  data () {
    return {
      tabTitles: ['One', 'Two', 'Three'],
      tabValue: 1,
    }
  },
}
</script>
