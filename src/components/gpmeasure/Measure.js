import Input from '../_classes/input/Input';
import { conformToMask } from 'vanilla-text-mask';
import * as FormioUtils from '../../utils/utils';
import moment from 'moment';

export default class MeasureComponent extends Input {
  static schema(...extend) {
    return Input.schema({
      label: 'Measure',
      key: 'measure',
      type: 'measure',
      mask: false,
      inputType: 'text',
      inputFormat: 'plain',
      inputMask: '',
      tableView: true,
      spellcheck: true,
      validate: {
        minLength: '',
        maxLength: '',
        pattern: ''
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Measure',
      icon: 'sigma',
      group: 'data',
      documentation: '/userguide/#textfield',
      weight: 0,
      schema: MeasureComponent.schema()
    };
  }

  attachElement(element, index) {
    super.attachElement(element, index);
    this.on('gridRowSaved', (rowInfo) => {
      console.log('Grid Record Saved', rowInfo);
      //calcMeasure();
      //this.emit('calculateMeasure', { ...rowInfo, measure: this.key });
      this.calcMeasure(rowInfo);
    });
    this.on('gridRowRemoved', (rowInfo) => {
      console.log('Grid Record Removed', rowInfo);
      //calcMeasure();
      //this.emit('calculateMeasure', { ...rowInfo, measure: this.key });
      this.calcMeasure(rowInfo);
    });
    /*
    this.on('measureCalculated', (measureInfo) => {
      if (this.component.key === measureInfo.id) {
        console.log('Measure calculated', measureInfo);
        this.setValue(measureInfo.value);
      }
    });
    */
  }

  calcMeasure(data) {
    if (this.component.gptid !== data.tid) return;
    console.log('Calculating measure', this.key, data);
    const summaryFieldKey = `cf${this.component.gpfid}`;
    const filteredData = this.applyFiltersToData(this.component.gpFilter, data.data.filter(x => x.state === 'saved').map(x => x.data)).map(x => x[summaryFieldKey]);
    switch (this.component.gpSummaryType) {
      case 'C': {
        this.setValue(filteredData.length);
        break;
      }
      case 'S': {
        this.setValue(filteredData.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
        break;
      }
      case 'A': {
        if (filteredData.length > 0) this.setValue(filteredData.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / filteredData.length);
        break;
      }
      case 'MX': {
        if (this.component.renderType === 'datetime') {
          for (let i = 0; i < filteredData.length; i++) {
            if (filteredData[i]) {
              filteredData[i] = new Date(filteredData[i]);
            }
          }
        }
        let maxValue = Math.max(...filteredData);
        if (this.component.renderType === 'datetime' && maxValue) {
          maxValue = moment(maxValue).format('MM/DD/YYYY');
        }
        this.setValue(maxValue);
        break;
      }
      case 'MN': {
        if (this.component.renderType === 'datetime') {
          for (let i = 0; i < filteredData.length; i++) {
            if (filteredData[i]) {
              filteredData[i] = new Date(filteredData[i]);
            }
          }
        }
        let minValue = Math.min(...filteredData);
        if (this.component.renderType === 'datetime' && minValue) {
          minValue = moment(minValue).format('MM/DD/YYYY');
        }
        this.setValue(minValue);
        break;
      }
    }
  }

  applyFiltersToData(filters, data) {
    //Or|51287,=,Partially Fulfilled|51287,=,Fulfilled|51287,=,Denied
    if (!filters || filters === '') return data;
    const parts = filters.split('|');
    if (parts.length === 0) return data;
    const logicalOperator = parts[0].toLowerCase();
    parts.splice(0, 1);
    const result = [];

    data.forEach(row => {
      let counter = parts.length;
      parts.forEach(filter => {
        const filterParts = filter.split(',');
        if (filterParts.length === 3) {
          const field = filterParts[0];
          const op = filterParts[1];
          const v2 = filterParts[2];
          const cfKey = `cf${field}`;
          const v1 = row[cfKey];

          const comp = this.root.getComponent(cfKey);
          if (comp) {
            if (FormioUtils.evaluateFilterPart(comp.type, op, v1, v2)) {
              counter--;
            }
          }
        }
      });
      if ((logicalOperator === 'and' && counter === 0) || (logicalOperator === 'or' && counter < parts.length)) {
        result.push(row);
      }
    });
    return result;
  }

  get defaultSchema() {
    return MeasureComponent.schema();
  }

  get inputInfo() {
    const info = super.inputInfo;
    info.type = 'input';

    if (this.component.hasOwnProperty('spellcheck')) {
      info.attr.spellcheck = this.component.spellcheck;
    }

    if (this.component.mask) {
      info.attr.type = 'password';
    }
    else {
      info.attr.type = (this.component.inputType === 'password') ? 'password' : 'text';
    }
    info.changeEvent = 'input';
    return info;
  }

  get emptyValue() {
    return '';
  }

  /**
   * Returns the mask value object.
   *
   * @param value
   * @param flags
   * @return {*}
   */
  maskValue(value, flags = {}) {
    // Convert it into the correct format.
    if (!value || (typeof value !== 'object')) {
      value = {
        value,
        maskName: this.component.inputMasks[0].label
      };
    }

    // If no value is provided, then set the defaultValue.
    if (!value.value) {
      const defaultValue = flags.noDefault ? this.emptyValue : this.defaultValue;
      value.value = Array.isArray(defaultValue) ? defaultValue[0] : defaultValue;
    }

    return value;
  }

  /**
   * Normalize the value set in the data object.
   *
   * @param value
   * @param flags
   * @return {*}
   */
  normalizeValue(value, flags = {}) {
    if (!this.isMultipleMasksField) {
      return super.normalizeValue(value);
    }
    if (Array.isArray(value)) {
      return super.normalizeValue(value.map((val) => this.maskValue(val, flags)));
    }
    return super.normalizeValue(this.maskValue(value, flags));
  }

  /**
   * Sets the value at this index.
   *
   * @param index
   * @param value
   * @param flags
   */
  setValueAt(index, value, flags = {}) {
    if (!this.isMultipleMasksField) {
      return super.setValueAt(index, value, flags);
    }
    value = this.maskValue(value, flags);
    const textValue = value.value || '';
    const textInput = this.refs.mask ? this.refs.mask[index] : null;
    const maskInput = this.refs.select ? this.refs.select[index] : null;
    const mask = this.getMaskPattern(value.maskName);
    if (textInput && maskInput && mask) {
      textInput.value = conformToMask(textValue, FormioUtils.getInputMask(mask)).conformedValue;
      maskInput.value = value.maskName;
    }
    else {
      return super.setValueAt(index, textValue, flags);
    }
  }

  /**
   * Returns the value at this index.
   *
   * @param index
   * @return {*}
   */
  getValueAt(index) {
    if (!this.isMultipleMasksField) {
      return super.getValueAt(index);
    }
    const textInput = this.refs.mask ? this.refs.mask[index] : null;
    const maskInput = this.refs.select ? this.refs.select[index] : null;
    return {
      value: textInput ? textInput.value : undefined,
      maskName: maskInput ? maskInput.value : undefined
    };
  }

  isEmpty(value = this.dataValue) {
    if (!this.isMultipleMasksField) {
      return super.isEmpty((value || '').toString().trim());
    }
    return super.isEmpty(value) || (this.component.multiple ? value.length === 0 : (!value.maskName || !value.value));
  }
}
