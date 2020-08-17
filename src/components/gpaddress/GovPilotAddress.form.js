import baseEditForm from '../_classes/component/Component.form';

import GovPilotAddressEditData from './editForm/GovPilotAddress.edit.data';
import GovPilotAddressEditDisplay from './editForm/GovPilotAddress.edit.display';
import GovPilotAddressEditProvider from './editForm/GovPilotAddress.edit.provider';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'data',
      components: GovPilotAddressEditData,
    },
    {
      key: 'display',
      components: GovPilotAddressEditDisplay,
    }/*,
    {
      label: 'Provider',
      key: 'provider',
      weight: 15,
      components: GovPilotAddressEditProvider,
    },*/
  ], ...extend);
}
