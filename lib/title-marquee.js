var intervalId;

var speeds = {
  'normal': 1000,
  'slow': 2000,
  'fast': 500
};

var state = {
  text: '',
  buffer: 10,       // # chars shown
  type: 'scroll',   // scroll | reverse | bounce
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

  // normalize buffer length
  if ( state.text.length <= state.buffer )
    state.buffer = state.text.length;

  scroll.resume();

  window.scroll = scroll;
};

scroll.text = function(text) {
  state.text = text;
};

scroll.pause = function() {
  clearInterval(intervalId);
};

scroll.resume = function() {
  if (!document) return;
  intervalId = setInterval(function() {
    var slice = state.text.substr(state.offset, state.buffer);
    document.title = slice;
    state.offset = (state.offset + 1) % (state.text.length/2);
  }, speeds[state.speed] || 1000);
};

scroll.toggle = function() {
  if (intervalId)
    scroll.pause();
  else
    scroll.resume();
};

module.exports = scroll;
