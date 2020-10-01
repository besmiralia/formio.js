import baseEditForm from '../_classes/component/Component.form';
import LineEditDisplay from './editForm/Line.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: LineEditDisplay,
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
      ignore: true,
    },
    {
      key: 'layout',
      ignore: true,
    },
    {
      key: 'api',
      ignore: true,
    },
  ], ...extend);
}
