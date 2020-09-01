import Component from '../_classes/component/Component';
import _ from 'lodash';

export default class LabelComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      label: 'Label',
      type: 'gplabel',
      attrs: [],
      content: '',
      input: false,
      persistent: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Label',
      group: 'basic',
      icon: 'heading',
      weight: 25,
      documentation: 'http://help.form.io/userguide/#html-element-component',
      schema: LabelComponent.schema()
    };
  }

  get defaultSchema() {
    return LabelComponent.schema();
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
    return this.renderTemplate('gplabel', {
      component: this.component,
      tag: this.component.tag,
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

  renderBuilderContent() {
    const submission = _.get(this.root, 'submission', {});
    return this.renderTemplate('gplabelbuilder', {
      component: this.component,
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
    if (this.builderMode) {
      return super.render(this.renderBuilderContent());
    }
    else {
      return super.render(this.renderContent());
    }
  }

  attach(element) {
    this.loadRefs(element, { html: 'single' });
    return super.attach(element);
  }
}
