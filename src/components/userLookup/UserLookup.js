import Formio from '../../Formio';
import FormioUtils from '../../utils';
import SelectComponent from '../select/Select';

export default class UserLookupComponent extends SelectComponent {
  static schema(...extend) {
    return SelectComponent.schema({
      type: 'userLookup',
      label: 'User Lookup',
      key: 'userLookup',
      idPath: 'id',
      data: {
        values: [],
        json: '',
        url: `${Formio.getProjectUrl()}/users`,
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
      searchField: 'q',
      minSearch: 0,
      readOnlyValue: false,
      authenticate: false,
      ignoreCache: false,
      template: '<span>{{ item.fullName }}</span>',
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

  init() {
    super.init();
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
          const component = FormioUtils.getComponent(components, this.userInfo.firstName, true);
          component.setValue(selectedUser.firstName);
        }
        if (this.userInfo.lastName !== '') {
          const component = FormioUtils.getComponent(components, this.userInfo.lastName, true);
          component.setValue(selectedUser.lastName);
        }
        if (this.userInfo.fullName !== '') {
          const component = FormioUtils.getComponent(components, this.userInfo.fullName, true);
          component.setValue(selectedUser.name);
        }
        if (this.userInfo.email !== '') {
          const component = FormioUtils.getComponent(components, this.userInfo.email, true);
          component.setValue(selectedUser.email);
        }
        if (this.userInfo.phone !== '') {
          const component = FormioUtils.getComponent(components, this.userInfo.phone, true);
          component.setValue(selectedUser.phone);
        }
        this.setValue(event.target.value);
      });
    }

    return superAttach;
  }
}
