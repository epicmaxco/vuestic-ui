<template>
  <div>
      <p>
        Material Design Icons<br>
        <va-icon class="material-icons">book</va-icon>
        <va-icon name="book" />
      </p>

      <p>
        Font Awesome 5<br>
        <va-icon class="fas fa-book" />
        <va-icon name="fas-book" />
      </p>

      <p>
        Ionic<br>
        <va-icon name="ion-book-outline" tag="ion-icon" />
        <va-icon name="ion-book-outline" />
      </p>
  </div>
</template>
<style lang="scss" scoped>
.va-icon + .va-icon {
  margin-left: 2rem;
}
</style>
