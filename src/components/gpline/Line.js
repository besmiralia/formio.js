import Component from '../_classes/component/Component';

export default class LineComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      label: 'Line',
      type: 'gpline',
      attrs: [],
      lineHeight: 1,
      lineColor: '#ccc',
      input: false,
      persistent: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Line',
      group: 'basic',
      icon: 'horizontal-rule',
      weight: 25,
      documentation: '/userguide/#html-element-component',
      schema: LineComponent.schema()
    };
  }

  get defaultSchema() {
    return LineComponent.schema();
  }

  renderContent() {
    return this.renderTemplate('gpline', {
      component: this.component,
      lineHeight: this.component.lineHeight,
      lineColor: this.component.lineColor,
    });
  }

  render() {
    return super.render(this.renderContent());
  }

  attach(element) {
    this.loadRefs(element, { html: 'single' });
    return super.attach(element);
  }
}
