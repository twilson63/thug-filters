# thug-filters [![Build Status](https://travis-ci.org/twilson63/thug-filters.png?branch=master)](https://travis-ci.org/twilson63/thug-filters)

Thug is a functional model system for nodejs, this module is an add-on module of common filters that any model may use.

## What is thug?

[https://github.com/sintaxi/thug](https://github.com/sintaxi/thug)

> Thug was created to minimize the complexity of validating and altering an object before writing it to a data store or performing an operation. Thug is not an ORM but is ment to be a replacment for one. Thug is very small and works on both the server or in a browser.

## Install

```
npm install thug-filters --save
```

## Implementation

Thug Model

```
var Thug = require('thug');
var filters = require('thug-filters');

module.exports = function(config) {
  var post = new Thug({
    filters: {
      "in": [
        filters.whitelist(['title', 'body', 'author'])
      ]
    }
  });
  return post;
}
```

## Filters API

### `blacklist(fields)`

Removes all nodes from the document that are specified in the fields array.

### `whitelist(fields)`

Keeps all nodes from the document that are specified in the fields array and discards the rest.

### `include(field, defaultValue)`

Includes this field and a defaultValue for your document.  This is great to set the `docType` attribute 
for a couchDb document.

#### Example

```
filters: {
  beforeWrite: [filters.include('docType', 'Post')]
}
``` 

### `sanitize(field)`

Removes any xss injections in text fields using the validator module.

```
filters: {
  beforeWrite: [filters.sanitize('body')]
}

```

### `uuid(field)`

Generates a unique identifer using the node-uuid module.

## LICENSE

MIT

## Contributing

pull requests are welcome!

## Thanks to the contributors and maintainers of the following projects

* [https://github.com/sintaxi/thug](https://github.com/sintaxi/thug)
* [https://github.com/chriso/node-validator](https://github.com/chriso/node-validator)
* [https://github.com/broofa/node-uuid/](https://github.com/broofa/node-uuid/)

