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
    type: 'textfield',
    input: true,
    key: 'className',
    weight: 60,
    label: 'CSS Class',
    placeholder: 'CSS Class',
    tooltip: 'The CSS class for this HTML element.'
  },
  {
    type: 'textarea',
    input: true,
    editor: 'ace',
    rows: 10,
    as: 'html',
    label: 'Content',
    tooltip: 'The content of this HTML element.',
    defaultValue: '<div class="well">Content</div>',
    key: 'content',
    weight: 11
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
