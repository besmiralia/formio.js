import moment from 'moment';
import Field from '../_classes/field/Field';

export default class SchedulerComponent extends Field {
  static schema(...extend) {
    return Field.schema({
      type: 'scheduler',
      label: 'Scheduler',
      key: 'scheduler',
      format: 'dddd, MMM DD, YYYY HH:mm',
      readOnly: true,
      disabled: true,
      dataValue: {},
      users: [],
      customOptions: {},
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Scheduler',
      group: 'advanced',
      icon: 'calendar-alt',
      documentation: 'http://help.form.io/userguide/#calendar',
      weight: 45,
      schema: SchedulerComponent.schema()
    };
  }

  get defaultSchema() {
    return SchedulerComponent.schema();
  }

  static get schedulerAddButtonRef() {
    return 'schedulerAdd';
  }

  static get schedulerRemoveButtonRef() {
    return 'schedulerClear';
  }

  static get searchInputRef() {
    return 'searchInput';
  }

  get searchInput() {
    return this.refs
      ? (this.refs[SchedulerComponent.searchInputRef] || null)
      : null;
  }

  get addScheduleButton() {
    return this.refs
      ? (this.refs[SchedulerComponent.schedulerAddButtonRef] || null)
      : null;
  }

  get removeScheduleButton() {
    return this.refs
      ? (this.refs[SchedulerComponent.schedulerRemoveButtonRef] || null)
      : null;
  }
  onAddScheduleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.emit('openScheduler', {
      component: this.component,
      instance: this,
      schedulerEvent: this.dataValue,
      users: this.component.users
    });
  }
  onRemoveScheduleClick(event) {
    event.preventDefault();
    this.setValue({});
    //this.redraw();
  }

  attachScheduler() {
    if (this.addScheduleButton) {
      //const element = this;
      this.addEventListener(this.addScheduleButton, 'click', this.onAddScheduleClick.bind(this));
    }
    if (this.removeScheduleButton) {
      this.addEventListener(this.removeScheduleButton, 'click', this.onRemoveScheduleClick.bind(this));
    }

    this.off('eventScheduled');
    this.on('eventScheduled', (eventInfo) => {
      if (eventInfo) {
        this.setValue(eventInfo);
        //this.triggerChange();
      }
    }, true);

    const onChange = (value, isValid) => {
      console.log('OnChange fired', value, isValid);
      /*
      this.removeClass(this.refs.button, 'btn-success submit-success');
      if (isValid) {
        this.removeClass(this.refs.button, 'btn-danger submit-fail');
        if (this.hasError) {
          this.hasError = false;
          this.setContent(this.refs.buttonMessage, '');
          this.removeClass(this.refs.buttonMessageContainer, 'has-success');
          this.removeClass(this.refs.buttonMessageContainer, 'has-error');
        }
      }*/
    };
    this.on('change', (value, flags) => {
      let isValid = value.isValid;
      if (flags && flags.noValidate && (this.component.disableOnInvalid || this.hasError)) {
        isValid = flags.rootValidity || (this.root ? this.root.checkValidity(this.root.data, null, null, true) : true);
        flags.rootValidity = isValid;
      }
      if (onChange) {
        onChange(value, isValid);
      }
    });
  }
  attach(element) {
    this.loadRefs(element, {
      [SchedulerComponent.schedulerAddButtonRef]: 'single',
      [SchedulerComponent.schedulerRemoveButtonRef]: 'single',
      [SchedulerComponent.searchInputRef]: 'single',
    });

    const superAttach = super.attach(element);
    this.attachScheduler();
    return superAttach;
  }

  get emptyValue() {
    return {};
  }
  getValue() {
    return this.dataValue;
  }
  setValue(value, flags = {}) {
    //const changed = this.updateValue(value, flags);
    //this.dataValue = value;
    super.setValue(value, flags);
    this.redraw();
    //return changed;
  }

  createWrapper() {
    return false;
  }

  render() {
    const value = this.dataValue && this.dataValue.UNAME ? `${this.dataValue.UNAME} - ${this.getFormattedDate()}` : '';
    return super.render(this.renderTemplate('scheduler', {
      component: this.component,
      instance: this,
      description: value,
      ref: {
        schedulerAdd: SchedulerComponent.schedulerAddButtonRef,
        schedulerClear: SchedulerComponent.schedulerRemoveButtonRef,
        searchInput: SchedulerComponent.searchInputRef,
      },
    }));
  }

  focus() {
    if (this.refs.input && this.refs.input[0]) {
      const sibling = this.refs.input[0].nextSibling;
      if (sibling) {
        sibling.focus();
      }
    }
  }

  getFormattedDate() {
    if (!this.dataValue || !this.dataValue.Start) return '';
    const startDate = this.dataValue.Start;
    return (startDate ? moment(startDate).format(this.component.format) : '');
  }

  getValueAsString(value) {
    return (value ? moment(value, this.component.dataFormat).format(this.component.format) : value) || '';
  }
}
