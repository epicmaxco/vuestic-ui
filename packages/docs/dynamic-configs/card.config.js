import getConfigForComponent from './content.config.js'

const CARD_CONTENT_CONFIG = {
  vaComponent: 'va-card',
  sections: [
    {
      type: 'screenTitle',
      header: 'Screen Title',
      desc:
        'Documentation is a set of documents n on paper, or online, or on digital or analog media, such as audio tape or CDs. Examples are user guides, white papers, on-line help, quick-reference guides. Paper or hard-copy documentation has become less common.'
    },
    {
      type: 'basicElement',
      header: 'Basic Element',
      desc:
        'Documentation is a set of documents n on paper, or online, or on digital or analog media, such as audio tape or CDs. Examples are user guides, white papers, on-line help, quick-reference guides. Paper or hard-copy documentation has become less common.',
      dynamicContent: [
        {
          component: 'pre',
          text: `<!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZFzsdfzA
    <div class="alert alert-warning" role="alert">
      A simple warning alert—check it out!
    </div>`
        },
        {
          component: 'p',
          text:
            'Documentation is a set of documents n on paper, or online, or on digital or analog media, such as audio tape or CDs. Examples are user guides, white papers, on-line help, quick-reference guides. Paper or hard-copy documentation has become less common.'
        },
        {
          component: 'ul',
          children: [
            { component: 'li', text: 'list item' },
            { component: 'li', text: 'list item' },
            { component: 'li', text: 'list item' }
          ]
        }
      ]
    },
    {
      type: 'advancedElement',
      header: 'Advanced Element',
      subheader: 'How to remove space between 2 chinese characters?',
      desc:
        'Documentation is a set of documents n on paper, or online, or on digital or analog media, such as audio tape or CDs. Examples are user guides, white papers, on-line help, quick-reference guides. Paper or hard-copy has become less common.',
      dynamicContent: [
        {
          component: 'pre',
          text: `<div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src=".../800x400?auto=yes&bg=777&fg=555&text=First”>
      </div>
    </div>`
        },
        {
          component: 'va-card',
          componentProps: {
            outlined: true
          },
          children: [
            {
              component: 'va-card-title',
              text: 'title text'
            },
            {
              component: 'va-card-content',
              text: 'Va card content',
              configStyle: 'font-weight: bold'
            }
          ]
        }
      ]
    },
    {
      type: 'api',
      header: 'API',
      subheader: 'How to remove space between 2 chinese characters?',
      desc:
        'Documentation is a set of documents n on paper, or online, or on digital or analog media, such as audio tape or CDs. Examples are user guides, white papers, on-line help, quick-reference guides. Paper or hard-copy documentation has become less common.',
      tableData: [
        {
          property: 'propName',
          description: 'propDescription',
          type: 'Boolean',
          default: 'false',
          version: '777'
        },
        {
          property: 'propName',
          description: 'propDescription',
          type: 'Boolean',
          default: 'false',
          version: '777'
        },
        {
          property: 'propName',
          description: 'propDescription',
          type: 'Boolean',
          default: 'false',
          version: '777'
        },
        {
          property: 'propName',
          description: 'propDescription',
          type: 'Boolean',
          default: 'false',
          version: '777'
        },
        {
          property: 'propName',
          description: 'propDescription',
          type: 'Boolean',
          default: 'false',
          version: '777'
        }
      ]
    },
    {
      type: 'faq',
      title: 'How to remove space between 2 chinese characters?',
      desc:
        'Documentation is a set of documents n on paper, or online, or on digital or analog media, such as audio tape or CDs. Examples are user guides, white papers, on-line help, quick-reference guides. Paper or hard-copy documentation has become less common.'
    }
  ]
}

export default getConfigForComponent(CARD_CONTENT_CONFIG)
