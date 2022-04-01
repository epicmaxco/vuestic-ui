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
        <va-icon class="icon ion-md-book" tag="ion-icon" />
        <va-icon name="book" tag="ion-icon" />
      </p>
  </div>
</template>
<style lang="scss">
p {
  i + i {
    margin-left: 2rem;
  }
}
</style>
