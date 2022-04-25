<template>
  <VbDemo>
    <VbCard
      title="Default usage"
      style="width: 100%;"
    >
      <va-tabs v-model="tabValue1" focus>
        <template #tabs>
          <va-tab
            v-for="title in tabStatic"
            :name="title"
            :key="title"
          >
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
      Value: {{ tabValue1 }}
    </VbCard>
    <VbCard
      title="Tabs Without name"
      style="width: 100%;"
    >
      <va-tabs v-model="tabValueWithoutName">
        <template #tabs>
          <va-tab
            v-for="title in tabStatic"
            :key="title"
          >
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
      Value: {{ tabValueWithoutName }}
    </VbCard>
    <VbCard
      title="Tabs With Pagination"
      style="width: 45%;"
    >
      <va-tabs v-model="tabValueWithPagination">
        <template #tabs>
          <va-tab
            v-for="title in ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight']"
            :name="title"
            :key="title"
          >
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
    </VbCard>
    <VbCard
      title="Tabs With Pagination and Custom Icons"
      style="width: 45%;"
    >
      <va-tabs
        v-model="tabValue1"
        prev-icon="arrow_back"
        next-icon="arrow_forward"
      >
        <template #tabs>
          <va-tab
            v-for="title in ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight']"
            :name="title"
            :key="title"
          >
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
    </VbCard>
    <VbCard
      title="Vertical Tabs"
      style="width: 100%;"
    >
      <va-tabs
        v-model="tabValue1"
        vertical
      >
        <template #tabs>
          <va-tab
            v-for="title in tabStatic"
            :name="title"
            :key="title"
          >
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
    </VbCard>
    <VbCard
      title="Tabs With Icons"
      style="width: 100%;"
    >
      <va-tabs v-model="tabValue4">
        <template #tabs>
          <va-tab
            v-for="icon in ['share', 'star', 'room', 'schedule']"
            :name="icon"
            :icon="icon"
            :label="icon"
            :key="icon"
          />
        </template>
      </va-tabs>
    </VbCard>
    <VbCard
      title="Tabs with same v-model"
      style="width: 100%;"
    >
      <va-tabs v-model="tabValue">
        <template #tabs>
          <va-tab
            v-for="title in tabStatic"
            :key="title"
          >
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
      <va-tabs v-model="tabValue">
        <template #tabs>
          <va-tab
            v-for="title in tabStatic"
            :key="title"
          >
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
      <va-tabs
        v-model="tabValue"
        v-if="show"
      >
        <template #tabs>
          <va-tab
            v-for="title in tabStatic"
            :key="title"
          >
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>

      <div>
        <button @click="show = !show">
          Toggle
        </button>
      </div>
      Value: {{ tabValue }}
    </VbCard>
    <VbCard
      title="Stateless tabs without v-model"
      style="width: 100%;"
    >
      <va-tabs>
        <template #tabs>
          <va-tab
            v-for="title in tabStatic"
            :key="title"
          >
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
    </VbCard>
    <VbCard
      title="Stateful tabs"
      style="width: 100%;"
    >
      <va-tabs stateful>
        <template #tabs>
          <va-tab
            v-for="title in tabStateful"
            :key="title"
          >
            Tab #{{ title }}
          </va-tab>
        </template>
      </va-tabs>
      <div>
        <button @click="tabStateful.push(tabStateful.length + 1)">
          Add one more tab
        </button>
      </div>
    </VbCard>
    <VbCard
      title="Right tabs"
      style="width: 100%;"
    >
      <va-tabs
        stateful
        right
      >
        <template #tabs>
          <va-tab
            v-for="title in tabStatic"
            :key="title"
          >
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
    </VbCard>
    <VbCard
      title="Grow tabs"
      style="width: 100%;"
    >
      <va-tabs
        stateful
        grow
      >
        <template #tabs>
          <va-tab
            v-for="title in tabStatic"
            :key="title"
          >
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
    </VbCard>
    <VbCard
      title="Center tabs"
      style="width: 100%;"
    >
      <va-tabs
        stateful
        center
      >
        <template #tabs>
          <va-tab
            v-for="title in tabStatic"
            :key="title"
          >
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
    </VbCard>
    <VbCard
      title=":modelValue only"
      style="width: 100%;"
    >
      <va-tabs :modelValue="1">
        <template #tabs>
          <va-tab v-for="title in tabStatic" :key="title">
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
    </VbCard>
    <VbCard
      title="Disabled tabs"
      style="width: 100%;"
    >
      <va-tabs
        stateful
        disabled
      >
        <template #tabs>
          <va-tab
            v-for="title in tabStatic"
            :key="title"
          >
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
    </VbCard>
    <VbCard
      title="Disabled one tab"
      style="width: 100%;"
    >
      <va-tabs v-model="tabValue1" focus>
        <template #tabs>
          <va-tab
            v-for="title in tabStatic"
            :name="title"
            :key="title"
          >
            {{ title }}
          </va-tab>
          <va-tab
            label="Disabled tab"
            disabled
            name="disabled"
          />
        </template>
      </va-tabs>
      Value: {{ tabValue1 }}
    </VbCard>
    <VbCard
      title="Colored tabs"
      style="width: 100%;"
    >
      <va-tabs
        stateful
        v-model="tabValue"
        color="danger"
      >
        <template #tabs>
          <va-tab
            v-for="title in tabStatic"
            :key="title"
          >
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
    </VbCard>
    <VbCard
      title="router tabs"
      style="width: 100%;"
    >
      <va-tabs
        stateful
        :modelValue="1"
      >
        <template #tabs>
          <va-tab
            name="Link 1"
            to="/demo/vuestic-components/va-breadcrumbs/VaBreadcrumbs.demo.vue"
          >
            Link 1
          </va-tab>
          <va-tab
            name="Link 2"
            to="/demo/vuestic-components/va-tabs/VaTabs.demo.vue"
          >
            Active link
          </va-tab>
        </template>
      </va-tabs>
    </VbCard>
    <VbCard
      title="Tabs with hidden slider"
      style="width: 100%;"
    >
      <va-tabs
        stateful
        :modelValue="1"
        hide-slider
      >
        <template #tabs>
          <va-tab
            v-for="title in tabStatic"
            :key="title"
          >
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
    </VbCard>
    <VbCard
      title="Add and Remove tabs"
      style="width: 100%;"
    >
      <va-tabs v-model="tabValue2">
        <template #tabs>
          <va-tab
            v-for="title in tabDynamic"
            :name="title"
            :key="title"
          >
            {{ title }}
          </va-tab>
        </template>
      </va-tabs>
      Value: {{ tabValue2 }}
      <div>
        <button @click="tabDynamic.push(`Tab #${tabDynamic.length + 1}`)">
          Add tab
        </button>

        <input style="width: 50px;" v-model="deletedTabIndex" placeholder="Index">
        <button @click="tabDynamic.splice(deletedTabIndex || 0,1)">
          Remove tab
        </button>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import VaTabs from './index'
import VaTab from './VaTab'

export default {
  components: {
    VaTabs,
    VaTab,
  },
  data () {
    return {
      tabStatic: ['One', 'Two', 'Three', 'Four'],
      tabDynamic: ['One', 'Two', 'Three'],
      tabValue: 2,
      tabValue1: 'One',
      tabValue2: 'One',
      tabValue3: 0,
      tabValue4: 'share',
      tabValueWithPagination: 'Four',
      tabValueWithoutName: 1,
      tabStateful: [1, 2, 3, 4],
      show: false,
      deletedTabIndex: '',
    }
  },
}
</script>
