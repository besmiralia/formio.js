import baseEditForm from '../_classes/component/Component.form';
import LogoEditDisplay from './editForm/Logo.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: LogoEditDisplay,
    },
  ], ...extend);
}
