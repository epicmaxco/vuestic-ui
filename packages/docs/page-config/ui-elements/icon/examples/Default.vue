<template>
  <p>
    Material Design Icons<br>
    <VaIcon class="material-icons">
      book
    </VaIcon>
    <VaIcon name="book" />
  </p>

  <p>
    Font Awesome 5<br>
    <VaIcon class="fas fa-book" />
    <VaIcon name="fas-book" />
  </p>

  <p>
    Ionic<br>
    <VaIcon
      name="ion-book-outline"
      tag="ion-icon"
    />
    <VaIcon name="ion-book-outline" />
  </p>
</template>

<style>
.va-icon + .va-icon {
  margin-left: 2rem;
}
</style>
