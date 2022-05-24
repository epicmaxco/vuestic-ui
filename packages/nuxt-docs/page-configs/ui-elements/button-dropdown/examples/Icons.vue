<template>
  <div>
    <va-button-dropdown class="mr-2 mb-2" label="without icon" hide-icon>
      Content
    </va-button-dropdown>
    <va-button-dropdown class="mr-2 mb-2" label="left icon" left-icon>
      Content
    </va-button-dropdown>
    <va-button-dropdown class="mr-2 mb-2" label="custom icon" icon="info">
      Content
    </va-button-dropdown>
    <va-button-dropdown
      label="custom icon && icon-open"
      icon="info"
      opened-icon="check_circle"
    >
      Content
    </va-button-dropdown>
  </div>
</template>
