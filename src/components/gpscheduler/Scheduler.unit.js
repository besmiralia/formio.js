import Harness from '../../../test/harness';
import SchedulerComponent from './Scheduler';

import {
  comp1
} from './fixtures';

describe('Scheduler Component', () => {
  it('Should build a date time component', () => {
    return Harness.testCreate(SchedulerComponent, comp1);
  });
});
