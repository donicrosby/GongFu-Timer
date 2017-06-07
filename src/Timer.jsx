import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import {Button, Icon} from 'react-materialize';
import Push from 'push.js'
import TeaRepository from './TeaRepository';
import Hourglass from './Hourglass';
import Progress from './Progress';
import TimeDisplay from './TimeDisplay';
import FaviconProgress from './FaviconProgress';
import ControlButtons from './ControlButtons';
import Format from './Format';

const EditButton = props => {
  const Top = styled.div`
    position: absolute;
    bottom: initial;
    top: 23px;
  `;
  return (
    <Top className="fixed-action-btn">
      <Link to={props.to}>
        <Button floating className="green" waves="light">
          <Icon>mode_edit</Icon>
        </Button>
      </Link>
    </Top>
  );
};

class Timer extends React.Component {
  constructor({match, props}) {
    super(props);

    this.hourglass = null;
    this.setHourglass = this.setHourglass.bind(this);
    this.stopHourglass = this.stopHourglass.bind(this);
    this.highPriorityUpdate = this.highPriorityUpdate.bind(this);
    this.lowPriorityUpdate = this.lowPriorityUpdate.bind(this);

    const tea = TeaRepository.get(match.params.teaId);
    if (tea === undefined) { window.location = '/'; }

    this.state = {
      tea: tea,
      infusion: 1,
      hourglass_state: 'ready',
    };
  }

  componentDidMount() {
    this.setHourglass();
    this.faviconProgress = new FaviconProgress();
    Push.Permission.request();

    this.highPriorityUpdate();
    this.lowPriorityUpdate();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.highPriorityFrame);
    clearTimeout(this.lowPriorityTimeout);

    this.stopHourglass();
    this.faviconProgress.reset();
  }

  setHourglass() {
    this.stopHourglass();

    const callback = function() {
      Push.create('Your tea is ready!', {
        vibrate: [200, 100, 200, 100, 200],
        timeout: 5000,
      });
    };
    const duration = this.state.tea.times[this.state.infusion - 1] * 1000;
    this.hourglass = new Hourglass(callback, duration);
  }

  stopHourglass() {
    if (!this.hourglass) { return; }
    this.hourglass.pause();
  }

  highPriorityUpdate() {
    if (this.hourglass) {

      const hourglassState = this.hourglass.getState();
      if (hourglassState !== this.state.hourglass_state) {
        this.setState({hourglass_state: hourglassState});
      }

      if (this.timeComponent) {
        const timeLeft = Math.round(this.hourglass.getTimeLeft() / 1000);
        this.timeComponent.setTime(timeLeft);
      }

      if (this.progressComponent) {
        const percentageDone = this.hourglass.getPercentageDone();
        this.progressComponent.setProgress(percentageDone);
      }

    }
    this.highPriorityFrame = requestAnimationFrame(this.highPriorityUpdate);
  }

  lowPriorityUpdate() {
    if (this.hourglass) {

      const timeLeft = Math.round(this.hourglass.getTimeLeft() / 1000);
      let title = 'Timer: ' + this.state.tea.name;
      if (this.state.hourglass_state === 'running') {
        title = 'Brewing: ' + Format.formatTime(timeLeft);
      }
      if (this.state.hourglass_state === 'paused') {
        title = 'Paused: ' + Format.formatTime(timeLeft);
      }
      document.title = title;

      const percentageDone = this.hourglass.getPercentageDone();
      this.faviconProgress.setProgress(percentageDone, this.state.hourglass_state);

    }
    this.lowPriorityTimeout = setTimeout(this.lowPriorityUpdate, 500);
  }

  controlButtons() {
    const hourglassAction = action => {
      if (!this.hourglass) { return; }
      this.hourglass[action]();
    };

    const switchInfusion = delta => {
      this.setState(
        {infusion: Math.max(1, this.state.infusion + delta)},
        this.setHourglass
      );
    };

    return (
      <ControlButtons
        state={this.state.hourglass_state}
        isFirst={this.state.infusion === 1}
        onPlay={() => hourglassAction('start')}
        onPause={() => hourglassAction('pause')}
        onReset={() => hourglassAction('reset')}
        onPrev={() => switchInfusion(-1)}
        onNext={() => switchInfusion(+1)}
      />
    );
  }

  render() {
    const Title = styled.h1`
      font-size: 3.5em;
    `;
    const SubTitle = styled.h2`
      font-size: 2.5em;
    `;
    const Wrapper = styled.div`
      position: relative;
      text-align: center;
    `;
    return (
      <div>
        <Title>{this.state.tea.name}</Title>
        <SubTitle>{Format.formatOrdinal(this.state.infusion)} infusion</SubTitle>
        <EditButton to={'/edit/'+this.state.tea.key}/>

        <Wrapper>
          <Progress ref={ref => this.progressComponent = ref}/>
          <TimeDisplay
            state={this.state.hourglass_state}
            ref={ref => this.timeComponent = ref}
          />
        </Wrapper>

        {this.controlButtons()}
      </div>
    );
  }
}

export default Timer;
