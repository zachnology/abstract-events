# Welcome to abstract-events ⚡
![Version](https://github.com/zachnology/abstract-events/actions/workflows/npm-publish.yml/badge.svg)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/zachnology/abstract-events/graphs/commit-activity)
[![License: MIT](https://img.shields.io/github/license/zachnology/z-debouncer)](https://github.com/zachnology/abstract-events/blob/master/LICENSE)

> Abstract events in JS

## Install

```sh
npm install abstract-events
```

## Usage
```js
const abstractEvents = require('abstract-events');

let someButton = document.getElementById('someButton');
someButton.onclick = abstractEvents.create(
    {
        type: 'count',
        count: 4
    },
    () => alert('You clicked the button 4 times!')
);

let phraseListener = abstractEvents.create(
    {
        type: 'phrase',
        phrase: 's3cr3tP@ssw0rd'
    },
    () => alert("You've activated the admin mode by typing in the secret password!")
);

document.addEventListener('keydown', phraseListener);
```

## API

### create(options, callback)

Returns a new event listener that calls the callback function once conditions are met.

| Parameter | Type | Description |
|-----------|------|-------------|
| [options](#options) | object | Required. Settings to define the abstract event. |
| callback | function | Required. Function to be called once the abstract event conditions are met |

### options

| Field | Type | Description |
|-----------|------|-------------|
| type | string | Required. Type of event. Value must be either `count` or `phrase` |
| count | number | Required if `type` is `count`. Number of times the event is raised before calling the `callback` function. |
| phrase | string | Required if `type` is `phrase`. String to listen for before calling the `callback` function. |
| timeout | number | Optional. Number of milliseconds (rolling) all triggers must occur within. When the `type` is `count`, this is the amount of time all triggers must occur within for the `callback` function to be called. When the `type` is `phrase`, this is the amount time all characters must be typed within for the `callback` function to be called.

## Author

👤 **zachnology**

* Github: [@zachnology](https://github.com/zachnology)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/zachnology/abstract-events/issues). You can also take a look at the [contributing guide](https://github.com/zachnology/abstract-events/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!


## 📝 License

Copyright © 2021 [Zack Gomez](https://github.com/zachnology).

This project is [MIT](https://github.com/zachnology/abstract-events/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_