import Formio from '../../Formio';
import FormioUtils from '../../utils';
import Field from '../_classes/field/Field';
import SelectComponent from '../select/Select';

export default class UserLookupComponent extends SelectComponent {
  constructor() {
    super();
  }

  static schema(...extend) {
    return Field.schema({
      type: 'select',
      label: 'User Lookup',
      key: 'userLookup',
      idPath: 'id',
      data: {
        values: [],
        json: '',
        url: `https://form-${Formio.getHost()}/forms/users`,
        resource: '',
        custom: ''
      },
      clearOnRefresh: false,
      limit: 100,
      dataSrc: 'url',
      valueProperty: '',
      lazyLoad: true,
      filter: '',
      searchEnabled: true,
      searchField: '',
      minSearch: 0,
      readOnlyValue: false,
      authenticate: false,
      ignoreCache: false,
      template: '<span>{{ item.label }}</span>',
      selectFields: '',
      searchThreshold: 0.3,
      uniqueOptions: false,
      tableView: true,
      fuseOptions: {
        include: 'score',
        threshold: 0.3,
      },
      userInfo:{
        firstName: '',
        lastName: '',
        fullName: '',
        email: '',
        phone: '',
        id: ''
      },
      customOptions: {},
      useExactSearch: false,
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'User Lookup',
      group: 'data',
      icon: 'user',
      weight: 70,
      documentation: '',
      schema: UserLookupComponent.schema()
    };
  }

  get defaultSchema() {
    return UserLookupComponent.schema();
  }

  /* eslint-disable max-statements */
  attach(element) {
    const superAttach = super.attach(element);

    const autocompleteInput = this.refs.autocompleteInput;
    if (autocompleteInput) {
      this.addEventListener(autocompleteInput, 'change', (event) => {
        const selectedUser = event.target.value;
        const components = this.root.component.components;

        if (this.userInfo.firstName !== '') {
          const component = FormioUtils.getComponent(components, this.userInfo.firstName);
          component.setValue(selectedUser.firstName);
        }
        if (this.userInfo.lastName !== '') {
          const component = FormioUtils.getComponent(components, this.userInfo.lastName);
          component.setValue(selectedUser.lastName);
        }
        if (this.userInfo.fullName !== '') {
          const component = FormioUtils.getComponent(components, this.userInfo.fullName);
          component.setValue(selectedUser.fullName);
        }
        if (this.userInfo.email !== '') {
          const component = FormioUtils.getComponent(components, this.userInfo.email);
          component.setValue(selectedUser.email);
        }
        if (this.userInfo.phone !== '') {
          const component = FormioUtils.getComponent(components, this.userInfo.phone);
          component.setValue(selectedUser.phone);
        }
        this.setValue(event.target.value);
      });
    }

    return superAttach;
  }
}
