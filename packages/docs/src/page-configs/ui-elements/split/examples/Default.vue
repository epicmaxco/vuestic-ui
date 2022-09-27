<template>
  <va-split class="split-demo split-demo--image" :limits="[10, 10]">
    <template #start>
      <div class="img-block">
        <img src="https://picsum.photos/seed/picsum/1536/800" draggable="false" class="img img--start" alt="" />
      </div>
    </template>
    <template #end>
      <div class="img-block">
        <img src="https://picsum.photos/seed/picsum/1536/800?grayscale" draggable="false" class="img img--end" alt="" />
      </div>
    </template>
  </va-split>
</template>

<script>
export const lorem = 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'

export default {
  data: () => ({
    lorem,
  }),
}
</script>

<style lang="scss">
  .split-demo {
    position: relative;
    height: 11rem;
    padding: 1rem;
    border: 1px solid gainsboro;

    & .va-split__panel {
      padding: 0.75rem;
    }

    &--image {
      height: 22rem;
      padding: 0;

      & .va-split__panel {
        padding: 0;
      }
    }

    & .img-block {
      position: relative;
      height: 100%;
      overflow: hidden;
      user-select: none;
    }

    .img {
      position: absolute;
      top: 0;
      width: 67vw;

      &--start {
        left: 0;
      }

      &--end {
        right: 0;
      }
    }
  }
</style>
