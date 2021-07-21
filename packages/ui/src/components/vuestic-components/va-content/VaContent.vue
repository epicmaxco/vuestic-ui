<template>
  <div class="va-content">
    <slot />
  </div>
</template>

<script>
function addAttribute (content) {
  content.forEach(child => {
    if (!child.classList.contains('va-content-break')) {
      if (child.children && child.children.length) {
        child.setAttribute('va-content-node', '')
        addAttribute(child.children)
      } else {
        // Will go here if the child do not have a content or its content is a string.
        child.setAttribute('va-content-element', '')
      }
    }
  })
}

export default {
  name: 'VaContent',
  mounted () {
    addAttribute(this.$el.children)
  },
  updated () {
    addAttribute(this.$el.children)
  },
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';
@import '../../vuestic-sass/global/typography';
@import '../../vuestic-sass/global/utility-global';

@mixin unify-selector($selector) {
  #{$selector}[va-content-element],
  #{$selector}[va-content-node],
  // This selector is required for tags created with v-html and Markdown.
  [va-content-element] #{$selector} {
    @content;
  }
}

.va-content {
  line-height: $line-height;

  @include unify-selector("h1") {
    @include va-display(1);
    @include va-header-margin(1);

    line-height: 3.5rem;
  }

  @include unify-selector("h2") {
    @include va-display(2);
    @include va-header-margin(2);
  }

  @include unify-selector("h3") {
    @include va-display(3);
    @include va-header-margin(3);

    line-height: 2.5rem;
    margin-bottom: 1rem;
  }

  @include unify-selector("h4") {
    @include va-display(4);
    @include va-header-margin(4);
  }

  @include unify-selector("h5") {
    @include va-display(5);
    @include va-header-margin(5);

    line-height: 1.875rem;
  }

  @include unify-selector("h6") {
    @include va-display(6);
    @include va-header-margin(6);
  }

  @include unify-selector("i") {
    font-style: italic;
  }

  @include unify-selector("hr.separator") {
    height: 2px;
    background-color: #eeeeee;
    border: none;
  }

  @include unify-selector("p") {
    font-size: 1rem;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  @include unify-selector("pre") {
    margin-bottom: 1rem;
    overflow-x: auto;
    white-space: pre;
    word-wrap: normal;

    &.code {
      @include va-code-snippet();
    }
  }

  @include unify-selector("code") {
    display: inline-block;
    word-wrap: break-word;
  }

  @include unify-selector("strong") {
    font-weight: $font-weight-bold;
  }

  // NOTE Ideally we want this to work with mixins too, but no idea how to achieve that :/.
  @include unify-selector("ol") {
    @extend .va-ordered;
  }

  //This is kind of weird though not sure about any workaround :(
  @include unify-selector("ul:not(.va-option-list__list)") {
    @extend .va-unordered;
  }

  @include unify-selector("blockquote") {
    @extend .va-blockquote;
  }

  @include unify-selector("figure") {
    border-radius: 0;
    border: none;
    box-sizing: border-box;
    box-shadow: $widget-box-shadow;
    word-wrap: break-word;

    figcaption[va-content-element] {
      flex: 1 1 auto;
      padding: 1.25rem;
    }

    p[va-content-element]:last-child {
      margin-bottom: 0;
    }
  }

  @include unify-selector("table") {
    @extend .va-table;
  }

  @include unify-selector("a") {
    @extend .link;
  }
}
</style>
