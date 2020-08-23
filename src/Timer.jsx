import React from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import styled from 'styled-components';
import {Button, Icon} from 'react-materialize';
import Push from 'push.js'
import BackLink from './BackLink';
import TeaRepository from './TeaRepository';
import Hourglass from './Hourglass';
import Progress from './Progress';
import TimeDisplay from './TimeDisplay';
import FaviconProgress from './FaviconProgress';
import ControlButtons from './ControlButtons';
import Format from './Format';
import { NoMatch } from './App.jsx'

const Top = styled.div`
  position: absolute;
  bottom: initial;
  top: 23px;
`;

const EditButton = props => {
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

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.hourglass = null;
    this.setHourglass = this.setHourglass.bind(this);
    this.stopHourglass = this.stopHourglass.bind(this);
    this.highPriorityUpdate = this.highPriorityUpdate.bind(this);
    this.lowPriorityUpdate = this.lowPriorityUpdate.bind(this);

    const tea = TeaRepository.get(props.match.params.teaId);

    this.state = {
      tea: tea,
      infusion: 1,
      hourglass_state: 'ready',
      teaId: props.match.params.teaId,
      shouldRender: !(tea === undefined),
      props: props
    };
  }

  componentDidMount() {
    if (this.state.shouldRender) {
      this.setHourglass();
      this.faviconProgress = new FaviconProgress();
      Push.Permission.request();

      this.highPriorityUpdate();
      this.lowPriorityUpdate();
    }
  }

  componentWillUnmount() {
    if(this.state.shouldRender) {
      cancelAnimationFrame(this.highPriorityFrame);
      clearTimeout(this.lowPriorityTimeout);

      this.stopHourglass();
      this.faviconProgress.reset();
    }
  }

  setHourglass() {
    this.stopHourglass();

    const callback = function() {
      Push.create('Your tea is ready!', {
        vibrate: [200, 100, 200, 100, 200],
        timeout: 5000,
      });
    };
    var duration
    if (this.state.infusion <= this.state.tea.times.length) {
      duration = this.state.tea.times[this.state.infusion - 1] * 1000;
    } else {
      duration = this.state.tea.times[this.state.tea.times.length - 1] * 1000;
    }

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
    if (this.state.shouldRender) {
      return (
        <div>
          <BackLink to="/"/>

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
    } else {
      this.state.props.history.push("/")
      return (
        <NoMatch {...this.state.props} />
      )
    }
  }
}

export default withRouter(Timer);
