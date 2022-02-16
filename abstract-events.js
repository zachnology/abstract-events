const keycode = require('keycode');

const supportedEventTypes = [ 'count', 'phrase' ];

function create(options, callback) {
    if (!options) throw new ReferenceError('options parameter is required.');
    if (!options.type) throw new ReferenceError('options.type is required.');
    if (!supportedEventTypes.includes(options.type))
        throw new Error(`Unsupported type supplied: ${options.type}`);

    if (options.type == 'count') {
        if (!options.count) throw new ReferenceError('options.count must be supplied when using type "count".');

        if (options.timeout) {
            return createTimedCountListener(options.count, options.timeout, callback);
        }

        return createCountListener(options.count, callback);
    }

    if (options.type == 'phrase') {
        if (!options.phrase) throw new ReferenceError('options.phrase must be supplied when using type "phrase".');

        if (options.timeout) {
            return createTimedKeyPhraseListener(options.phrase, options.timeout, callback);
        }

        return createKeyPhraseListener(options.phrase, callback);
    }

    return null;
}

function createCountListener(count, callback) {
    let runningCount = 0;
    return function () {
        runningCount++;
        if (runningCount >= count) {
            runningCount = 0;
            callback();
        }
    } 
}

function createTimedCountListener(count, timeout, callback) {
    let runningCount = 0;
    let lastTrigger = null;
    return function () {
        runningCount = !lastTrigger || new Date().getTime() - lastTrigger.getTime() > timeout ? 1 : runningCount + 1;
        if (runningCount >= count) {
            runningCount = 0;
            lastTrigger = null;
            callback();
        } else {
            lastTrigger = new Date();
        }
    } 
}

function createKeyPhraseListener(phrase, callback) {
    let buffer = [];
    return function checkPhrase(e) {
        buffer.push(keycode(e));
        if (buffer.length > phrase.length) buffer.shift();
        if (buffer.join('') == phrase) callback();
    }
}

function createTimedKeyPhraseListener(phrase, timeout, callback) {
    let buffer = [];
    return function checkPhrase(e) {
        let currTime = new Date().getTime();
        buffer.push({ keycode: keycode(e), timestamp: new Date() });
        buffer = buffer.filter(k => currTime - k.timestamp.getTime() < timeout);
        if (buffer.length > phrase.length) buffer.shift();
        if (buffer.join('') == phrase) {
            buffer = [];
            lastKeydownEvent = null;
            callback();
        } else {
            lastKeydownEvent = new Date();
        }
    }
}

module.exports = { create };