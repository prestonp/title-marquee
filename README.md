title-marquee.js
-------------

> Scrolling text in your browser's title ♫ ♪

### Install

```shell
npm install title-marquee
```

or clone this repo.

### Usage

This plugin follows the CommonJS spec, so you can bundle and require it
on the browser with browserify or the like.

```javascript
<script>
var tm = require('title-marquee');

// Scroll text
tm('Get Low - Lil Jon and the Eastside Boyz');

// Scroll in reverse
tm({ text: 'Someone Like You - Adele', type: 'reverse' });

// Scroll left and right
tm({ text: 'Cool Kids - Echosmith', type: 'bounce' });

// Faster!!!!
tm({ text: 'Heartless - Kanye West', speed: 150 });

// Or use engrish
tm({ text: 'Hot in Herrre - Nelly', speed: 'slow' });

// Other stuff
tm.pause();
tm.resume();
tm.toggle();
tm.text('Change the title to this text right here');

</script>
```

Consecutive calls to title-marquee will replace the current title.

### Default Options

```javascript
{
  buffer: 10,       // # chars shown
  type: 'scroll',   // 'scroll' | 'reverse' | 'bounce'
  speed: 'normal',  // 'slow' | 'normal' | 'fast' | time in ms
}
```


### API

##### tm(options)

Pass in an options hash or just a string to kick off the scrolling.

##### .pause()

Pauses that shit

##### .resume()

Resume the scrolling

##### .toggle()

Too lazy to care? Flip a switch.

##### .text(str)

Updates the text in place without resetting the scroll offset. This is
great for making live updates. For example, frequently updated things like
displaying currently playing song or the number of active users.

### Manual Build

```shell
npm run build
```

### License

MIT
