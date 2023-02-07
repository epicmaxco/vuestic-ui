import {colorsClassesType} from './code/colors-classes-type';

const columns = [
  { title: 'prop', type: 'markdown' },
  { title: 'type', type: 'code' },
  { title: 'Description', type: 'markdown' },
]

const tableData = [
  ['colorsClasses', colorsClassesType, 'colorsClasses.configDescription'],
]

export default definePageConfig({
  blocks: [
    block.title('colorsClasses.title'),
    block.paragraph('colorsClasses.about'),
    block.paragraph('colorsClasses.defaultColors'),
    block.paragraph('colorsClasses.readMoreAboutDefaultColor'),

    block.subtitle('colorsClasses.setup.title'),
    block.paragraph('colorsClasses.setup.about'),
    block.code('setup-example'),
    block.paragraph('colorsClasses.setup.explanation'),
    block.paragraph('colorsClasses.setup.example'),
    block.example('Default'),

    block.subtitle('colorsClasses.api.title'),
    block.table(columns, tableData),
  ],
})
