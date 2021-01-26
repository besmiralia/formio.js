import Harness from '../../../test/harness';
import LogoComponent from './Logo';
import sinon from 'sinon';
import assert from 'power-assert';

import {
  comp1,
  comp2
} from './fixtures';

describe('HTML Component', () => {
  it('Should build an html component', () => {
    return Harness.testCreate(LogoComponent, comp1);
  });

  it('Should build an html component and ignore empty attribute name', () => {
    const comp = comp1;
    comp.attrs.push({
      'attr': '',
      'value': ''
    });

    return Harness.testCreate(LogoComponent, comp1);
  });

  it('setContent should not be called if it is not conditionally visible', () => {
    return Harness.testCreate(LogoComponent, comp2).then((component) => {
      const emit = sinon.spy(component, 'setContent');
      component.checkRefreshOn(null);
      assert.equal(emit.callCount, 0);
    });
  });
});
