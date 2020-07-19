import baseEditForm from '../_classes/component/Component.form';

import SerialNumberEditData from './editForm/SerialNumber.edit.data';
import SerialNumberEditDisplay from './editForm/SerialNumber.edit.display';
import SerialNumberEditValidation from './editForm/SerialNumber.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: SerialNumberEditDisplay
    },
    {
      key: 'data',
      components: SerialNumberEditData
    },
    {
      key: 'validation',
      components: SerialNumberEditValidation
    }
  ], ...extend);
}
