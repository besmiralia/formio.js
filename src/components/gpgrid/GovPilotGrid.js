import Component from '../_classes/component/Component';
import EditGridComponent from '../editgrid/EditGrid';

export default class GovPilotGridComponent extends EditGridComponent {
  static schema(...extend) {
    return EditGridComponent.schema({
      type: 'gpgrid',
      label: 'GovPilot Grid',
      key: 'gpgrid',
      tid: '',
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'GovPilot Grid',
      icon: 'th',
      group: 'data',
      documentation: 'http://help.form.io/userguide/#editgrid',
      weight: 30,
      schema: GovPilotGridComponent.schema(),
    };
  }

  static get defaultHeaderTemplate() {
    return `<div class="row">
      {% if (!instance.disabled) { %}
        <div class="col-sm-2">Actions</div>
      {% } %}
      {% util.eachComponent(components, function(component) { %}
        {% if (!component.hasOwnProperty('tableView') || component.tableView) { %}
          <div class="col-sm-2">{{ component.label }}</div>
        {% } %}
      {% }) %}
    </div>`;
  }

  static get defaultRowTemplate() {
    return `<div class="row">
      {% if (!instance.disabled) { %}
        <div class="col-sm-2">
          <div class="btn-group pull-right">
            <button class="btn btn-default btn-dark btn-sm editRow"><i class="{{ iconClass('edit') }}"></i></button>
            {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}
              <button class="btn btn-danger btn-sm removeRow"><i class="{{ iconClass('trash') }}"></i></button>
            {% } %}
          </div>
        </div>
      {% } %}
      {% util.eachComponent(components, function(component) { %}
        {% if (!component.hasOwnProperty('tableView') || component.tableView) { %}
          <div class="col-sm-2">
            {{ getView(component, row[component.key]) }}
          </div>
        {% } %}
      {% }) %}
    </div>`;
  }

  get defaultDialogTemplate() {
    return `
    <h3 ref="dialogHeader">${this.t('Do you want to discard the data?')}</h3>
    <div style="display:flex; justify-content: flex-end;">
      <button ref="dialogCancelButton" class="btn btn-secondary">${this.t('Cancel')}</button>
      <button ref="dialogYesButton" class="btn btn-danger">${this.t('Yes, discard it')}</button>
    </div>
  `;
  }

  setValue(value, flags = []) {
    const changed = super.setValue(value, flags);

    this.emit('editGridValueSet', {
      row: null,
      data: this.editRows,
      tid: this.component.tid
    });
    return changed;
  }
  saveRow(rowIndex, modified) {
    const saved = super.saveRow(rowIndex, modified);
    const editRow = this.editRows[rowIndex];
    if (saved) {
        this.emit('gridRowSaved', {
        row: editRow,
        data: this.editRows,
        tid: this.component.tid
      });
    }
    return saved;
  }
  baseRemoveRow(rowIndex) {
    const editRow = super.baseRemoveRow(rowIndex);
    this.emit('gridRowRemoved', {
      row: editRow,
      data: this.editRows,
      tid: this.component.tid
    });
    return editRow;
  }

  get defaultSchema() {
    return GovPilotGridComponent.schema();
  }

  constructor(...args) {
    super(...args);
    this.type = 'gpgrid';
  }
}

GovPilotGridComponent.prototype.hasChanged = Component.prototype.hasChanged;
