import React from 'react';
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet';
import styled from 'styled-components';
import {Button, Icon} from 'react-materialize';
import TeaRepository from './TeaRepository';
import Progress from './Progress';
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

    this.state = {
      tea: TeaRepository.get(match.params.teaId),
      infusion: 1
    } ;
  }

  render() {
    const Title = styled.h1`
      font-size: 3.5em;
    `;
    const SubTitle = styled.h2`
      font-size: 2.5em;
    `;
    const Warpper = styled.div`
      position: relative;
      text-align: center;
    `;
    const Time = styled.div`
      position: absolute;
      left: 0;
      width: 100%;
      top: 20vw;
      font-size: 15vw;
      @media (max-width: 600px) {
        top: 22vw;
      }
      @media (min-width: 765px) {
        top: 155px;
        font-size: 115px;
      }
    `;
    return (
      <div>
        <Helmet title="Timer" />

        <Title>{this.state.tea.name}</Title>
        <SubTitle>{Format.formatOrdinal(this.state.infusion)} infusion</SubTitle>
        <EditButton to={'/edit/'+this.state.key}/>

        <Warpper>
          <Progress progress="70"/>
          <Time>1:20</Time>
        </Warpper>

        <ControlButtons state="ready" isFirst={this.state.infusion === 1}/>
        {/*<ControlButtons state="playing" isFirst={this.state.infusion === 1}/>*/}
        {/*<ControlButtons state="paused" isFirst={this.state.infusion === 1}/>*/}
        {/*<ControlButtons state="done" isFirst={this.state.infusion === 1}/>*/}
      </div>
    );
  }
}

export default Timer;
