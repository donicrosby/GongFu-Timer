class FaviconProgress {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvas.height = 16;
    this.ctx = this.canvas.getContext('2d');
  }

  init() {
    if (this.favicon) { return; }

    this.favicon = document.querySelectorAll('link[rel="icon"]').item(0);
    if (this.favicon) {
      this.originalFavicon = this.favicon.href;
    }
  }

  setProgress(progress, status = 'running') {
    this.init();
    if (!this.favicon) { return; }

    if (status !== 'running') {
      this.reset();
      return;
    }

    this.ctx.clearRect(0, 0, 16, 16);

    // background
    this.ctx.strokeStyle = '#b9ceba';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.arc(8, 8, 7, 0, 2 * Math.PI);
    this.ctx.stroke();

    // foreground
    this.ctx.strokeStyle = '#4caf50';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    const startAngle = 1.5 * Math.PI;
    const endAngle = startAngle - 2 * Math.PI * progress / 100;
    this.ctx.arc(8, 8, 6, startAngle, endAngle, true);
    this.ctx.stroke();

    this.favicon.href = this.canvas.toDataURL('image/png');
  }

  reset() {
    this.init();
    if (!this.favicon) { return; }

    this.favicon.href = this.originalFavicon;
  }
}

export default FaviconProgress;
