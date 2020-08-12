import baseEditForm from '../_classes/component/Component.form';

import PayButtonEditDisplay from './editForm/PayButton.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: PayButtonEditDisplay
    },
    {
      key: 'data',
      ignore: true,
    },
    {
      key: 'validation',
      ignore: true,
    },
  ], ...extend);
}
