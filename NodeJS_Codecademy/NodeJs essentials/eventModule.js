let events = require('events');

let listenerCallback = (data) => {
    console.log(`Celebrate ${data}`);
}

let myEmitter = new events.EventEmitter();

myEmitter.on('celebration', listenerCallback);

myEmitter.emit('celebration', 'good times, come on!');