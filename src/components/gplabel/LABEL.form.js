import baseEditForm from '../_classes/component/Component.form';

import LABELEditDisplay from './editForm/LABEL.edit.display';
import LABELEditLogic from './editForm/LABEL.edit.logic';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: LABELEditDisplay,
    },
    {
      key: 'data',
      ignore: true,
    },
    {
      key: 'validation',
      ignore: true,
    },
    {
      key: 'logic',
      components: LABELEditLogic,
    },
  ], ...extend);
}
