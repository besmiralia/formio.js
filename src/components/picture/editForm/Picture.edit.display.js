//import _ from 'lodash';
export default [
  {
    key: 'placeholder',
    ignore: true
  },
  {
    type: 'select',
    label: 'Picture Field',
    key: 'pictureField',
    input: true,
    weight: 5,
    tooltip: 'The field which stores the filename.',
    dataSrc: 'custom',
    valueProperty: 'value',
    validate: {
      required: true
    },
    data: {
      custom(context) {
        var values = [];
        console.log(context);
        //values.push({ label: 'Any Change', value: 'data' });
        context.utils.eachComponent(context.instance.options.editForm.components, function(component) {
          if (component.key !== context.data.key && component.type === 'textfield') {
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
