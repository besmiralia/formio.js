import autocompleter from 'autocompleter';
import _ from 'lodash';

import Formio from '../../Formio';

import Field from '../_classes/field/Field';
import NestedComponent from '../_classes/nested/NestedComponent';
import ContainerComponent from '../container/Container';

export const GovPilotAddressComponentMode = {
  Autocomplete: 'autocomplete',
  Manual: 'manual',
};

const AddressLoadingClass = 'address-loading';
const RemoveValueIconHiddenClass = 'address-autocomplete-remove-value-icon--hidden';
const ChildConditional = 'show = _.get(instance, \'parent.manualMode\', false);';

export default class GovPilotAddressComponent extends ContainerComponent {
  static schema(...extend) {
    return ContainerComponent.schema({
      type: 'gpaddress',
      label: 'Address',
      key: 'gpaddress',
      switchToManualModeLabel: 'Can\'t find address? Switch to manual mode.',
      provider: 'govpilot',
      providerOptions: {
        params: {
          uid: Formio.getAccount()
        }
      },
      manualModeViewString: '',
      hideLabel: false,
      disableClearIcon: false,
      enableManualMode: false,
      components: [
        {
          label: 'Address 1',
          tableView: false,
          key: 'address1',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional,
        },
        {
          label: 'Address 2',
          tableView: false,
          key: 'address2',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional,
        },
        {
          label: 'City',
          tableView: false,
          key: 'city',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional,
        },
        {
          label: 'State',
          tableView: false,
          key: 'state',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional,
        },
        {
          label: 'Country',
          tableView: false,
          key: 'country',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional,
        },
        {
          label: 'Zip Code',
          tableView: false,
          key: 'zip',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional,
        },
      ],
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'GovPilot Address',
      group: 'advanced',
      icon: 'thumbtack',
      documentation: 'http://help.form.io/userguide/#address',
      weight: 35,
      schema: GovPilotAddressComponent.schema(),
    };
  }

  mergeSchema(component = {}) {
    let { defaultSchema } = this;

    if (component.components) {
      defaultSchema = _.omit(defaultSchema, 'components');
    }

    return _.defaultsDeep(component, defaultSchema);
  }

  init() {
    this.components = this.components || [];
    if (this.builderMode || this.manualModeEnabled) {
      NestedComponent.prototype.addComponents.call(this, this.manualMode ? this.address : {});
    }
    Field.prototype.init.call(this);

    if (!this.builderMode) {
      if (this.component.provider) {
        const {
          provider,
          providerOptions,
        } = this.component;
        if (!providerOptions.params.uid && this.root && this.root.form && this.root.form.uid) providerOptions.params.uid = this.root.form.uid;
        this.provider = this.initializeProvider(provider, providerOptions);
      }
    }
  }

  initializeProvider(provider, options = {}) {
    const Provider = Formio.Providers.getProvider('address', provider);
    return new Provider(options);
  }

  get emptyValue() {
    return this.manualModeEnabled
      ? {
        mode: GovPilotAddressComponentMode.Autocomplete,
        address: {},
      }
      : {};
  }

  get mode() {
    if (!this.manualModeEnabled) {
      return GovPilotAddressComponentMode.Autocomplete;
    }

    return this.dataValue?.mode ?? GovPilotAddressComponentMode.Autocomplete;
  }

  set mode(value) {
    if (this.manualModeEnabled) {
      this.dataValue.mode = value;
    }
  }

  get autocompleteMode() {
    return this.mode === GovPilotAddressComponentMode.Autocomplete;
  }

  get manualMode() {
    return this.mode === GovPilotAddressComponentMode.Manual;
  }

  get manualModeEnabled() {
    return !this.isMultiple && Boolean(this.component.enableManualMode);
  }

  restoreComponentsContext() {
    this.getComponents().forEach((component) => {
      component.data = this.address;
      component.setValue(component.dataValue, {
        noUpdateEvent: true,
      });
    });
  }

  get isMultiple() {
    return Boolean(this.component.multiple);
  }

  get address() {
    if (this.isMultiple) {
      return _.isArray(this.dataValue) ? this.dataValue : [this.dataValue];
    }
    // Manual mode is not implementing for multiple value
    return (this.manualModeEnabled && this.dataValue) ? this.dataValue.address : this.dataValue;
  }

  set address(value) {
    if (this.manualModeEnabled && !this.isMultiple) {
      this.dataValue.address = value;
    }
    else {
      this.dataValue = value;
    }
  }

  get defaultValue() {
    return this.isMultiple ? [this.emptyValue] : this.emptyValue;
  }

  get defaultSchema() {
    return GovPilotAddressComponent.schema();
  }

  isValueInLegacyFormat(value) {
    return value && !value.mode;
  }

  normalizeValue(value) {
    return (this.manualModeEnabled && this.isValueInLegacyFormat(value))
      ? {
        mode: GovPilotAddressComponentMode.Autocomplete,
        address: value,
      }
      : value;
  }

  setValue(value, flags = {}) {
    const changed = Field.prototype.setValue.call(this, value, flags);

    if (this.manualMode) {
      this.restoreComponentsContext();
    }

    if (changed) {
      this.redraw();
    }

    return changed;
  }

  static get modeSwitcherRef() {
    return 'modeSwitcher';
  }

  static get removeValueIconRef() {
    return 'removeValueIcon';
  }

  static get searchInputRef() {
    return 'searchInput';
  }

  static get addRowButtonRef() {
    return 'addButton';
  }

  static get removeRowButtonRef() {
    return 'removeRow';
  }

  get modeSwitcher() {
    return this.refs
      ? (this.refs[GovPilotAddressComponent.modeSwitcherRef] || null)
      : null;
  }

  get removeValueIcon() {
    return this.refs
      ? (this.refs[GovPilotAddressComponent.removeValueIconRef] || null)
      : null;
  }

  get searchInput() {
    return this.refs
      ? (this.refs[GovPilotAddressComponent.searchInputRef] || null)
      : null;
  }

  get addRowButton() {
    return this.refs
      ? (this.refs[GovPilotAddressComponent.addRowButtonRef] || null)
      : null;
  }

  get removeRowButton() {
    return this.refs
      ? (this.refs[GovPilotAddressComponent.removeRowButtonRef] || null)
      : null;
  }

  get searchInputAttributes() {
    const attr = {
      name: this.options.name,
      type: 'text',
      class: 'form-control',
      lang: this.options.language,
      tabindex: this.component.tabindex || 0,
    };

    if (this.component.placeholder) {
      attr.placeholder = this.t(this.component.placeholder);
    }

    if (this.disabled) {
      attr.disabled = 'disabled';
    }

    _.defaults(attr, this.component.attributes);

    return attr;
  }

  get templateName() {
    return 'address';
  }

  get gridTemplateName() {
    return 'multiValueTable';
  }

  get rowTemplateName() {
    return 'multiValueRow';
  }

  get hasChildren() {
    return !this.isMultiple && (this.builderMode || this.manualModeEnabled);
  }

  get addAnother() {
    return this.t(this.component.addAnother || 'Add Another');
  }

  renderElement(value) {
    return this.renderTemplate(this.templateName, {
      children: this.hasChildren ? this.renderComponents() : '',
      nestedKey: this.nestedKey,
      inputAttributes: this.searchInputAttributes,
      ref: {
        modeSwitcher: GovPilotAddressComponent.modeSwitcherRef,
        removeValueIcon: GovPilotAddressComponent.removeValueIconRef,
        searchInput: GovPilotAddressComponent.searchInputRef,
      },
      displayValue: this.getDisplayValue(value),
      mode: {
        autocomplete: this.autocompleteMode,
        manual: this.manualMode,
      },
    });
  }

  renderRow(value, index) {
    return this.renderTemplate(this.rowTemplateName, {
      index,
      disabled: this.disabled,
      element: `${this.renderElement(value, index)}`,
    });
  }

  renderGrid() {
    return this.renderTemplate(this.gridTemplateName, {
      rows: this.address.map(this.renderRow.bind(this)).join(''),
      disabled: this.disabled,
      addAnother: this.addAnother,
    });
  }

  render() {
    if (this.isMultiple) {
      return super.render(this.renderGrid());
    }

    return super.render(this.renderElement());
  }

  addRow() {
    this.address = this.address.concat(this.emptyValue);
    super.redraw();
  }

  attach(element) {
    const result = ((this.builderMode || this.manualMode) ? super.attach : Field.prototype.attach).call(this, element);

    if (!this.builderMode) {
      if (!this.provider && this.component.provider) {
        const {
          provider,
          providerOptions,
        } = this.component;
        this.provider = this.initializeProvider(provider, providerOptions);
      }
    }

    this.loadRefs(element, {
      [GovPilotAddressComponent.addRowButtonRef]: 'single',
      [GovPilotAddressComponent.modeSwitcherRef]: 'single',
      [GovPilotAddressComponent.removeRowButtonRef]: 'multiple',
      [GovPilotAddressComponent.removeValueIconRef]: 'multiple',
      [GovPilotAddressComponent.searchInputRef]: 'multiple',
    });

    this.searchInput.forEach((element, index) => {
      if (!this.builderMode && element && this.provider) {
        autocompleter({
          input: element,
          debounceWaitMs: 300,
          fetch: (text, update) => {
            this.addClass(element, AddressLoadingClass);
            const query = text;
            this.provider.search(query).then(update);
          },
          render: (address) => {
            this.removeClass(element, AddressLoadingClass);
            const div = this.ce('div');
            div.textContent = this.getDisplayValue(address);
            return div;
          },
          onSelect: (address) => {
            if (this.isMultiple) {
              this.address[index] = address;
              this.address = [...this.address];
            }
            else {
              this.address = address;
            }

            this.triggerChange({
              modified: true,
            });

            if (element) {
              element.value = this.getDisplayValue(this.isMultiple ? this.address[index] : this.address);
            }

            this.updateRemoveIcon(index);
            this.emit('addressSelected', this.address);
          },
        });

        this.addEventListener(element, 'blur', () => {
          if (!element) {
            return;
          }

          if (element.value) {
            element.value = this.getDisplayValue(this.isMultiple ? this.address[index] : this.address);
          }
        });

        this.addEventListener(element, 'keyup', () => {
          if (!element) {
            return;
          }

          if (!element.value) {
            this.clearAddress(element, index);
          }
        });
      }
    });
    if (this.addRowButton) {
      this.addEventListener(this.addRowButton, 'click', event => {
        event.preventDefault();
        this.addRow();
      });
    }
    this.removeRowButton.forEach((removeRowButton, index) => {
      this.addEventListener(removeRowButton, 'click', event => {
        event.preventDefault();
        this.removeValue(index);
      });
    });

    if (this.modeSwitcher) {
      this.addEventListener(this.modeSwitcher, 'change', () => {
        if (!this.modeSwitcher) {
          return;
        }

        this.dataValue = this.emptyValue;
        this.mode = this.modeSwitcher.checked
          ? GovPilotAddressComponentMode.Manual
          : GovPilotAddressComponentMode.Autocomplete;

        if (!this.builderMode) {
          if (this.manualMode) {
            this.restoreComponentsContext();
          }

          this.triggerChange({
            modified: true,
          });
        }

        this.redraw();
      });
    }

    if (!this.builderMode) {
      this.removeValueIcon.forEach((removeValueIcon, index) => {
        this.updateRemoveIcon(index);

        const removeValueHandler = () => {
          const searchInput = this.searchInput?.[index];
          this.clearAddress(searchInput, index);

          if (searchInput) {
            searchInput.focus();
          }
        };

        this.addEventListener(removeValueIcon, 'click', removeValueHandler);
        this.addEventListener(removeValueIcon, 'keydown', ({ key }) => {
          if (key === 'Enter') {
            removeValueHandler();
          }
        });
      });
    }

    return result;
  }

  addChildComponent(component) {
    component.customConditional = ChildConditional;
  }

  redraw() {
    const modeSwitcherInFocus = (this.modeSwitcher && (document.activeElement === this.modeSwitcher));

    return super.redraw()
      .then((result) => {
        if (modeSwitcherInFocus && this.modeSwitcher) {
          this.modeSwitcher.focus();
        }

        return result;
      });
  }

  clearAddress(element, index) {
    if (!this.isEmpty()) {
      this.triggerChange();
    }

    if (this.address?.[index]) {
      this.address[index] = this.emptyValue;
    }
    else {
      this.address = this.emptyValue;
    }
    if (element) {
      element.value = '';
    }
    this.updateRemoveIcon(index);
    this.emit('addressSelected', this.address);
  }

  getDisplayValue(value = this.address) {
    return (this.provider && !this.manualMode)
      ? this.provider.getDisplayValue(value)
      : '';
  }

  validateMultiple() {
    return this.isMultiple;
  }

  updateRemoveIcon(index) {
    const removeValueIcon = this.removeValueIcon?.[index];
    if (removeValueIcon) {
      const value = this.isMultiple ? this.address[index] : this.address;
      if (this.isEmpty(value) || this.disabled) {
        this.addClass(removeValueIcon, RemoveValueIconHiddenClass);
      }
      else {
        this.removeClass(removeValueIcon, RemoveValueIconHiddenClass);
      }
    }
  }

  getValueAsString(value, options) {
    if (!value) {
      return '';
    }

    const normalizedValue = this.normalizeValue(value);

    const {
      address,
      mode,
    } = (
        this.manualModeEnabled
          ? normalizedValue
          : {
            address: normalizedValue,
            mode: GovPilotAddressComponentMode.Autocomplete,
          }
      );
    const valueInManualMode = (mode === GovPilotAddressComponentMode.Manual);

    if (this.provider && !valueInManualMode) {
      return this.getDisplayValue(address);
    }

    if (valueInManualMode) {
      if (this.component.manualModeViewString) {
        return this.interpolate(this.component.manualModeViewString, {
          address,
          data: this.data,
          component: this.component,
        });
      }

      return this.getComponents()
        .filter((component) => component.hasValue(address))
        .map((component) => [component, _.get(address, component.key)])
        .filter(([component, componentValue]) => !component.isEmpty(componentValue))
        .map(([component, componentValue]) => component.getValueAsString(componentValue, options))
        .join(', ');
    }

    return super.getValueAsString(address, options);
  }

  focus() {
    if (this.searchInput && this.searchInput[0]) {
      this.searchInput[0].focus();
    }
  }
}
