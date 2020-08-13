import _ from 'lodash';
import Field from '../_classes/field/Field';
import Input from '../_classes/input/Input';

export default class PayButtonComponent extends Field {
  static schema(...extend) {
    return Input.schema({
      type: 'gppaybutton',
      label: 'Pay Now',
      key: 'pay',
      size: 'md',
      leftIcon: 'fa fa-credit-card',
      rightIcon: '',
      block: false,
      action: 'pay',
      payAmountField: '',
      persistent: false,
      disableOnInvalid: true,
      theme: 'primary',
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Pay Button',
      group: 'premium',
      icon: 'credit-card',
      documentation: 'http://help.form.io/userguide/#button',
      weight: 110,
      schema: PayButtonComponent.schema()
    };
  }

  get defaultSchema() {
    return PayButtonComponent.schema();
  }

  get inputInfo() {
    const info = super.elementInfo();
    info.type = 'button';
    info.attr.type = 'button';
    this.component.theme = this.component.theme || 'default';
    info.attr.class = `btn btn-${this.component.theme}`;
    if (this.component.size) {
      info.attr.class += ` btn-${this.component.size}`;
    }
    if (this.component.block) {
      info.attr.class += ' btn-block';
    }
    if (this.component.customClass) {
      info.attr.class += ` ${this.component.customClass}`;
    }
    info.content = this.t(this.component.label);
    return info;
  }

  get labelInfo() {
    return {
      hidden: true
    };
  }

  set loading(loading) {
    this.setLoading(this.refs.button, loading);
  }

  get skipInEmail() {
    return true;
  }

  // No label needed for buttons.
  createLabel() { }

  createInput(container) {
    this.refs.button = super.createInput(container);
    return this.refs.button;
  }

  get emptyValue() {
    return false;
  }

  getValue() {
    return this.dataValue;
  }

  get clicked() {
    return this.dataValue;
  }

  get defaultValue() {
    return false;
  }

  get className() {
    let className = super.className;
    className += ' form-group';
    return className;
  }

  render() {
    if (this.viewOnly || this.options.hideButtons) {
      this._visible = false;
    }
    return super.render(this.renderTemplate('button', {
      component: this.component,
      input: this.inputInfo,
    }));
  }

  attachButton() {
    this.addShortcut(this.refs.button);
    let onChange = null;
    let onError = null;

    this.on('requestPayment', (payInfo) => {
      this.loading = true;
      this.disabled = true;
      //open popup window here
      console.log('Payment Info', payInfo);
    }, true);
    this.on('paymentSuccessful', (paymentInfo) => {
      //submit the form
      this.submission.paymentInfo = paymentInfo;
    }, true);
    this.on('paymentError', (message) => {
      const resultMessage = _.isString(message) ? message : this.t(this.errorMessage('submitError'));
      this.loading = false;
      this.disabled = false;
      this.hasError = true;
      this.removeClass(this.refs.button, 'btn-success submit-success');
      this.addClass(this.refs.button, 'btn-danger submit-fail');
      this.removeClass(this.refs.buttonMessageContainer, 'has-success');
      this.addClass(this.refs.buttonMessageContainer, 'has-error');
      this.setContent(this.refs.buttonMessage, resultMessage);
    }, true);
    this.on('submitDone', (message) => {
      const resultMessage = _.isString(message) ? message : this.t('complete');
      this.loading = false;
      this.disabled = false;
      this.addClass(this.refs.button, 'btn-success submit-success');
      this.removeClass(this.refs.button, 'btn-danger submit-fail');
      this.addClass(this.refs.buttonMessageContainer, 'has-success');
      this.removeClass(this.refs.buttonMessageContainer, 'has-error');
      this.setContent(this.refs.buttonMessage, resultMessage);
    }, true);
    this.on('submitError', (message) => {
      const resultMessage = _.isString(message) ? message : this.t(this.errorMessage('submitError'));
      this.loading = false;
      this.disabled = false;
      this.hasError = true;
      this.removeClass(this.refs.button, 'btn-success submit-success');
      this.addClass(this.refs.button, 'btn-danger submit-fail');
      this.removeClass(this.refs.buttonMessageContainer, 'has-success');
      this.addClass(this.refs.buttonMessageContainer, 'has-error');
      this.setContent(this.refs.buttonMessage, resultMessage);
    }, true);
    onChange = (value, isValid) => {
      this.removeClass(this.refs.button, 'btn-success submit-success');
      if (isValid) {
        this.removeClass(this.refs.button, 'btn-danger submit-fail');
        if (this.hasError) {
          this.hasError = false;
          this.setContent(this.refs.buttonMessage, '');
          this.removeClass(this.refs.buttonMessageContainer, 'has-success');
          this.removeClass(this.refs.buttonMessageContainer, 'has-error');
        }
      }
    };
    onError = () => {
      this.hasError = true;
      this.removeClass(this.refs.button, 'btn-success submit-success');
      this.addClass(this.refs.button, 'btn-danger submit-fail');
      this.removeClass(this.refs.buttonMessageContainer, 'has-success');
      this.addClass(this.refs.buttonMessageContainer, 'has-error');
      this.setContent(this.refs.buttonMessage, this.t(this.errorMessage('submitError')));
    };

    this.on('change', (value, flags) => {
      let isValid = value.isValid;
      //check root validity only if disableOnInvalid is set and when it is not possible to make submission because of validation errors
      if (flags && flags.noValidate && (this.component.disableOnInvalid || this.hasError)) {
        isValid = flags.rootValidity || (this.root ? this.root.checkValidity(this.root.data, null, null, true) : true);
        flags.rootValidity = isValid;
      }
      this.loading = false;
      this.disabled = this.shouldDisabled || (this.component.disableOnInvalid && !isValid);
      this.setDisabled(this.refs.button, this.disabled);

      if (onChange) {
        onChange(value, isValid);
      }
    }, true);

    this.on('error', () => {
      this.loading = false;
      this.disabled = false;
      if (onError) {
        onError();
      }
    }, true);

    this.addEventListener(this.refs.button, 'click', this.onClick.bind(this));
    this.disabled = this.shouldDisabled;
  }

  attach(element) {
    this.loadRefs(element, {
      button: 'single',
      buttonMessageContainer: 'single',
      buttonMessage: 'single'
    });

    const superAttach = super.attach(element);
    this.attachButton();
    return superAttach;
  }
  /* eslint-enable max-statements */

  detach(element) {
    if (element && this.refs.button) {
      this.removeShortcut(this.refs.button);
    }
  }

  onClick(event) {
    this.triggerReCaptcha();
    // Don't click if disabled or in builder mode.
    if (this.disabled || this.options.attachMode === 'builder') {
      return;
    }
    this.dataValue = true;
    if (this.component.showValidations) {
      this.emit('checkValidity', this.data);
    }

    event.preventDefault();
    event.stopPropagation();
    this.loading = true;
    this.emit('requestPayment', {
      component: this.component,
      instance: this,
      amount: this.interpolate(`{{data['${this.component.payAmountField}']}}`, this.data)//Amount field or value from the data
    });
  }

  focus() {
    if (this.refs.button) {
      this.refs.button.focus();
    }
  }

  triggerReCaptcha() {
    if (!this.root) {
      return;
    }
    const recaptchaComponent = this.root.components.find((component) => {
      return component.component.type === 'recaptcha' &&
        component.component.eventType === 'buttonClick' &&
        component.component.buttonKey === this.component.key;
    });
    if (recaptchaComponent) {
      recaptchaComponent.verify(`${this.component.key}Click`);
    }
  }
}
