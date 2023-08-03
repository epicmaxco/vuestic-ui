<template>
  <VbDemo>
    <VbCard title="Text">
      <va-dropdown>
        <template #anchor>
          Text
        </template>
        <VaDropdownContent>Dropdown text</VaDropdownContent>
      </va-dropdown>
    </VbCard>
    <VbCard title="Comment">
      <va-dropdown>
        <template #anchor>
          <!-- Comment -->
        </template>
        <VaDropdownContent>Dropdown text</VaDropdownContent>
      </va-dropdown>
    </VbCard>
    <VbCard title="Deep fragments">
      <va-dropdown>
        <template #anchor>
          <template v-if="true">
            <template v-if="true">
              Fragment
            </template>
          </template>
        </template>
        <VaDropdownContent>Dropdown text</VaDropdownContent>
      </va-dropdown>
    </VbCard>
    <VbCard title="Button">
      <va-dropdown>
        <template #anchor>
          <button>Button</button>
        </template>
        <VaDropdownContent>Dropdown text</VaDropdownContent>
      </va-dropdown>
    </VbCard>
    <VbCard title="Component">
      <va-dropdown>
        <template #anchor>
          <VaButton>VaButton</VaButton>
        </template>
        <VaDropdownContent>Dropdown text</VaDropdownContent>
      </va-dropdown>
    </VbCard>
    <VbCard title="Suspense">
      <va-dropdown>
        <template #anchor>
          <Suspense timeout="5000">
            <VaButton>VaButton</VaButton>
            <template #fallback>
              <div>Loading...</div>
            </template>
          </Suspense>
        </template>
        <VaDropdownContent>Dropdown text</VaDropdownContent>
      </va-dropdown>
    </VbCard>
    <VbCard title="Teleport">
      <div style="background: #ff000044;">
        <h1>Declaration here, but teleport to body</h1>
        <va-dropdown>
          <template #anchor>
            <Teleport to="body">
              <VaButton>VaButton</VaButton>
            </Teleport>
          </template>
          <VaDropdownContent>Dropdown text</VaDropdownContent>
        </va-dropdown>
      </div>
    </VbCard>

    <VbCard title="SVG">
      <va-dropdown>
        <template #anchor>
          <svg viewBox="0 0 100 100" height="100px" width="100px" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" />
          </svg>
        </template>
        <VaDropdownContent>Dropdown text</VaDropdownContent>
      </va-dropdown>
    </VbCard>

    <VbCard title="Iframe">
      Mustn't open on iframe click, because click must be handled in `iframe`
      <va-dropdown>
        <template #anchor>
          <div style="background: red; width: 120px; height: 120px;">
            <iframe src="https://www.w3schools.com" height="100px" width="100px" />
          </div>
        </template>
        <VaDropdownContent>Dropdown text</VaDropdownContent>
      </va-dropdown>
    </VbCard>

    <VbCard title="Audio">
      Audio controls mustn't trigger dropdown
      <va-dropdown>
        <template #anchor>
          <audio controls style="background: red; width: 100px; height: 100px;" />
        </template>
        <VaDropdownContent>Dropdown text</VaDropdownContent>
      </va-dropdown>
    </VbCard>

    <VbCard title="Canvas">
      <va-dropdown>
        <template #anchor>
          <canvas style="background: red; width: 100px; height: 100px;" />
        </template>
        <VaDropdownContent>Dropdown text</VaDropdownContent>
      </va-dropdown>
    </VbCard>

    <VbCard title="Multiple nodes">
      <va-dropdown>
        <template #anchor>
          <div>
            Hello
          </div>
          <div>
            World
          </div>
        </template>
        <VaDropdownContent>Dropdown text</VaDropdownContent>
      </va-dropdown>
    </VbCard>

    <VbCard title="Fragment (v-if)">
      <va-dropdown>
        <template #anchor>
          <template v-if="3 > 2">
            Hello
          </template>
        </template>
        <VaDropdownContent>Dropdown text</VaDropdownContent>
      </va-dropdown>
    </VbCard>

    <VbCard title="Fragment (v-for)">
      <va-dropdown>
        <template #anchor>
          <template v-for="i in 3" :key="i">
            {{ i }}
          </template>
        </template>
        <VaDropdownContent>Dropdown text</VaDropdownContent>
      </va-dropdown>
    </VbCard>

    <VbCard title="Fragment (v-slot)">
      <va-dropdown>
        <template #anchor>
          <ProxyComponent>
            <template #default>
              <div>1</div>
            </template>
          </ProxyComponent>
        </template>
        <VaDropdownContent>Dropdown text</VaDropdownContent>
      </va-dropdown>
    </VbCard>

    <VbCard title="Fragment (v-slot with multiple nodes)">
      <va-dropdown>
        <template #anchor>
          <ProxyComponent>
            <template #default>
              <div>1</div>
              <div>2</div>
            </template>
          </ProxyComponent>
        </template>
        <VaDropdownContent>Dropdown text</VaDropdownContent>
      </va-dropdown>
    </VbCard>

    <VbCard title="Fragment (component with multiple nodes)">
      Must have a wrapper
      <va-dropdown>
        <template #anchor>
          <MultinodeComponent>
            <template #default>
             1
            </template>
          </MultinodeComponent>
        </template>
        <VaDropdownContent>Dropdown text</VaDropdownContent>
      </va-dropdown>
    </VbCard>
  </VbDemo>
</template>

<script>
import { VaDropdown, VaDropdownContent } from './'
import { VaButton } from '../va-button'
import { h } from 'vue'

const ProxyComponent = {
  name: 'ProxyComponent',
  render () {
    return h('div', null, this.$slots.default())
  },
}

const MultinodeComponent = {
  name: 'MultinodeComponent',
  render () {
    return h('div', null, [this.$slots.default(), this.$slots.default()])
  },
}

export default {
  name: 'VaDropdownRenderDemo',
  components: { VaDropdown, VaDropdownContent, VaButton, ProxyComponent, MultinodeComponent },
}
</script>

<style lang="scss" scoped>
.target {
  width: 300px;
  background-color: #eeeeee;
  height: 100px;
}
</style>
