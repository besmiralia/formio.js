import _ from 'lodash';
import Formio from '../../Formio';
import Field from '../_classes/field/Field';
import SelectComponent from '../select/Select';
import NativePromise from 'native-promise-only';

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
        url: 'https://form-sandbox.govpilot.com/forms/users',
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
      schema: SelectComponent.schema()
    };
  }

  init() {
    if (this.component.dataSrc === 'govpilot') {
      if (this.component.feeschedule) {
        this.component.data.url = `${Formio.getProjectUrl()}/${Formio.getTid()}/feeschedule`;
      }
      else this.component.data.url = `${Formio.getProjectUrl()}/dropdown/${this.schema.gptid}/${this.key}`;
    }

    super.init();
    this.validators = this.validators.concat(['select', 'onlyAvailableItems']);

    // Trigger an update.
    let updateArgs = [];
    const triggerUpdate = _.debounce((...args) => {
      updateArgs = [];
      return this.updateItems.apply(this, args);
    }, 100);
    this.triggerUpdate = (...args) => {
      if (args.length) {
        updateArgs = args;
      }
      return triggerUpdate(...updateArgs);
    };

    // Keep track of the select options.
    this.selectOptions = [];

    if (this.isInfiniteScrollProvided) {
      this.isFromSearch = false;

      this.searchServerCount = null;
      this.defaultServerCount = null;

      this.isScrollLoading = false;

      this.searchDownloadedResources = [];
      this.defaultDownloadedResources = [];
    }

    // If this component has been activated.
    this.activated = false;

    // Determine when the items have been loaded.
    this.itemsLoaded = new NativePromise((resolve) => {
      this.itemsLoadedResolve = resolve;
    });
  }

  get dataReady() {
    // If the root submission has been set, and we are still not attached, then assume
    // that our data is ready.
    if (
      this.root &&
      this.root.submissionSet &&
      !this.attached
    ) {
      return NativePromise.resolve();
    }
    return this.itemsLoaded;
  }

  get defaultSchema() {
    return SelectComponent.schema();
  }
}
