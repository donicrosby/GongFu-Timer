import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import {Row, Col, Button, Icon, Input} from 'react-materialize';
import TeaRepository from './TeaRepository';
import Format from './Format';

const NameInput = () => {
  const LargeInput = styled(Input)`
    font-size: 1.8rem !important;
  `;
  return (
    <Row>
      <LargeInput s={12} label="Name"/>
    </Row>
  );
};

const DeleteButton = () => {
  const Top = styled.div`
    bottom: initial;
    top: 23px;
  `;
  return (
    <Top className="fixed-action-btn">
      <Button floating className="red">
        <Icon large>delete</Icon>
      </Button>
    </Top>
  );
};

const ActionButton = props => {
  const OffsetButton = styled(Button)`
    margin-left: 2.5em;
  `;
  const AddButton =
    <OffsetButton floating large className="green" waves="light" icon="add" />;
  const DeleteButton =
    <OffsetButton floating large className="transparent z-depth-0" waves="light">
      <Icon className="red-text">delete</Icon>
    </OffsetButton>;
  return props.addButton ? AddButton : DeleteButton;
}

const InfusionInput = props => {
  return (
    <Row>
      <Col s={12}>
        <label for={'infusion_'+props.number}>
          {Format.formatOrdinal(props.number)} infusion
        </label>
        &nbsp;
        <div className="input-field inline">
          <input id={'infusion_'+props.number} type="number"/>
        </div>
        &nbsp; sec
        <ActionButton addButton={props.addButton}/>
      </Col>
    </Row>
  );
};

const Edit = () => (
  <div>
    <Helmet title="Edit" />

    <NameInput/>
    <DeleteButton/>

    <InfusionInput number="1" addButton={false}/>
    <InfusionInput number="2" addButton={true}/>

    <Button large className="green" waves="light">
      Save <Icon right>send</Icon>
    </Button>
  </div>
);

export default Edit;
