import _ from 'lodash';
import { eachComponent, uniqueKey } from './utils';
export default {
  /**
   * Appends a number to a component.key to keep it unique
   *
   * @param {Object} form
   *   The components parent form.
   * @param {Object} component
   *   The component to uniquify
   */
  uniquify(container, component) {
    let changed = false;
    const formKeys = {};
    eachComponent(container, (comp) => {
      formKeys[comp.key] = true;

      if (['address', 'container', 'datagrid', 'editgrid', 'tree'].includes(component.type) || component.tree || component.arrayTree) {
        return true;
      }
    }, true);

    // Recurse into all child components.
    eachComponent([component], (component) => {
      // Skip key uniquification if this component doesn't have a key.
      if (!component.key) {
        return;
      }

      if (!component.gpid) {
        component.gpid = this.generateKey();
      }

      const newKey = uniqueKey(formKeys, component.key);
      if (newKey !== component.key) {
        component.key = newKey;
        changed = true;
      }

      formKeys[newKey] = true;

      if (['address', 'container', 'datagrid', 'editgrid', 'tree'].includes(component.type) || component.tree || component.arrayTree) {
        return true;
      }
    }, true);
    return changed;
  },

  additionalShortcuts: {
    button: [
      'Enter',
      'Esc'
    ]
  },

  getAlphaShortcuts() {
    return _.range('A'.charCodeAt(), 'Z'.charCodeAt() + 1).map((charCode) => String.fromCharCode(charCode));
  },

  getAdditionalShortcuts(type) {
    return this.additionalShortcuts[type] || [];
  },

  getBindedShortcuts(components, input) {
    const result = [];

    eachComponent(components, (component) => {
      if (component === input) {
        return;
      }

      if (component.shortcut) {
        result.push(component.shortcut);
      }
      if (component.values) {
        component.values.forEach((value) => {
          if (value.shortcut) {
            result.push(value.shortcut);
          }
        });
      }
    }, true);

    return result;
  },

  getAvailableShortcuts(form, component) {
    if (!component) {
      return [];
    }
    return [''].concat(_.difference(
      this.getAlphaShortcuts().concat(this.getAdditionalShortcuts(component.type)),
      this.getBindedShortcuts(form.components, component)),
    ).map((shortcut) => ({
      label: shortcut,
      value: shortcut,
    }));
  },

  generateKey() {
    // Generate a hex key of 5 characters
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
};
