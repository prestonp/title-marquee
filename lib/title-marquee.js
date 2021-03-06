var intervalId;

var speeds = {
  'normal': 1000,
  'slow': 2000,
  'fast': 500
};

var state = {};

var def = {
  text: '',
  buffer: 10,       // # chars shown
  type: 'scroll',   // scroll | reverse | bounce | page
  speed: 'normal',  // slow | normal | fast | time in ms
  offset: 0         // text offset
};

var getSpeed = function(speed) {
  if (typeof speed === 'string')
    return speeds[speed] || speeds['normal'];
  else if (typeof speed === 'number')
    return speed;
  else
    return speeds['normal'];
};

var scroll = function(opts) {
  if (typeof opts === 'string') {
    opts = { text: opts };
  }

  state.text = opts.text || def.text;
  state.speed = opts.speed || def.speed;
  state.type = opts.type || def.type;
  state.buffer = opts.buffer || def.buffer;
  state.offset = opts.offset || def.offset;

  // double text, idk bout this
  state.text = state.text + ' ' + state.text;

  // clear existing intervals
  scroll.pause();
  scroll.resume();

  window.scroll = scroll;
};

scroll.text = function(text) {
  state.text = text + ' ' + text;
};

scroll.pause = function() {
  clearInterval(intervalId);
};

scroll.resume = function() {
  if (!document) return;

  var direction = 1;
  var slice;
  var len;

  intervalId = setInterval(function() {
    len = (state.text.length-1)/2;
    switch(state.type) {
      case 'bounce':
        slice = state.text.substr(state.offset, state.buffer);
        document.title = slice;
        // bound left and right of text
        if( (state.offset + state.buffer + direction > len) ||
            (state.offset + direction < 0) ) {
          direction *= -1;
        }
        state.offset = state.offset + direction;
        break;
      case 'reverse':
        slice = state.text.substr(len - state.offset, state.buffer);
        document.title = slice;
        state.offset = (state.offset + 1) % len;
        break;
      case 'scroll':
      default:
        slice = state.text.substr(state.offset, state.buffer);
        document.title = slice;
        state.offset = (state.offset + 1) % len;
        break;
    }
  }, getSpeed(state.speed));
};

scroll.toggle = function() {
  if (intervalId) {
    scroll.pause();
  } else {
    scroll.resume();
  }
};

module.exports = scroll;
