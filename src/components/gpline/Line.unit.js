import Harness from '../../../test/harness';
import LABELComponent from './LABEL';
import sinon from 'sinon';
import assert from 'power-assert';

import {
  comp1,
  comp2
} from './fixtures';

describe('LABEL Component', () => {
  it('Should build an label component', () => {
    return Harness.testCreate(LABELComponent, comp1);
  });

  it('Should build an label component and ignore empty attribute name', () => {
    const comp = comp1;
    comp.attrs.push({
      'attr': '',
      'value': ''
    });

    return Harness.testCreate(LABELComponent, comp1);
  });

  it('setContent should not be called if it is not conditionally visible', () => {
    return Harness.testCreate(LABELComponent, comp2).then((component) => {
      const emit = sinon.spy(component, 'setContent');
      component.checkRefreshOn(null);
      assert.equal(emit.callCount, 0);
    });
  });
});
