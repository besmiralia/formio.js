import baseEditForm from '../_classes/component/Component.form';

import SelectEditData from './editForm/UserLookup.edit.data';
import SelectEditDisplay from './editForm/UserLookup.edit.display';
import SelectEditValidation from './editForm/UserLookup.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: SelectEditDisplay
    },
    {
      key: 'data',
      components: SelectEditData
    },
    {
      key: 'validation',
      components: SelectEditValidation
    }
  ], ...extend);
}
