<template>
  <div class="row row">
    <div class="flex md6 lg4">
      <va-card>
        <va-card-title>Between horizontal alignment</va-card-title>
        <va-card-actions align="between">
          <va-button>Action 1</va-button>
          <va-button>Action 2</va-button>
        </va-card-actions>
      </va-card>
    </div>
    <div class="flex md6 lg4">
      <va-card>
        <va-card-title>Stretch vertical alignment</va-card-title>
        <va-card-actions align="stretch" vertical>
          <va-button>Action 1</va-button>
          <va-button>Action 2</va-button>
        </va-card-actions>
      </va-card>
    </div>
  </div>
</template>

<script>
import VaCardActions from "vuestic-ui/src/components/va-card/VaCardActions";

export default {
  components: { VaCardActions },
};
</script>
