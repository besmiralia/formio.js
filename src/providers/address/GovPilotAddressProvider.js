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
        uid: ''
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

    return `https://map-sandbox.govpilot.com/api/v1/address?${this.serialize(params)}`;
  }
}
