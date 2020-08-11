import baseEditForm from '../_classes/component/Component.form';

import LabelEditDisplay from './editForm/Label.edit.display';
import LabelEditLogic from './editForm/Label.edit.logic';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: LabelEditDisplay,
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
      components: LabelEditLogic,
    },
  ], ...extend);
}
