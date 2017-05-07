export default {
  formatSeconds: function(seconds) {
    if (seconds < 60) {
      return seconds + ' sec';
    }

    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    if (seconds === 0) {
      return minutes + ' min';
    }

    return minutes + ' min ' + seconds + ' sec';
  }
};
