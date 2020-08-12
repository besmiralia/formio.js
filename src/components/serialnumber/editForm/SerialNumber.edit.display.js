export default [/*
  {
    type: 'select',
    input: true,
    key: 'tag',
    label: 'Display as',
    tooltip: 'This setting will decide how to render the component.',
    weight: 10,
    defaultValue: 'input',
    dataSrc: 'values',
    data: {
      values: [
        { label: 'Textbox', value: 'input' },
        { label: 'Label', value: 'div' },
      ]
    }
  },*/
  {
    weight: 320,
    type: 'textfield',
    input: true,
    key: 'prefix',
    label: 'Prefix'
  },
  {
    weight: 330,
    type: 'textfield',
    input: true,
    key: 'suffix',
    label: 'Suffix'
  },
];
