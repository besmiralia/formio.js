import { AddressProvider } from './AddressProvider';
import NativePromise from 'native-promise-only';

export class GovPilotAddressProvider extends AddressProvider {
  static get name() {
    return 'govpilot';
  }

  static get displayName() {
    return 'GovPilot GIS';
  }

  get defaultOptions() {
    return {
      params: {
        type: 'address',
        cid: 0, //todo change them based on the account
        mid: 0, //todo change them based on the account
        pst: 'NJ' //todo change them based on the account
      },
    };
  }

  get queryProperty() {
    return 'q';
  }

  get responseProperty() {
    return '';
  }

  get displayValueProperty() {
    return 'address';
  }

  makeRequest(options = {}) {
    return new NativePromise((resolve, reject) => {
      var xhr = new XMLHttpRequest();

      xhr.open('GET', this.getRequestUrl(options), true);

      xhr.onload = () => resolve(JSON.parse(xhr.response));

      xhr.onerror = reject;

      xhr.send();
    });
  }

  getRequestUrl(options = {}) {
    const { params } = options;

    return `https://map.govpilot.com/map/AddressLookup?${this.serialize(params)}`;
  }
}
