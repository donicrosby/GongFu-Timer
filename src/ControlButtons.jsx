import React from 'react';
import styled from 'styled-components';
import {Button, Icon} from 'react-materialize';

const ControlButton = props => {
  const SpacedButton = styled(Button)`
    margin: 0 15px;
  `;
  var {icon, ...other} = props;
  return (
    <SpacedButton floating waves="light" {...other}>
      <Icon>{icon}</Icon>
    </SpacedButton>
  );
}

const ControlButtons = props => {
  const PlayButton = <ControlButton key="play" large className="green" icon="play_arrow"/>;
  const PauseButton = <ControlButton key="pause" className="grey" icon="pause"/>;
  const RestartButton = <ControlButton key="restart" className="grey" icon="replay"/>;
  const PrevButton = <ControlButton key="prev" className="grey" icon="skip_previous" disabled={props.isFirst}/>;
  const SmallNextButton = <ControlButton key="next" className="grey" icon="skip_next"/>;
  const LargeNextButton = <ControlButton key="next" large className="blue" icon="skip_next"/>;

  let buttons = [];
  switch (props.state) {
    case 'ready':
      buttons = [PrevButton, PlayButton, SmallNextButton];
      break;
    case 'playing':
      buttons = [PauseButton];
      break;
    case 'paused':
      buttons = [RestartButton, PlayButton];
      break;
    case 'done':
      buttons = [PrevButton, RestartButton, LargeNextButton];
      break;
    default:
      throw new Error('Unknown state');
  }

  const Wrapper = styled.div`
    text-align: center;
  `;

  return <Wrapper>{buttons}</Wrapper>;
}

export default ControlButtons;
