<template>
  <div class="row flex-nowrap">
    <div class="flex md4 lg4">
      <va-card>
        <va-card-block class="flex-nowrap" horizontal>
          <div style="flex: auto;">
            <va-card-title>Title</va-card-title>
            <va-card-content>
              {{ lorem }}
            </va-card-content>
          </div>
          <va-image style="flex: 0 0 200px;" src="https://picsum.photos/200" />
        </va-card-block>
      </va-card>
    </div>
    <div class="flex md4 lg4">
      <va-card>
        <va-card-block class="flex-nowrap" horizontal>
          <va-card-block style="flex: auto;">
            <va-card-content>{{ lorem }}</va-card-content>
          </va-card-block>
          <va-divider vertical />
          <va-card-block style="flex: auto;">
            <va-card-content>{{ lorem }}</va-card-content>
          </va-card-block>
        </va-card-block>
      </va-card>
    </div>
    <div class="flex md4 lg4">
      <va-card>
        <va-card-block class="flex-nowrap" horizontal>
          <va-image style="flex: 1;" src="https://picsum.photos/260" />
          <va-card-actions vertical align="center" style="flex: 0 auto; padding: 0;">
            <va-button icon="share" color="secondary" plain />
            <va-button icon="bookmark" color="secondary" plain />
            <va-button icon="close" color="secondary" plain />
          </va-card-actions>
        </va-card-block>
      </va-card>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    lorem: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  }),
}
</script>
