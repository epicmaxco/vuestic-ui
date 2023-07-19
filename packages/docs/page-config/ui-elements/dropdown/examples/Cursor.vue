<template>
  <va-dropdown
    :auto-placement="false"
    placement="right-start"
    cursor
    trigger="right-click"
  >
    <va-dropdown-content> Contextual popover! </va-dropdown-content>

    <template #anchor>
      <va-image
        class="h-[300px] w-[300px]"
        src="https://picsum.photos/1500"
      >
        <va-badge text="Right click this image" />
      </va-image>
    </template>
  </va-dropdown>
</template>
