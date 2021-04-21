<template>
  <div class="row">
    <div class="flex md6 lg4">
      <va-image
        style="min-height: 300px;"
        src="wrong-image-path"
      >
        <template #error>
          Image not found! :(
        </template>
      </va-image>
    </div>
  </div>
</template>
