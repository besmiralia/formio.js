import Formio from '../../Formio';
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

    const autocompleteInput = this.refs.selectContainer;
    if (autocompleteInput) {
      this.addEventListener(autocompleteInput, 'change', (event) => {
        const selectedUser = event.detail.value;

        const submissionData = this.root.submission;
        if (this.component.userInfo.firstName !== '') {
          submissionData.data[this.component.userInfo.firstName] = selectedUser.firstName;
        }
        if (this.component.userInfo.lastName !== '') {
          submissionData.data[this.component.userInfo.lastName] = selectedUser.lastName;
        }
        if (this.component.userInfo.fullName !== '') {
          submissionData.data[this.component.userInfo.fullName] = selectedUser.fullName;
        }
        if (this.component.userInfo.email !== '') {
          submissionData.data[this.component.userInfo.email] = selectedUser.email;
        }
        if (this.component.userInfo.phone !== '') {
          submissionData.data[this.component.userInfo.phone] = selectedUser.phone;
        }
        this.root.setSubmission(submissionData);
        this.dataValue = '';
      });
    }

    return superAttach;
  }
}
