<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
    style="--va-badge-text-wrapper-border-radius: 50%;"
  >
    <va-badge
      overlap
      text="5"
    >
      <va-button>
        Button
      </va-button>
    </va-badge>

    <va-badge
      overlap
      text="5"
      placement="bottom-end"
    >
      <va-button>
        Button
      </va-button>
    </va-badge>

    <va-badge
      overlap
      text="5"
      placement="top-start"
    >
      <va-button>
        Button
      </va-button>
    </va-badge>

    <va-badge
      overlap
      text="5"
      placement="bottom-start"
    >
      <va-button>
        Button
      </va-button>
    </va-badge>

    <va-badge
      overlap
      dot
      :offset="-5"
      text="5"
      placement="bottom-center"
    >
      <va-icon name="&#xe0e1;" />
    </va-badge>
  </div>
</template>
