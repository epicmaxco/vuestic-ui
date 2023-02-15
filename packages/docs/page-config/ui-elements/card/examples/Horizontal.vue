<template>
  <div class="flex flex-col flex-wrap gap-5">
    <va-card>
      <va-card-block
        class="flex-nowrap"
        horizontal
      >
        <div style="flex: auto">
          <va-card-title>Title</va-card-title>
          <va-card-content>
            {{ lorem }}
          </va-card-content>
        </div>
        <va-image
          style="flex: 0 0 200px"
          src="https://picsum.photos/200"
        />
      </va-card-block>
    </va-card>

    <va-card>
      <va-card-block horizontal>
        <va-card-block style="flex: auto">
          <va-card-content>{{ lorem }}</va-card-content>
        </va-card-block>
        <va-divider vertical />
        <va-card-block style="flex: auto">
          <va-card-content>{{ lorem }}</va-card-content>
        </va-card-block>
      </va-card-block>
    </va-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    lorem: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  }),
};
</script>
