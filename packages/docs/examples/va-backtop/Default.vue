<template>
  <div>
    <va-backtop
      target=".base-layout__main"
      :visibility-height="0"
    />

    <va-checkbox v-model="show" label="Show Text" />
    <p v-if="show">{{ lorem }}</p>
  </div>
</template>

<script>
import VaBacktop from '../../../ui/src/components/vuestic-components/va-backtop/VaBacktop'
export default {
  components: { VaBacktop },
  data () {
    return {
      show: false,
      lorem: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo officia odio eaque at consequuntur quam tempora beatae quas quo facilis deserunt, dolor, exercitationem rerum autem. Sunt nemo omnis iste. Ad adipisci sequi exercitationem nulla fugiat ullam ipsam odio ab, libero reiciendis est earum aut. Illo, reprehenderit repellat, odit sed doloribus ex maiores voluptatem culpa aut aperiam ducimus blanditiis excepturi debitis eveniet labore, magnam neque. Expedita repellendus voluptas ipsum dolores quam fuga reiciendis aut voluptates dolorum perferendis neque explicabo dolore a praesentium illum accusantium, cumque veritatis nulla quasi totam, sit dignissimos corporis temporibus facilis? Maxime magni ipsa iure amet deserunt illum nihil quasi fugit voluptatem minus tempore, exercitationem dolores, alias veniam! Ducimus officiis veritatis magnam porro commodi eos delectus amet labore nam. Non minima cumque nihil eum assumenda, optio ad commodi praesentium! Eveniet quidem deserunt aliquam temporibus omnis possimus eaque laborum corrupti sed earum, saepe excepturi nesciunt in reprehenderit maxime culpa itaque, eligendi tempora ex quibusdam. Tempore impedit dignissimos dolor reprehenderit sapiente velit ex, alias quis iusto excepturi. A reiciendis repellat natus aliquam officiis tempora ipsum, accusantium debitis odio molestiae? Placeat, ullam numquam ducimus quae rerum perferendis expedita repellendus eos impedit. Cumque suscipit qui fugit asperiores aliquid ullam veritatis, sequi ab at ipsum odio ipsa consectetur rem deleniti omnis, non in fugiat animi error. Explicabo amet soluta ullam delectus fugiat voluptatibus nemo nesciunt repellendus nihil vel voluptate inventore tenetur laborum omnis voluptatum eius harum quidem aspernatur, non obcaecati itaque. Dicta recusandae eligendi laboriosam neque illo cumque iusto earum libero et ducimus modi dignissimos dolores harum ex cupiditate, qui magnam molestiae doloremque. Exercitationem sed, hic quo doloribus vero ullam vel laboriosam a error adipisci nam fugit reprehenderit neque numquam asperiores magni. Similique deserunt et aut molestias quisquam eaque esse quod quia suscipit. Possimus vel explicabo reprehenderit eius, optio doloribus molestiae id pariatur quae ea officia distinctio sapiente eum dolorem sunt similique esse nesciunt amet consectetur non mollitia voluptatum dicta deserunt totam. Consectetur quis tempore vero quae tenetur laboriosam labore natus quidem porro ratione repellat quo, ex inventore quaerat dolorem, deserunt eius molestiae quisquam corrupti, numquam impedit doloribus cumque nisi delectus. Suscipit, cumque perspiciatis nemo eius impedit placeat in doloribus. Omnis asperiores, in vitae repudiandae ratione commodi quia nobis fugit ab similique quos nam, molestiae quaerat quo natus? Harum libero, repellat obcaecati, officiis itaque numquam suscipit nisi eligendi voluptates, tempora quidem eum maxime placeat tempore adipisci dolor iste. Autem omnis aperiam magni quo. Doloremque iure ad tempore quas, molestias quos recusandae repellat rerum excepturi aut voluptatem vero pariatur quibusdam praesentium obcaecati aspernatur nam eveniet sed voluptatum numquam accusamus quo. Id molestias optio at a! Laudantium quos soluta eaque quia fugit, fugiat a reiciendis deleniti saepe commodi optio blanditiis rem velit vero, modi, temporibus odio mollitia perspiciatis officia. Nobis, eligendi magni culpa pariatur aperiam omnis cum hic fugiat fuga nemo quia obcaecati provident. Nesciunt corrupti eveniet quos nisi facere earum, maxime explicabo similique eius. Esse dolores iusto sapiente veritatis, corporis, nesciunt officiis atque unde nam, fuga consequuntur illo quasi molestiae inventore laborum dolore vel!',
    }
  },
}
</script>
