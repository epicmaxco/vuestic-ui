export default definePageConfig({
  blocks: [
    block.title('Input Mask'),
    block.paragraph('Masks are used to format the input value. Instead of having built-in masks we provide a composable, that you can use with any input.'),
    block.paragraph('Vuestic UI comes with a few predefined masks. You need to manually import them and use with `useInputMask` composable.'),
    block.paragraph('`useInputMask` composable is designed to work with Regex based masks. It is a flexible solution that allows you to create any mask you need.'),

    block.subtitle('Examples'),

    block.example('DefaultRegex', {
      title: 'Regex mask',
      description: 'When creating a mask we use regex syntax, that allows you to deeply customize the mask.',
    }),

    block.collapse('Regex basic syntax', [
      block.paragraph('Here is a list of regex tokens that you can use to create a mask:'),

      block.list([
        '`\\d` - any digit',
        '`\\w` - any word character',
        '`.` - any character',
        '`[a-z]` - any character from a to z. Notice, can be also `[a-f]` - any character from a to f',
        '`[0-9]` - any digit',
      ]),

      block.paragraph('Mask support quantifiers syntax, allowing you to specify how many times the character should appear. Here are some examples:'),

      block.list([
        '`\\d?` - any digit or nothing',
        '`\\d*` - any number of digits',
        '`\\d+` - at least one digit',
        '`\\d{3}` - exactly 3 digits',
        '`\\d{3,}` - at least 3 digits',
        '`\\d{3,5}` - from 3 to 5 digits',
      ]),

      block.paragraph('Obviously, you can replace `\\d` with any token. You can also use groups to group characters, for example `(\\d - \\d)?`'),
      block.alert('Notice that maximum repetition is 10.', 'warning'),

      block.paragraph('In case you need to use brackets in the mask, you need to escape them: `\\(\\d{3}\\)`'),

      block.paragraph('You can also use `|` to separate different options: `\\d{3}|\\w{3}`'),
    ]),

    block.example('CreditCard', {
      title: 'Credit card',
      description: 'You can easily define credit card mask with regex',
    }),

    block.example('Date', {
      title: 'Date mask',
      description: 'Date mask is a predefined mask that allows you to format the date input.',
    }),

    block.example('Numeral', {
      title: 'Numeral mask',
      description: 'Numeral mask is a predefined mask that allows you to format the number input. You can decide if decimal is allowed and how many decimal places are allowed.',
    }),

    block.example('Phone', {
      title: 'Phone mask',
      description: 'There is no predefined phone mask. You can create your own mask using regex syntax. This is an example for Ukrainian phone number in internationl',
    }),

    block.paragraph('You can also create regex masks for any other phone format and use format functions based on user input. You can also write format function in plain JS and we will handle the rest for you.'),

    block.example('PhoneExtended')
  ]
})
