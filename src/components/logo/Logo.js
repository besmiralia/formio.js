import _ from 'lodash';
import Component from '../_classes/component/Component';

export default class LogoComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      label: 'Logo',
      type: 'logo',
      tag: 'img',
      attrs: ['src'],
      content: '',
      url: '',
      input: false,
      persistent: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Logo',
      group: 'layout',
      icon: 'image',
      weight: 70,
      documentation: '',
      schema: LogoComponent.schema()
    };
  }

  get defaultSchema() {
    return LogoComponent.schema();
  }

  get content() {
    if (this.builderMode) {
      return this.component.content;
    }
    const submission = _.get(this.root, 'submission', {});
    return this.component.content ? this.interpolate(this.component.content, {
      metadata: submission.metadata || {},
      submission: submission,
      data: this.rootValue,
      row: this.data
    }) : '';
  }

  get singleTags() {
    return ['br', 'img', 'hr'];
  }

  checkRefreshOn(changed) {
    super.checkRefreshOn(changed);
    if (!this.builderMode && this.component.refreshOnChange && this.element &&
      this.conditionallyVisible(this.data, this.row)) {
      this.setContent(this.element, this.renderContent());
    }
  }

  renderContent() {
    const submission = _.get(this.root, 'submission', {});
    return this.renderTemplate('html', {
      component: this.component,
      tag: 'img',
      attrs: (this.component.attrs || []).map((attr) => {
        return {
          attr: attr.attr,
          value: this.interpolate(attr.value, {
            metadata: submission.metadata || {},
            submission: submission,
            data: this.rootValue,
            row: this.data
          })
        };
      }),
      content: this.content,
      singleTags: this.singleTags,
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
