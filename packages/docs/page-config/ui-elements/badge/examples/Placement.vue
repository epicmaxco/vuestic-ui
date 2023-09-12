<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
    style="--va-badge-text-wrapper-border-radius: 50%;"
  >
    <VaBadge
      overlap
      text="5"
    >
      <VaButton>
        Button
      </VaButton>
    </VaBadge>

    <VaBadge
      overlap
      text="5"
      placement="bottom-end"
    >
      <VaButton>
        Button
      </VaButton>
    </VaBadge>

    <VaBadge
      overlap
      text="5"
      placement="top-start"
    >
      <VaButton>
        Button
      </VaButton>
    </VaBadge>

    <VaBadge
      overlap
      text="5"
      placement="bottom-start"
    >
      <VaButton>
        Button
      </VaButton>
    </VaBadge>

    <VaBadge
      overlap
      dot
      :offset="-5"
      text="5"
      placement="bottom-center"
    >
      <VaIcon name="&#xe0e1;" />
    </VaBadge>
  </div>
</template>
