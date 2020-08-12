import assert from 'power-assert';
import Harness from '../../../test/harness';
import PayButtonComponent from './PayButton';
import Formio from '../../Formio';

import {
  comp1
} from './fixtures';

describe('Pay Button Component', () => {
  it('Should build a payment button component', () => {
    return Harness.testCreate(PayButtonComponent, comp1).then((component) => {
      const buttons = Harness.testElements(component, 'button[type="button"]', 1);
      for (const button of buttons) {
        assert.equal(button.name, `data[${comp1.key}]`);
        assert.equal(button.innerHTML.trim(), comp1.label);
      }
    });
  });

  it('Test on error', (done) => {
    const element = document.createElement('div');
    Formio.createForm(element, {
      components: [
        {
          type: 'textfield',
          key: 'a',
          label: 'A',
          validate: {
            required: true
          }
        },
        {
          type: 'button',
          action: 'pay',
          key: 'pay',
          disableOnInvalid: true,
          input: true
        }
      ]
    }).then(form => {
      form.on('change', () => {
        const button = form.getComponent('submit');
        assert(button.disabled, 'Button should be disabled');
        button.emit('submitError');
        setTimeout(() => {
          console.log('Text Content: ', button.refs.buttonMessage.innerHTML);
          assert.equal(button.refs.buttonMessage.textContent, 'Please check the form and correct all errors before submitting.');
          done();
        }, 100);
      });
      form.submission = { data: {} };
    }).catch(done);
  });

  it('Should not change color and show message if the error is silent', (done) => {
    const formJson = {
      'type': 'form',
      'components': [
        {
          'label': 'Some Field',
          'type': 'textfield',
          'input': true,
          'key': 'someField'
        },
        {
          'label': 'Submit',
          'action': 'submit',
          'type': 'button',
          'input': true,
          'key': 'submit'
        }
      ]
    };
    const element = document.createElement('div');
    Formio.createForm(element, formJson, {
      hooks: {
        beforeSubmit: function(submission, callback) {
          callback({
            message: 'Err',
            component: submission.component,
            silent: true,
          }, submission);
        }
      }
    })
      .then(form => {
        const button = form.getComponent('submit');
        button.emit('submitButton', {
          state: button.component.state || 'submitted',
          component: button.component,
          instance: button
        });
        setTimeout(() => {
          assert(!button.refs.button.className.includes('btn-danger submit-fail'));
          assert(!button.refs.button.className.includes('btn-success submit-success'));
          assert(!button.refs.buttonMessageContainer.className.includes('has-success'));
          assert(!button.refs.buttonMessageContainer.className.includes('has-error'));
          assert(button.refs.buttonMessage.innerHTML === '');
          done();
        }, 100);
      })
      .catch(done);
  });
});
