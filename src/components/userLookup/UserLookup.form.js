import baseEditForm from '../_classes/component/Component.form';

import UserLookupEditData from './editForm/UserLookup.edit.data';
import UserLookupEditDisplay from './editForm/UserLookup.edit.display';
import UserLookupEditValidation from './editForm/UserLookup.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: UserLookupEditDisplay
    },
    {
      key: 'data',
      components: UserLookupEditData
    },
    {
      key: 'validation',
      components: UserLookupEditValidation
    }
  ], ...extend);
}
