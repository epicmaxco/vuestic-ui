<template>
  <va-dropdown
    placement="right-start"
    cursor
    trigger="right-click"
    auto-placement
    stick-to-edges
  >
    <va-dropdown-content> Contextual popover! </va-dropdown-content>

    <template #anchor>
      <va-image
        style="height: 300px; width: 300px"
        src="https://picsum.photos/1500"
      >
        <va-badge text="Right click this image" />
      </va-image>
    </template>
  </va-dropdown>
</template>
