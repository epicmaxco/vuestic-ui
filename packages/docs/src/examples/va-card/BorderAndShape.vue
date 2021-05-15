<template>
  <div class="row">
    <div class="flex md6 lg4">
      <va-card square outlined>
        <va-card-title>square and outlined</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</va-card-content>
      </va-card>
    </div>
    <div class="flex md6 lg4">
      <va-card :bordered="false">
        <va-card-title>Bordered false</va-card-title>
        <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</va-card-content>
      </va-card>
    </div>
  </div>
</template>
