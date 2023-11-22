<template>
  <div
    class="flex gap-8 items-center"
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
