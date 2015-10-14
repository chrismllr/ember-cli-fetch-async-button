
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

To use fetch with your ember application, I recommend installing stefanpenner's ember-fetch.
https://github.com/stefanpenner/ember-fetch


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
