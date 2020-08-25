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

  get defaultSchema() {
    return GovPilotGridComponent.schema();
  }

  constructor(...args) {
    super(...args);
    this.type = 'gpgrid';
  }
}

GovPilotGridComponent.prototype.hasChanged = Component.prototype.hasChanged;
