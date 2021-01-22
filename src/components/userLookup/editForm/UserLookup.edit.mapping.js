export default [
  {
    type: 'select',
    label: 'First Name',
    key: 'userInfo.firstName',
    input: true,
    weight: 50,
    tooltip: 'The field which will copy the first name from the selected user.',
    dataSrc: 'custom',
    valueProperty: 'value',
    data: {
      custom(context) {
        var values = [];
        //values.push({ label: 'Any Change', value: 'data' });
        context.utils.eachComponent(context.instance.options.editForm.components, function(component) {
          if (component.key !== context.data.key && ['textfield', 'textarea', 'gplabel', 'select', 'content'].includes(component.type)) {
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
    label: 'Last Name',
    key: 'userInfo.lastName',
    input: true,
    weight: 50,
    tooltip: 'The field which will copy the last name from the selected user.',
    dataSrc: 'custom',
    valueProperty: 'value',
    data: {
      custom(context) {
        var values = [];
        //values.push({ label: 'Any Change', value: 'data' });
        context.utils.eachComponent(context.instance.options.editForm.components, function(component) {
          if (component.key !== context.data.key && ['textfield', 'textarea', 'gplabel', 'select', 'content'].includes(component.type)) {
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
    label: 'Full Name',
    key: 'userInfo.fullName',
    input: true,
    weight: 50,
    tooltip: 'The field which will copy the full name from the selected user.',
    dataSrc: 'custom',
    valueProperty: 'value',
    data: {
      custom(context) {
        var values = [];
        //values.push({ label: 'Any Change', value: 'data' });
        context.utils.eachComponent(context.instance.options.editForm.components, function(component) {
          if (component.key !== context.data.key && ['textfield', 'textarea', 'gplabel', 'select', 'content'].includes(component.type)) {
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
    label: 'Email',
    key: 'userInfo.email',
    input: true,
    weight: 50,
    tooltip: 'The field which will copy the email from the selected user.',
    dataSrc: 'custom',
    valueProperty: 'value',
    data: {
      custom(context) {
        var values = [];
        //values.push({ label: 'Any Change', value: 'data' });
        context.utils.eachComponent(context.instance.options.editForm.components, function(component) {
          if (component.key !== context.data.key && ['email', 'textfield', 'textarea', 'gplabel', 'select', 'content'].includes(component.type)) {
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
    label: 'Phone',
    key: 'userInfo.phone',
    input: true,
    weight: 50,
    tooltip: 'The field which will copy the phone number from the selected user.',
    dataSrc: 'custom',
    valueProperty: 'value',
    data: {
      custom(context) {
        var values = [];
        //values.push({ label: 'Any Change', value: 'data' });
        context.utils.eachComponent(context.instance.options.editForm.components, function(component) {
          if (component.key !== context.data.key && ['phoneNumber'].includes(component.type)) {
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
    label: 'User ID',
    key: 'userInfo.id',
    input: true,
    weight: 50,
    tooltip: 'The field which will copy the id from the selected user.',
    dataSrc: 'custom',
    valueProperty: 'value',
    data: {
      custom(context) {
        var values = [];
        //values.push({ label: 'Any Change', value: 'data' });
        context.utils.eachComponent(context.instance.options.editForm.components, function(component) {
          if (component.key !== context.data.key && ['textfield', 'textarea', 'gplabel', 'select', 'content'].includes(component.type)) {
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
];
