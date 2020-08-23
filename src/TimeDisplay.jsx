import React from 'react';
import styled from 'styled-components';
import Format from './Format';


class TimeDisplay extends React.Component {

  setTime(time) {
    if (!this.timeComponent) { return; }
    this.timeComponent.textContent = Format.formatTime(time);
  }

  getDisplay() {
    return (
    styled.div`
      position: absolute;
      left: 0;
      width: 100%;
      color: ${this.props.state === 'paused' ? '#9e9e9e' : '#212121'};
      top: ${this.props.state === 'done' ? '9vw' : '20vw'};
      font-size: ${this.props.state === 'done' ? '32vw' : '15vw'};
      @media (max-width: 600px) {
        top: ${this.props.state === 'done' ? '11vw' : '22vw'};
      }
      @media (min-width: 765px) {
        top: ${this.props.state === 'done' ? '70px' : '155px'};
        font-size: ${this.props.state === 'done' ? '242px' : '115px'};
      }`
    )
  }

  render() {
    const time = <span ref={ref => this.timeComponent = ref}/>;
    const checkmark = <span>&#10003;</span>;
    const Display = this.getDisplay();
    return <Display>{this.props.state === 'done' ? checkmark : time}</Display>;
  }
}

export default TimeDisplay;
