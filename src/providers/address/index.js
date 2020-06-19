import { GovPilotAddressProvider } from './GovPilotAddressProvider';
import { AzureAddressProvider } from './AzureAddressProvider';
import { CustomAddressProvider } from './CustomAddressProvider';
import { GoogleAddressProvider } from './GoogleAddressProvider';
import { NominatimAddressProvider } from './NominatimAddressProvider';

export default {
  [GovPilotAddressProvider.name]: GovPilotAddressProvider,
  [AzureAddressProvider.name]: AzureAddressProvider,
  [CustomAddressProvider.name]: CustomAddressProvider,
  [GoogleAddressProvider.name]: GoogleAddressProvider,
  [NominatimAddressProvider.name]: NominatimAddressProvider,
};
