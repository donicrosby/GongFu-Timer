import React from 'react';

class Progress extends React.Component {
  constructor(props) {
    super(props);

    this.backgroundPath = this.renderPath('#b9ceba', 100);
    this.foregroundPath = this.renderPath('#4caf50', 0, ref => this.progressPath = ref);
  }

  setProgress(progress) {
    this.progressPath.setAttribute('stroke-dashoffset', this.getDashOffset(progress));
  }

  getDashLength() {
    return 312;
  }

  getDashOffset(progress) {
    return this.getDashLength() * (100 - progress) / 100;
  }

  renderPath(color, progress, ref = () => {}) {
    return (
      <g transform="translate(0 -193)">
        <path d="m 58.842234,196.99418 c -3.196579,1.8e-4 -5.787876,2.59958 -5.788056,5.80615
        0,1.89152 0.920119,3.66405 2.463658,4.7505 -19.58933,1.53259 -23.609185,11.35392
        -29.435757,15.38317 l -8.306029,-1.69825 c -2.98607,1.94357 -5.426707,5.05295
        -6.460091,7.99352 12.893293,13.62353 3.470089,23.69897 20.303962,37.95662
        11.696101,9.90615 53.033457,14.76839 64.78682,-10.73881 36.031019,9.50673
        35.849869,-41.7464 -2.215546,-34.62397 -5.590026,-3.01071 -12.340091,-13.77615
        -31.800758,-14.43866 1.412123,-1.09918 2.23883,-2.79114 2.239867,-4.58412
        -1.93e-4,-3.20657 -2.59149,-5.80597 -5.78807,-5.80615 z m 56.427656,41.52952
        c -0.11497,8.54283 -7.48291,13.15972 -15.22066,9.21022 1.71509,-5.91967
        -0.008,-13.4858 -1.801242,-18.96436 7.736032,-2.26661 17.094132,4.38577 17.021902,9.75414 z"
        fill="none" strokeWidth="2" strokeLinejoin="round" stroke={color} ref={ref}
        strokeDasharray={this.getDashLength()} strokeDashoffset={this.getDashOffset(progress)}/>
      </g>
    );
  }

  render(props) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-7.8 0 133 87"
           style={{width:'100%', maxWidth:'650px'}}>
        {this.backgroundPath}
        {this.foregroundPath}
      </svg>
    );
  }
}

export default Progress;
