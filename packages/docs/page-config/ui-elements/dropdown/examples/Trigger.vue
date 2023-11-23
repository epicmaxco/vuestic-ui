<template>
  <VaDropdown>
    <template #anchor>
      <VaButton class="mr-2">
        Click
      </VaButton>
    </template>

    <VaDropdownContent> Dropped down! </VaDropdownContent>
  </VaDropdown>

  <VaDropdown trigger="right-click">
    <template #anchor>
      <VaButton class="mr-2">
        Right click
      </VaButton>
    </template>

    <VaDropdownContent> Dropped down! </VaDropdownContent>
  </VaDropdown>

  <VaDropdown trigger="hover">
    <template #anchor>
      <VaButton> Hover </VaButton>
    </template>

    <VaDropdownContent> Dropped down! </VaDropdownContent>
  </VaDropdown>

  <div class="mt-2">
    <VaDropdown
      v-model="doShowDropdown"
      trigger="none"
      class="mr-2"
      :close-on-click-outside="false"
    >
      <template #anchor>
        <VaButton> None </VaButton>
      </template>

      <VaDropdownContent> Dropped down! </VaDropdownContent>
    </VaDropdown>

    <VaButton @click="doShowDropdown = !doShowDropdown">
      {{ doShowDropdown ? "hide" : "show" }} dropdown
    </VaButton>
  </div>
</template>

<script>
export default {
  data() {
    return { doShowDropdown: false };
  },
};
</script>
