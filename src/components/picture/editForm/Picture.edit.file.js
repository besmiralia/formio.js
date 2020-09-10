export default [/*
  {
    type: 'textarea',
    key: 'options',
    label: 'Custom request options',
    tooltip: 'Pass your custom xhr options(optional)',
    rows: 5,
    editor: 'ace',
    input: true,
    weight: 15,
    placeholder: `{
  "withCredentials": true
}`,
    conditional: {
      json: {
        '===': [{
          var: 'data.storage'
        }, 'url']
      }
    }
  },*/
  {
    type: 'textfield',
    input: true,
    key: 'fileKey',
    label: 'File form-data key',
    weight: 17,
    placeholder: 'Enter the key name of a file for form data.',
    tooltip: 'Key name that you would like to modify for the file while calling API request.',
    conditional: {
      json: {
        '===': [{
          var: 'data.storage'
        }, 'govpilot']
      }
    }
  },
  {
    type: 'textfield',
    input: true,
    key: 'fileNameTemplate',
    label: 'File Name Template',
    defaultValue: '{{name}}-{{guid}}',
    placeholder: '(optional) {{{{{name}}-{{guid}}}}}',
    tooltip: 'Specify template for name of uploaded file(s). Regular template variables are available (`data`, `component`, `user`, `value`, `moment` etc.), also `fileName`, `guid` variables are available. `guid` part must be present, if not found in template, will be added at the end.',
    weight: 25
  },
  {
    type: 'textfield',
    input: true,
    key: 'imageSize',
    label: 'Image Size',
    placeholder: '100',
    tooltip: 'The image size for previewing images.',
    weight: 40,
    conditional: {
      json: { '==': [{ var: 'data.image' }, true] }
    }
  },
  {
    type: 'textfield',
    input: true,
    key: 'webcamSize',
    label: 'Webcam Width',
    placeholder: '320',
    tooltip: 'The webcam size for taking pictures.',
    weight: 38,
    conditional: {
      json: { '==': [{ var: 'data.webcam' }, true] }
    }
  },
  {
    type: 'textfield',
    input: true,
    key: 'filePattern',
    label: 'File Pattern',
    placeholder: '.pdf,.jpg',
    tooltip: 'See <a href=\'https://github.com/danialfarid/ng-file-upload#full-reference\' target=\'_blank\'>https://github.com/danialfarid/ng-file-upload#full-reference</a> for how to specify file patterns.',
    weight: 50
  },
];
