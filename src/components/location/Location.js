/* global google */
import TextFieldComponent from '../../components/textfield/TextField';
import Formio from '../../Formio';

export default class LocationComponent extends TextFieldComponent {
  static schema(...extend) {
    return TextFieldComponent.schema({
      type: 'location',
      label: 'Map',
      key: 'taccount',
      value: '0 0',
      map: {
        region: '',
        gmapId: 'googleMap',
        autocompleteOptions: {}
      },
      disabled: true,
      center: {
        Lat: 0,
        Lon: 0,
        Alt: 0
      },
      disableMarker: false,
      height: 400
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Map',
      group: 'advanced',
      icon: 'map',
      weight: 36,
      schema: LocationComponent.schema()
    };
  }

  init() {
    super.init();
    // Get the source for Google Maps API
    let src = 'https://maps.googleapis.com/maps/api/js?v=3&libraries=places&callback=googleMapsCallback';
    if (this.options && this.options.gmapsApiKey) {
      src += `&key=${this.options.gmapsApiKey}`;
    }
    if (this.component.map && this.component.map.region) {
      src += `&region=${this.component.map.region}`;
    }
    Formio.requireLibrary('googleMaps', 'google.maps.places', src);
  }

  get defaultSchema() {
    return LocationComponent.schema();
  }

  get emptyValue() {
    return '';
  }
  setValue(value, flags = {}) {
    if (value && value.indexOf('{') >= 0) {//json object
      this.center = JSON.parse(value);
      value = `${this.center.Lon} ${this.center.Lat}`;
    }
    else if (!value || value.indexOf(' ') < 0) {
      if (value !== '') console.warn('Invalid center provided:', value);
      return;
    }

    super.setValue(value, flags);

    if (value) this.emit('locationChanged', value);
  }

  get inputInfo() {
    const info = super.inputInfo;
    info.attr.class += ' gmap-search';
    return info;
  }

  renderElement(value, index) {
    return super.renderElement(value, index) + this.renderTemplate('map', {
      mapId: this.component.map.gmapId,
      height: this.component.height,
      center: value
    });
  }

  attach(element) {
    const ret = super.attach(element);
    this.loadRefs(element, { gmapElement: 'single' });
    return ret;
  }

  attachElement(element, index) {
    super.attachElement(element, index);
    /*
    Formio.libraryReady('googleMaps').then(() => {
      const defaultLatlng = new google.maps.LatLng(0, 0);
      const options = {
        zoom: 19,
        center: defaultLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            'featureType': 'poi',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'transit',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          }
        ]
      };

      //if (!this.refs.gmapElement) this.refs.gmapElement = {};
      if (!this.refs.gmapElement) {
        return;
      }
      element.map = new google.maps.Map(this.refs.gmapElement, options);
      this.addMarker(defaultLatlng, 'Marker Location', element);
      */
    // let autocompleteOptions = {};
    // if (this.component.map) {
    //   autocompleteOptions = this.component.map.autocompleteOptions || {};
    // }
    // const autocomplete = new google.maps.places.Autocomplete(element, autocompleteOptions);
    // autocomplete.addListener('place_changed', () => {
    //   const place = autocomplete.getPlace();
    //   if (!place.geometry) {
    //     console.log('Autocomplete\'s returned place contains no geometry');
    //     return;
    //   }

    //   // If the place has a geometry, then present it on a map.
    //   if (place.geometry.viewport) {
    //     element.map.fitBounds(place.geometry.viewport);
    //   }
    //   else {
    //     element.map.setCenter(place.geometry.location);
    //     element.map.setZoom(17);  // Why 17? Because it looks good.
    //   }
    //   element.marker.setIcon(/** @type {google.maps.Icon} */({
    //     url: place.icon,
    //     size: new google.maps.Size(71, 71),
    //     origin: new google.maps.Point(0, 0),
    //     anchor: new google.maps.Point(17, 34),
    //     scaledSize: new google.maps.Size(35, 35)
    //   }));
    //   element.marker.setPosition(place.geometry.location);
    //   //this.setValue(place.name);
    //   const latLngStr = `${place.geometry.location.lng()}  ${place.geometry.location.lat()}`;
    //   this.setValue(latLngStr);
    // });
    //});

    this.on('addressSelected', (addressInfo) => {
      console.log('Address change event picked up in location', addressInfo);
      if (addressInfo.cent) {
        this.setValue(addressInfo.cent);

        // const latlngObj = JSON.parse(addressInfo.cent);
        // const latlngLocation = new google.maps.LatLng(latlngObj.Lat, latlngObj.Lon);

        // //recenter the marker
        // element.marker.setPosition(latlngLocation);

        // //set map center
        // if (element.map) {
        //   element.map.setCenter(latlngLocation);
        // }
      }
    });

    this.on('locationChanged', (lonLat) => {
      console.log('locationChanged fired', lonLat);
      if (!lonLat || lonLat === '') return;
      const latLngArr = lonLat.split(' ');
      if (latLngArr.length !== 2) return;
      Formio.libraryReady('googleMaps').then(() => {
        const latlngLocation = new google.maps.LatLng(latLngArr[1], latLngArr[0]);

        if (!element.map) {
          const options = {
            zoom: 19,
            center: latlngLocation,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
              {
                'featureType': 'poi',
                'stylers': [
                  {
                    'visibility': 'off'
                  }
                ]
              },
              {
                'featureType': 'transit',
                'stylers': [
                  {
                    'visibility': 'off'
                  }
                ]
              }
            ]
          };
          element.map = new google.maps.Map(this.refs.gmapElement, options);
          this.addMarker(latlngLocation, 'Marker Location', element);
        }
        else {
          //recenter the marker
          if (element.marker) {
            element.marker.setPosition(latlngLocation);
          }
          //set map center
          if (element.map) {
            element.map.setCenter(latlngLocation);
          }
        }
      });
    });
  }

  addMarker(latlng, title, element) {
    element.marker = new google.maps.Marker({
      position: latlng,
      map: element.map,
      title: title,
      draggable: true
    });
    element.marker.addListener('dragend', (event) => {
      this.setValue(`${event.latLng.lng()} ${event.latLng.lat()}`);
      /*
      const geocoder = new google.maps.Geocoder;
      const latlng = { lat: parseFloat(event.latLng.lat()), lng: parseFloat(event.latLng.lng()) };
      geocoder.geocode({ 'location': latlng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            this.setValue();//results[0].formatted_address
          }
          else {
            console.log('No results found');
          }
        }
        else {
          console.log(`Geocoder failed due to: ${status}`);
        }
      });
      */
    });
  }
}
