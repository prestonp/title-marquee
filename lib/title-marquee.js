var intervalId;

var speeds = {
  'normal': 1000,
  'slow': 2000,
  'fast': 500
};

var state = {
  text: '',
  buffer: 10,       // # chars shown
  type: 'scroll',   // scroll | reverse | bounce | page
  speed: 'normal',  // slow | normal | fast | time in ms
  offset: 0         // text offset
};

var scroll = function(opts) {
  if (typeof opts === 'string') {
    state.text = opts;
  } else {
    state.text = opts.text || state.text;
    state.speed = opts.speed || state.speed;
    state.type = opts.type || state.type;
    state.buffer = opts.buffer || state.buffer;
  }

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
  }, speeds[state.speed] || 1000);
};

scroll.toggle = function() {
  if (intervalId) {
    scroll.pause();
  } else {
    scroll.resume();
  }
};

module.exports = scroll;
