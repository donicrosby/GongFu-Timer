import React from 'react';
var indicator = require('ordinal/indicator');

export default {
  formatSeconds: function(seconds) {
    if (seconds < 60) {
      return seconds + 's';
    }

    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    if (seconds === 0) {
      return minutes + 'm';
    }

    return minutes + 'm' + seconds;
  },

  formatOrdinal: function(number) {
    return <span>{number}<sup>{indicator(number)}</sup></span>;
  }
};
