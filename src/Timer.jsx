import React from 'react';
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet';
import styled from 'styled-components';
import {Button, Icon} from 'react-materialize';
import TeaRepository from './TeaRepository';
import Hourglass from './Hourglass';
import Progress from './Progress';
import TimeDisplay from './TimeDisplay';
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
    this.updateHourglassData = this.updateHourglassData.bind(this);

    this.state = {
      tea: TeaRepository.get(match.params.teaId),
      infusion: 1,
      hourglass_state: 'ready',
    };
  }

  componentDidMount() {
    this.setHourglass();
    requestAnimationFrame(this.updateHourglassData);
  }

  componentWillUnmount() {
    this.stopHourglass();
  }

  setHourglass() {
    this.stopHourglass();

    const callback = function() {
      alert('Your tea is done!');
    };
    const duration = this.state.tea.times[this.state.infusion - 1] * 1000;
    this.hourglass = new Hourglass(callback, duration);
  }

  stopHourglass() {
    if (!this.hourglass) { return; }
    this.hourglass.pause();
  }

  updateHourglassData() {
    if (!this.hourglass) { return; }

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

    requestAnimationFrame(this.updateHourglassData);
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
        <Helmet title="Timer" />

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
