export default [
  {
    key: 'labelPosition',
    ignore: true
  },
  {
    key: 'placeholder',
    ignore: true
  },
  {
    key: 'description',
    ignore: true
  },
  {
    key: 'tooltip',
    ignore: true
  },
  {
    key: 'autofocus',
    ignore: true
  },
  {
    key: 'disabled',
    ignore: true
  },
  {
    key: 'tabindex',
    ignore: true
  },
  {
    key: 'tableView',
    ignore: true
  },
  {
    key: 'modalEdit',
    ignore: true
  },
  {
    type: 'number',
    input: true,
    key: 'lineHeight',
    weight: 60,
    label: 'Size',
    placeholder: '',
    tooltip: 'The size of the line (ex. 1px, 2px).'
  },
  {
    type: 'textfield',
    input: true,
    key: 'lineColor',
    weight: 60,
    label: 'Color',
    placeholder: 'hex color (ex. #ccc or red)',
    tooltip: 'The hex color of the line.'
  },
  {
    type: 'textfield',
    input: true,
    key: 'className',
    weight: 60,
    label: 'CSS Class',
    placeholder: 'CSS Class',
    tooltip: 'The CSS class for this HTML element.'
  },
  {
    weight: 85,
    type: 'checkbox',
    label: 'Refresh On Change',
    tooltip: 'Rerender the field whenever a value on the form changes.',
    key: 'refreshOnChange',
    input: true
  },
];
