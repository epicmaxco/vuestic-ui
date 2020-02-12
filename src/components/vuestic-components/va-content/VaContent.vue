<template>
  <div class="va-content">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VaContent',
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';
@import '../../vuestic-sass/global/typography';
@import '../../vuestic-sass/global/utility-global';

.va-content {
  h1 {
    @include va-display(1);
    @include va-header-margin(1);
  }

  h2 {
    @include va-display(2);
    @include va-header-margin(2);
  }

  h3 {
    @include va-display(3);
    @include va-header-margin(3);
  }

  h4 {
    @include va-display(4);
    @include va-header-margin(4);
  }

  h5 {
    @include va-display(5);
    @include va-header-margin(5);
  }

  h6 {
    @include va-display(6);
    @include va-header-margin(6);
  }

  i {
    font-style: italic;
  }

  hr.separator {
    height: 2px;
    background-color: #eeeeee;
    border: none;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  pre {
    margin-bottom: 1rem;
    overflow-x: auto;
    white-space: pre;
    word-wrap: normal;

    &.code {
      @include va-code-snippet();
    }
  }

  // NOTE Ideally we want this to work with mixins too, but no idea how to achieve that :/.
  ol {
    @extend .va-ordered;
  }

  ul {
    @extend .va-unordered;
  }

  blockquote {
    @extend .va-blockquote;
  }

  figure {
    border-radius: 0;
    border: none;
    box-sizing: border-box;
    box-shadow: $widget-box-shadow;
    word-wrap: break-word;

    figcaption {
      flex: 1 1 auto;
      padding: 1.25rem;
    }

    p:last-child {
      margin-bottom: 0;
    }
  }

  table {
    @extend .va-table;
  }

  a {
    @extend .link;
  }
}
</style>
