<template>
  <div class="flex flex-wrap gap-5">
    <va-card square outlined>
      <va-card-title>square and outlined</va-card-title>
      <va-card-content
        >Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.</va-card-content
      >
    </va-card>

    <va-card :bordered="false">
      <va-card-title>Bordered false</va-card-title>
      <va-card-content
        >Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.</va-card-content
      >
    </va-card>
  </div>
</template>
