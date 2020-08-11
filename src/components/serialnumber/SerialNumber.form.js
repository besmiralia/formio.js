import baseEditForm from '../_classes/component/Component.form';

import SerialNumberEditData from './editForm/SerialNumber.edit.data';
import SerialNumberEditDisplay from './editForm/SerialNumber.edit.display';

export default function(...extend) {
    return baseEditForm([
        {
            key: 'display',
            components: SerialNumberEditDisplay
        },
        {
            key: 'data',
            components: SerialNumberEditData
        }
    ], ...extend);
}
