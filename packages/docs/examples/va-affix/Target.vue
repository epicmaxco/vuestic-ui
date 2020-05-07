<template>
  <div style="height: 300px; overflow-y: scroll;" ref="target">
    <p>
      {{text}}
    </p>
    <client-only>
      <va-affix :offset-top="30" :offset-bottom="0" :target="$refs.target">
        <div style="padding: 10px 30px; background-color: lightblue;">
          Custom target: top 30, bottom 0.
        </div>
      </va-affix>
    </client-only>
    <p>
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: `
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi aspernatur atque blanditiis,
       consequatur corporis deleniti exercitationem expedita facilis fugit inventore laborum nam nobis odit, quae quas repudiandae vitae voluptates.`,
    }
  },
}
</script>
