import React from 'react';
import styled from 'styled-components';
import {Button, Icon} from 'react-materialize';

const SpacedButton = styled(Button)`
  margin: 0 15px;
`;

const Wrapper = styled.div`
  text-align: center;
`;

const ControlButton = props => {
  var {icon, ...other} = props;
  return (
    <SpacedButton floating waves="light" {...other}>
      <Icon>{icon}</Icon>
    </SpacedButton>
  );
}

const ControlButtons = props => {
  const PlayButton = <ControlButton key="play" onClick={props.onPlay}
                        large className="green" icon="play_arrow"/>;
  const PauseButton = <ControlButton key="pause" onClick={props.onPause}
                        className="grey" icon="pause"/>;
  const ResetButton = <ControlButton key="reset" onClick={props.onReset}
                        className="grey" icon="replay"/>;
  const PrevButton = <ControlButton key="prev" onClick={props.onPrev}
                       className="grey" icon="skip_previous" disabled={props.isFirst}/>;
  const SmallNextButton = <ControlButton key="next" onClick={props.onNext}
                            className="grey" icon="skip_next"/>;
  const LargeNextButton = <ControlButton key="next" onClick={props.onNext}
                            large className="green" icon="skip_next"/>;

  let buttons = [];
  switch (props.state) {
    case 'ready':
      buttons = [PrevButton, PlayButton, SmallNextButton];
      break;
    case 'running':
      buttons = [PauseButton];
      break;
    case 'paused':
      buttons = [ResetButton, PlayButton];
      break;
    case 'done':
      buttons = [PrevButton, ResetButton, LargeNextButton];
      break;
    default:
      throw new Error('Unknown state');
  }

  return <Wrapper>{buttons}</Wrapper>;
}

export default ControlButtons;
