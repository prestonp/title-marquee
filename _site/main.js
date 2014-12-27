var tm = require('title-marquee');

var text = 'Vinyl scenester +1 Helvetica cold-pressed, single-origin coffee';
var btns = document.querySelectorAll('.btn-demo');

btns[0].addEventListener('click', function(e) {
  tm({ text: text, speed: 'fast' });
});

btns[1].addEventListener('click', function(e) {
  tm({ text: text, type:'reverse', speed: 'fast' });
});

btns[2].addEventListener('click', function(e) {
  tm({ text: text, type:'bounce', speed: 'fast' });
});
