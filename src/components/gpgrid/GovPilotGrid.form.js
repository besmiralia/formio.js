import baseEditForm from '../_classes/component/Component.form';

import GovPilotGridEditData from '../editgrid/editForm/EditGrid.edit.data';
import GovPilotGridEditDisplay from '../editgrid/editForm/EditGrid.edit.display';
import GovPilotGridEditTemplates from '../editgrid/editForm/EditGrid.edit.templates';
import GovPilotGridEditValidation from '../editgrid/editForm/EditGrid.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      label: 'Templates',
      key: 'templates',
      weight: 5,
      components: GovPilotGridEditTemplates
    },
    {
      key: 'display',
      components: GovPilotGridEditDisplay,
    },
    {
      key: 'data',
      components: GovPilotGridEditData,
    },
    {
      key: 'validation',
      components: GovPilotGridEditValidation
    }
  ], ...extend);
}
