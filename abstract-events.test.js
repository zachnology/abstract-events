/**
 * @jest-environment jsdom
 */

const abs = require('./abstract-events');
const $ = require('jquery');
const keycode = require('keycode');

describe('Abstract click events', () => {
    describe('Un-timed click events', () => {
        test('Click abstract event should wait until set count before firing', () =>  {
            document.body.innerHTML = '<button id="button" />'
        
            let testCounter = 0;
            let countListener = abs.create({
                type: 'count',
                count: 3
            }, () => testCounter++);
        
            $('#button').on('click', countListener);
            $('#button').trigger('click');
            $('#button').trigger('click');
            $('#button').trigger('click');
            $('#button').trigger('click');
        
            expect(testCounter).toBe(1);
        });
    });

    describe('Timed click events', () => {
        test('Click timed abstract event should only fire if all clicks happen within the threshold time', done => {
            document.body.innerHTML = '<button id="button" />'
        
            let totalCount = 0;
            let testCounter = 0;
            let countListener = abs.create({
                type: 'count',
                count: 3,
                timeout: 1000
            },() => testCounter++);
        
            $('#button').on('click', countListener);

            let id = setInterval(() => {
                $('#button').trigger('click');
                totalCount++;
                if (totalCount >= 3) {
                    clearInterval(id);
                    expect(testCounter).toBe(0);
                    done();
                }
            }, 500);
        });
    });
});

describe('Abstract phrase events', () => {

    function getKeyboardEvent(char) {
        return new KeyboardEvent('keydown', {'keyCode': keycode(char)});
    }

    function triggerKeyboardEvent(event) {
        document.dispatchEvent(event);
    }

    function triggerKeyboardEventsForString(text) {
        [...text].forEach(char => triggerKeyboardEvent(getKeyboardEvent(char)));
    }

    describe('Un-timed events', () => {
        test('Key listener waits for correct string', () => {
            let triggered = false;
            let phrase = 'secret';
            let keyListener = abs.create({
                type: 'phrase',
                phrase: phrase,
            }, () => triggered = true);
        
            document.addEventListener('keydown', keyListener);
            triggerKeyboardEventsForString('ee' + phrase);
        
            expect(triggered).toBe(true);
        });
    });
    
    describe('Timed events', () => {
        test('Timed Key listener waits for correct string', done => {
            let triggered = false;
            let phrase = 'faster';

            let keyListener = abs.create({
                type: 'phrase',
                phrase: phrase,
                timeout: 1000
            }, () => triggered = true);
        
            document.addEventListener('keydown', keyListener);
            triggerKeyboardEventsForString(phrase.substring(0, phrase.length - 1));

            setTimeout(() => {
                triggerKeyboardEventsForString(phrase.substring(phrase.length - 1, phrase.length));
                expect(triggered).toBe(false);
                done();
            }, 1250);
        });
    });
});