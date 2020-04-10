export default {
    component: "div",
    text: 'child1 works',
    style: 'font-weight: bold;',
    children: [
        {
        component: "p",
        text: 'child block text',
        style: 'font-style: italic; color: red;'
        }
    ]
}
