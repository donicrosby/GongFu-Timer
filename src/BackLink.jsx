import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import {Button, Icon} from 'react-materialize';

const HomeLink = (props) => {
  const Fixed = styled(Button)`
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 12px 0 8px;
    border-radius: 0 0 2px 0;
  `;
  return (
    <Link to={props.to}>
      <Fixed className="blue-grey darken-3" waves="light">
        <Icon>chevron_left</Icon>
      </Fixed>
    </Link>
  );
};

export default HomeLink;
