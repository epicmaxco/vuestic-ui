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
  </VbDemo>
</template>

<script>
import { ref } from 'vue'
import { VaDropdown, VaDropdownContent } from './'
import DropdownCloseButton from './__demo__/DropdownCloseButton'
import { VaInput } from '../va-input'
import { VaBadge } from '../va-badge'
import { VaButton } from '../va-button'

export default {
  name: 'VaDropdownRenderDemo',
  components: { VaDropdown, VaDropdownContent, VaButton },
}
</script>

<style lang="scss" scoped>
.target {
  width: 300px;
  background-color: #eeeeee;
  height: 100px;
}
</style>
