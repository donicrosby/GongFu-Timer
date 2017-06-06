class Hourglass {
  constructor(callback, duration) {
    if (!callback instanceof Function) {
      throw new Error('callback should be a function');
    }
    if (!Number.isInteger(duration)) {
      throw new Error('duration should be an integer');
    }
    if (duration <= 0) {
      throw new Error('duration should be positive');
    }

    this.callback = callback;
    this.duration = duration;

    this.startedAt = 0;
    this.timeLeft = this.duration;
    this.timeout = null;
  }

  start() {
    if (this.getState() === 'running') { return; }
    if (this.getState() === 'done') { return; }
    this.startedAt = Date.now();
    startTimeout.call(this);
  }

  pause() {
    if (this.getState() !== 'running') { return; }
    this.timeLeft -= timeSinceStarted.call(this);
    this.startedAt = 0;
    stopTimeout.call(this);
  }

  reset() {
    this.startedAt = 0;
    this.timeLeft = this.duration;
    stopTimeout.call(this);
  }

  getState() {
    if (this.startedAt > 0) {
      return 'running';
    }
    if (this.timeLeft === this.duration) {
      return 'ready'
    }
    if (this.timeLeft <= 0) {
      return 'done'
    }
    return 'paused';
  }

  getTimeLeft() {
    return this.timeLeft - timeSinceStarted.call(this);
  }

  getTimeDone() {
    return this.duration - this.getTimeLeft();
  }

  getPercentageLeft() {
    return 100 * this.getTimeLeft() / this.duration;
  }

  getPercentageDone() {
    return 100 - this.getPercentageLeft();
  }
}

function timeSinceStarted() {
  if (this.getState() !== 'running') { return 0; }
  return (Date.now() - this.startedAt);
}

function startTimeout() {
  stopTimeout.call(this);
  var onTimeOut = function() {
    this.startedAt = 0;
    this.timeLeft = 0;
    this.callback.call(null);
  };
  this.timeout = window.setTimeout(onTimeOut.bind(this), this.getTimeLeft());
}

function stopTimeout() {
  if (!this.timeout) { return; }
  window.clearTimeout(this.timeout);
  this.timeout = null;
}

export default Hourglass;
