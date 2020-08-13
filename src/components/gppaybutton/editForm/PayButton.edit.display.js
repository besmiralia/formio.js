import BuilderUtils from '../../../utils/builder';
import _ from 'lodash';

export default [
  {
    key: 'labelPosition',
    ignore: true,
  },
  {
    key: 'placeholder',
    ignore: true,
  },
  {
    key: 'hideLabel',
    ignore: true,
  },
  {
    key: 'tableView',
    ignore: true,
  },
  {
    key: 'modalEdit',
    ignore: true,
  },
  {
    key: 'action',
    ignore: true,
  },
  {
    type: 'checkbox',
    input: true,
    inputType: 'checkbox',
    key: 'showValidations',
    label: 'Show Validations',
    weight: 115,
    tooltip: 'When the button is pressed, show any validation errors on the form.',
    conditional: {
      json: { '!==': [{ var: 'data.action' }, 'submit'] },
    },
  },
  {
    type: 'select',
    label: 'Pay Amount Field',
    key: 'payAmountField',
    input: true,
    weight: 19,
    tooltip: 'The field which contains the amount to pay when the button is clicked.',
    dataSrc: 'custom',
    valueProperty: 'value',
    data: {
      custom(context) {
        var values = [];
        //values.push({ label: 'Any Change', value: 'data' });
        context.utils.eachComponent(context.instance.options.editForm.components, function(component) {
          if (component.key !== context.data.key && ['currency', 'number', 'formula'].includes(component.type)) {
            values.push({
              label: component.label || component.key,
              value: component.key
            });
          }
        });
        return values;
      }
    },
  },
  {
    type: 'select',
    key: 'theme',
    label: 'Theme',
    input: true,
    tooltip: 'The color theme of this button.',
    dataSrc: 'values',
    weight: 140,
    data: {
      values: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Info', value: 'info' },
        { label: 'Success', value: 'success' },
        { label: 'Danger', value: 'danger' },
        { label: 'Warning', value: 'warning' },
      ],
    },
  },
  {
    type: 'select',
    key: 'size',
    label: 'Size',
    input: true,
    tooltip: 'The size of this button.',
    dataSrc: 'values',
    weight: 150,
    data: {
      values: [
        //{ label: 'Extra Small', value: 'xs' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
    },
  },
  {
    type: 'textfield',
    key: 'leftIcon',
    label: 'Left Icon',
    input: true,
    placeholder: 'Enter icon classes',
    tooltip: "This is the full icon class string to show the icon. Example: 'fa fa-plus'",
    weight: 160,
  },
  {
    type: 'textfield',
    key: 'rightIcon',
    label: 'Right Icon',
    input: true,
    placeholder: 'Enter icon classes',
    tooltip: "This is the full icon class string to show the icon. Example: 'fa fa-plus'",
    weight: 170,
  },
  {
    type: 'select',
    input: true,
    weight: 180,
    label: 'Shortcut',
    key: 'shortcut',
    tooltip: 'Shortcut for this component.',
    dataSrc: 'custom',
    valueProperty: 'value',
    customDefaultValue: () => '',
    template: '{{ item.label }}',
    data: {
      custom(context) {
        return BuilderUtils.getAvailableShortcuts(
          _.get(context, 'instance.options.editForm', {}),
          _.get(context, 'instance.options.editComponent', {})
        );
      },
    },
  },
  {
    type: 'checkbox',
    key: 'block',
    label: 'Block Button',
    input: true,
    weight: 155,
    tooltip: 'This control should span the full width of the bounding container.',
  }/*,
  {
    type: 'checkbox',
    key: 'disableOnInvalid',
    label: 'Disable on Form Invalid',
    tooltip: 'This will disable this field if the form is invalid.',
    input: true,
    weight: 620,
  },*/
];
