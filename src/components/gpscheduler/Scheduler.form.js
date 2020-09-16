import baseEditForm from '../_classes/component/Component.form';
import SchedulerEditDisplay from './editForm/Scheduler.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: SchedulerEditDisplay
    }
  ], ...extend);
}
