<template>
  <VaDropdown
    :auto-placement="false"
    placement="right-start"
    cursor
    trigger="right-click"
  >
    <VaDropdownContent> Contextual popover! </VaDropdownContent>

    <template #anchor>
      <VaImage
        class="h-[300px] w-[300px]"
        src="https://picsum.photos/1500"
      >
        <VaBadge text="Right click this image" />
      </VaImage>
    </template>
  </VaDropdown>
</template>
