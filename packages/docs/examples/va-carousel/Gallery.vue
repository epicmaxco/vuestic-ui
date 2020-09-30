<template>
  <va-carousel
    pagination
    pagination-position="right"
    :width="1280"
    :height="800"
  >
    <template slot="content">
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">
        <h1 style="font-size: 5rem; color: #ffffff;">Vuestic</h1>
        <h2 style="font-size: 2rem; color: #ffffff;">UI framework for vuestic-admin</h2>
      </div>
    </template>
    <va-carousel-item>
      <img src="https://images.wallpaperscraft.com/image/spruce_branches_needles_183603_1280x800.jpg" alt="">
    </va-carousel-item>
    <va-carousel-item>
      <img src="https://images.wallpaperscraft.com/image/fern_leaves_branch_183649_1280x800.jpg" alt="">
    </va-carousel-item>
    <va-carousel-item>
      <img src="https://images.wallpaperscraft.com/image/spruce_branches_needles_128622_1280x800.jpg" alt="">
    </va-carousel-item>
  </va-carousel>
</template>
