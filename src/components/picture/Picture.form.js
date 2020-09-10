import baseEditForm from '../_classes/component/Component.form';

import PictureEditData from './editForm/Picture.edit.data';
import PictureEditDisplay from './editForm/Picture.edit.display';
import PictureEditFile from './editForm/Picture.edit.file';
import PictureEditValidation from './editForm/Picture.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: PictureEditDisplay
    },
    {
      key: 'data',
      components: PictureEditData
    },
    {
      label: 'Image',
      key: 'file',
      weight: 5,
      components: PictureEditFile
    },
    {
      key: 'validation',
      components: PictureEditValidation
    },
  ], ...extend);
}
