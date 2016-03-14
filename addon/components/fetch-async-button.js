import Ember from 'ember';
import layout from '../templates/components/fetch-async-button';

const { getWithDefault, get, set, run } = Ember;

export default Ember.Component.extend({
  layout: layout,
  tagName: 'button',
  textState: 'default',
  reset: false,
  classNames: ['async-button'],
  classNameBindings: ['textState'],
  attributeBindings: ['disableWhen', 'disabled', 'type', '_href:href', 'tabindex'],
  type: 'submit',

  disabled: Ember.computed('textState', 'disableWhen', function() {
    const textState = get(this, 'textState');
    const disableWhen = get(this, 'disableWhen');
    return disableWhen || textState === 'pending';
  }),

  text: Ember.computed('textState', 'default', 'pending', 'resolved', 'fulfilled', 'rejected', function() {
    return getWithDefault(this, this.textState, get(this, 'default'));
  }),

  _isError(code) {
    return !(code >= 200 && code < 300);
  },

  click() {
    const params = this.getWithDefault('params', []);

    set(this, 'textState', 'pending');

    this.attrs.asyncAction(promise => {
      if (!promise) { return; }

      promise
        .then(status => {
          if (status instanceof Array) { // array of promises
            status.forEach(s => {
              if (this._isError(s.status)) {
                throw error;
              }
            });

            return status;
          }

          if (status instanceof Object) { // hash of promises
            Object.keys(status).forEach(k => {
              if (this._isError(status[k].status)) {
                throw status;
              }
            });

            return status;
          }

          if (!this._isError(status.status)) {
            return status;
          } else {
            throw status;
          }
        })
        .then(() => {
          if (!this.isDestroyed) {
            set(this, 'textState', 'fulfilled');
          }
        }).catch(() => {
          if (!this.isDestroyed) {
            set(this, 'textState', 'rejected');
            run.later(() => set(this, 'textState', 'default'), 3000);
          }
        });
    }, ...params);

    // If this is part of a form, it will perform an HTML form
    // submission without returning false to prevent action bubbling
    return false;
  },
});
