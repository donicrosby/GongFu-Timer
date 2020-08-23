import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import {Button, Collection, CollectionItem} from 'react-materialize';
import TeaRepository from './TeaRepository';
import Format from './Format';

const Header = styled.h1`
  font-size: 1.6em;
  padding: 12px 20px;
  margin: 0;
`;

const CollectionHeader = props => {
  return (
    <li className="collection-header green white-text">
      <Header>{ props.children }</Header>
    </li>
  );
};

const Item = styled(CollectionItem)`
  padding: 0 !important;
`;
const TeaLink = styled(Link)`
  font-size: 1.2em;
  text-transform: initial;
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 10px 30px 10px 20px;
`;

const Times = styled.small`
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CollectionTeaItem = props => {

  TeaLink.defaultProps = {
    className: 'btn-flat waves-effect waves-green'
  };
  return (
    <Item>
      <TeaLink to={'/timer/' + props.editId}>
        { props.name }
        <br/><Times>{ props.times.map(Format.formatSeconds).join(', ') }</Times>
      </TeaLink>
    </Item>
  );
};

const AddTeaLink = () => (
  <div className="right-align">
    <Link to="/edit">
      <Button floating large className="green" waves="light" icon="add" />
    </Link>
  </div>
);

const Overview = () => (
  <div style={{overflow: 'auto'}}>
    <Collection>
      <CollectionHeader>GongFu Timer</CollectionHeader>
      { TeaRepository.getAll().map(item =>
        <CollectionTeaItem
          key={item.key}
          name={item.name}
          times={item.times}
          editId={item.key}
        />
      ) }
    </Collection>
    <AddTeaLink />
  </div>
);

export default Overview;
