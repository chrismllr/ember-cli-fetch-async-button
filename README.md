
# Ember-cli-fetch-async-button


This addon is based on the Dockyard ember-cli addon 'ember-cli-async-button'...
https://github.com/dockyard/ember-async-button

Implemented with support for fetch. You can read more about fetch here.
http://updates.html5rocks.com/2015/03/introduction-to-fetch

& the github polyfill which ember-fetch uses...
https://github.com/github/fetch

This adds the initial 'then' handler, which validates the response status before either
throwing that response as an error to the 'catch' handler, or returning onto the successful
'then' handler.

*v0.2.0 adds support to validate hashes and arrays of promises. This will cause the component to
`throw` if any of the promises have an unsuccessful status code.*

To use fetch with your ember application, I recommend installing stefanpenner's ember-fetch.
https://github.com/stefanpenner/ember-fetch


## Usage

Basic Usage

### Template
```
{{fetch-async-button class="button"
  asyncAction=(action "save")
  default="Save"
  pending="Saving..."
  fulfilled="Saved!" }}
```

### Controller
```
save(cb) {
  const user = Ember.Object.create({
    user: {
      name: this.get('name')
    }
  });

  const promise = fetch(`/api/v2/users/${this.get('model.id')}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Data-Type': 'json'
    },
    body: JSON.stringify(user),
    credentials: 'include'
  });

  cb(promise);

  promise
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        throw response;
      }
    })
    .then(() => {
      console.log('Successfully updated User');
    })
    .catch(err => {
      console.log('Error updating user', err);
    });
},
```


## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
