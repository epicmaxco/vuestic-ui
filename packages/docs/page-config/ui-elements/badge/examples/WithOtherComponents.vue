<template>
  <div class="flex items-center">
    <va-badge
      placement="top-left"
      text="New"
      overlap
      class="mr-6"
    >
      <va-card>
        <va-card-content>
          Next update is right behind the corner
        </va-card-content>
      </va-card>
    </va-badge>

    <va-badge
      placement="bottom-center"
      overlap
      dot
      class="mr-8"
    >
      <va-icon name="mail_outlined" />
    </va-badge>

    <va-badge
      placement="top-left"
      dot
      overlap
      class="mr-8"
    >
      <va-avatar
        src="https://randomuser.me/api/portraits/women/8.jpg"
        square
      />
    </va-badge>

    <va-badge
      text="5+"
      overlap
    >
      <va-button preset="primary">
        Profile
      </va-button>
    </va-badge>
  </div>
</template>
