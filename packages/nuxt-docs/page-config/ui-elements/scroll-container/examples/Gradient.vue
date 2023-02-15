<template>
  <va-scroll-container
    style="max-height: 300px"
    color="danger"
    vertical
    gradient
  >
    <va-list>
      <va-list-item
        v-for="character in starWarsCharacters"
        :key="character"
      >
        <va-icon
          name="star"
          color="primary"
          size="small"
          style="margin-right: 0.5rem"
        />
        {{ character }}
      </va-list-item>
    </va-list>
  </va-scroll-container>
</template>

<script setup>
const starWarsCharacters = [
  "Luke Skywalker",
  "C-3PO",
  "R2-D2",
  "Darth Vader",
  "Leia Organa",
  "Owen Lars",
  "Beru Whitesun lars",
  "R5-D4",
  "Biggs Darklighter",
  "Obi-Wan Kenobi",
  "Anakin Skywalker",
  "Wilhuff Tarkin",
  "Chewbacca",
  "Han Solo",
  "Greedo",
  "Jabba Desilijic Tiure",
  "Wedge Antilles",
  "Jek Tono Porkins",
  "Yoda",
  "Palpatine",
];
</script>
