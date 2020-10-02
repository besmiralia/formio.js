import baseEditForm from '../_classes/component/Component.form';

import MeasureEditData from './editForm/Measure.edit.data';
import MeasureEditDisplay from './editForm/Measure.edit.display';
import MeasureEditValidation from './editForm/Measure.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: MeasureEditDisplay
    },
    {
      key: 'data',
      components: MeasureEditData
    },
    {
      key: 'validation',
      components: MeasureEditValidation
    }
  ], ...extend);
}
