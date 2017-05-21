import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import {Button, Collection, CollectionItem} from 'react-materialize';
import TeaRepository from './TeaRepository';
import TimeMath from './TimeMath';

const CollectionHeader = props => {
  const Header = styled.h1`
    font-size: 1.6em;
    padding: 12px 20px;
    margin: 0;
  `;
  return (
    <li className="collection-header green white-text">
      <Header>{ props.children }</Header>
    </li>
  );
};

const CollectionTeaItem = props => {
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
  TeaLink.defaultProps = {
    className: 'btn-flat waves-effect waves-green'
  };
  const Times = styled.small`
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
  return (
    <Item>
      <TeaLink to={ '/edit/' + props.editId }>
        { props.name }
        <br/><Times>{ props.times.map(TimeMath.formatSeconds).join(', ') }</Times>
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
  <div>
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
