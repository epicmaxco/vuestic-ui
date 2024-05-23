<template>
  <div class="flex flex-wrap items-center gap-4">
    <VaAvatar
      src="https://randomuser.me/api/portraits/women/1.jpg"
      alt="Women"
    />

    <VaAvatar title="icon face" icon="face" />

    <VaAvatar title="Jane Doe' avatar">
      J.D.
    </VaAvatar>

    <div class="inline-flex justify-start items-center shrink-0 gap-4">
      <VaAvatar aria-hidden="true">
        J.D.
      </VaAvatar>
      <span>Jane Doe</span>
    </div>
  </div>
</template>
