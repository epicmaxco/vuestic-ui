<template>
  <va-split
    v-model="value"
    class="split-demo"
  >
    <template #start>
      <va-split>
        <template #start>
          <div class="p-6">
            {{ lorem }}
          </div>
        </template>
        <template #end>
          <div class="p-6">
            {{ lorem }}
          </div>
        </template>
      </va-split>
    </template>
    <template #end>
      <va-split
        vertical
        style="height: 25rem"
      >
        <template #start>
          <div class="p-6">
            {{ lorem }}
          </div>
        </template>
        <template #end>
          <div class="p-6">
            {{ lorem }}
          </div>
        </template>
      </va-split>
    </template>
  </va-split>
</template>

<script>
const lorem =
  "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?";

export default {
  data: () => ({
    lorem,
    value: 70,
  }),
};
</script>
