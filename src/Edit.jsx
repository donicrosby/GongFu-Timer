import React from 'react';
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet';
import styled from 'styled-components';
import {Row, Col, Button, Icon, Input} from 'react-materialize';
import TeaRepository from './TeaRepository';
import Format from './Format';

const NameInput = props => (
  <Row>
    <Input s={12} label="Name" style={{fontSize: '1.8rem'}}
      value={props.value} onChange={props.onChange}/>
  </Row>
);

const DeleteButton = props => {
  const Top = styled.div`
    position: absolute;
    bottom: initial;
    top: 23px;
  `;
  return (
    <Top className="fixed-action-btn">
      <Button floating className="red" onClick={props.onClick}>
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
    <OffsetButton floating large className="green" waves="light" icon="add"
                  onClick={props.onAdd}/>;
  const DeleteButton =
    <OffsetButton floating large className="transparent z-depth-0" waves="light"
                  onClick={props.onDelete}>
      <Icon className="red-text">delete</Icon>
    </OffsetButton>;
  return props.showAdd ? AddButton : DeleteButton;
}

const InfusionInput = props => {
  return (
    <Row>
      <Col s={12}>
        <label htmlFor={'infusion_'+props.number}>
          {Format.formatOrdinal(props.number)} infusion
        </label>
        &nbsp;
        <div className="input-field inline">
          <input id={'infusion_'+props.number} type="number"
                 value={props.value} onChange={props.onChange}
                 style={{textAlign: 'center'}}/>
        </div>
        &nbsp; sec
        <ActionButton showAdd={props.showAdd}
          onAdd={props.onAdd} onDelete={props.onDelete}/>
      </Col>
    </Row>
  );
};

class Edit extends React.Component {
  constructor({match, props}) {
    super(props);

    let tea = TeaRepository.get(match.params.teaId);
    if (tea === undefined) { tea = TeaRepository.getNew(); }
    this.state = tea;

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTimeAdd = this.handleTimeAdd.bind(this);
    this.handleTimeDelete = this.handleTimeDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleTimeChange(index, value) {
    let times = this.state.times;
    times[index] = parseInt(value, 10);
    this.setState({times: times});
  }
  handleTimeAdd() {
    let times = this.state.times;
    let newValue = 10;
    if (times.length === 1) {
      newValue = times[0] + 10;
    } else if (times.length >= 2) {
      const last = times[times.length-1];
      const prev = times[times.length-2];
      let diff = last - prev;
      if (diff <= 0) { diff = 10; }
      newValue = last + diff;
    }
    times.push(newValue);
    this.setState({times: times});
  }
  handleTimeDelete(index) {
    let times = this.state.times;
    times.splice(index, 1);
    this.setState({times: times});
  }

  handleDelete() {
    TeaRepository.delete(this.state.key);
  }

  handleSave() {
    // Validate
    TeaRepository.set(this.state);
  }

  render() {
    return (
      <div>
        <Helmet title={this.state.name.length > 0 ? 'Editing ' + this.state.name : 'Edit'} />

        <NameInput value={this.state.name} onChange={this.handleNameChange}/>

        <Link to="/">
          <DeleteButton onClick={this.handleDelete}/>
        </Link>

        { this.state.times.map((time, index) =>
          <InfusionInput
            key={index}
            number={index+1}
            showAdd={index+1 === this.state.times.length}
            onChange={e => this.handleTimeChange(index, e.target.value)}
            onAdd={() => this.handleTimeAdd()}
            onDelete={() => this.handleTimeDelete(index)}
            value={time}
          />
        ) }

        <Link to="/">
          <Button large className="green" waves="light" onClick={this.handleSave}>
            Save <Icon right>send</Icon>
          </Button>
        </Link>
      </div>
    );
  }
};

export default Edit;
