import baseEditForm from '../_classes/component/Component.form';

//import UserLookupEditData from './editForm/UserLookup.edit.data';
import UserLookupEditMapping from './editForm/UserLookup.edit.mapping';
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
      ignore: true
    },
    {
      key: 'mapping',
      label: 'Field Mapping',
      weight: 15,
      components: UserLookupEditMapping
    },
    {
      key: 'validation',
      components: UserLookupEditValidation
    }
  ], ...extend);
}
