import Harness from '../../../test/harness';
import GovPilotAddressComponent from './GovPilotAddress';

import {
  comp1
} from './fixtures';

describe('Address Component', () => {
  it('Should build an address component', () => {
    return Harness.testCreate(GovPilotAddressComponent, comp1);
  });
});
