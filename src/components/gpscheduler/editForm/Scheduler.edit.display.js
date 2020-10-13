import Formio from '../../../Formio';
export default [
  {
    type: 'select',
    input: true,
    key: 'users',
    label: 'Allowed Users',
    tooltip: 'Select the users that can be scheduled',
    weight: 31,
    lazyLoad: true,
    multiple: true,
    validate: {
      multiple: true,
    },
    defaultValue: '',
    valueProperty: 'id',
    dataSrc: 'url',
    data: {
      url: `https://form-${Formio.getHost()}/forms/users`
    },
    template: '<span>{{ item.name }}</span>',
    selectThreshold: 0.3,
    searchField: 'q',
    minSearch: 0,
  },
  {
    type: 'textfield',
    input: true,
    key: 'format',
    label: 'Format',
    placeholder: 'Format',
    description: 'Use formats provided by <a href="https://github.com/angular-ui/bootstrap/tree/master/src/dateparser/docs#uibdateparsers-format-codes" target="_blank">DateParser Codes</a>',
    tooltip: 'The date format for displaying the datetime value.',
    weight: 52
  }
];
