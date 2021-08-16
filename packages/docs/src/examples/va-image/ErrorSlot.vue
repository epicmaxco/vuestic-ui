<template>
  <div class="row">
    <div class="flex md6 lg4">
      <va-image style="min-height: 300px;" src="wrong-image-path">
        <template #error>
          {{ $t('api.VaImage.examples.notFound') }}
        </template>
      </va-image>
    </div>
  </div>
</template>
