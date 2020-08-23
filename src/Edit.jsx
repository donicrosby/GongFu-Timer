import React from 'react';
import {Link} from 'react-router-dom'
import Helmet from 'react-helmet';
import styled from 'styled-components';
import M from 'materialize-css';
import {Row, Col, Button, Icon, TextInput, Modal} from 'react-materialize';
import BackLink from './BackLink';
import TeaRepository from './TeaRepository';
import Format from './Format';

const NameInput = props => (
  <Row>
    <TextInput s={12} label={false} style={{fontSize: '1.8rem'}}
      value={props.value} onChange={props.onChange}/>
  </Row>
);

const Top = styled.div`
  position: absolute;
  bottom: initial;
  top: 23px;
`;

const StyledModal = styled(Modal)`
  outline: none;
`

const ModalButton = styled(Button)`
  margin-left: 15px;
  margin-right: 15px;
  float: right;
`;
// const DeleteButton = (props) => {
//   return (
//
//   );
// };

const DeleteModal = (props) => (
  <StyledModal
    actions={[
    <div>
      <ModalButton floating className="red" waves="light" onClick={props.onToggle}>
        <Icon>close</Icon>
      </ModalButton>
      <ModalButton floating className="green" waves="light" onClick={props.onOkay}>
        <Icon>check</Icon>
      </ModalButton>
    </div>
    ]}
    bottomSheet={false}
    fixedFooter={false}
    header={props.text}
    open={props.open}
    options={{
      dismissible: false,
      endingTop: '10%',
      inDuration: 250,
      onCloseEnd: null,
      onCloseStart: null,
      onOpenEnd: null,
      onOpenStart: null,
      opacity: 0.5,
      outDuration: 250,
      preventScrolling: true,
      startingTop: '4%'
    }}
    trigger={
      <Top className="fixed-action-btn">
        <Button floating className="red" waves="light" onClick={props.onToggle}>
          <Icon>delete</Icon>
        </Button>
      </Top>
    }/>
    // <div className="modal-footer">
    //   <Link className="modal-action modal-close waves-effect waves-green btn-flat"
    //         to="/" onClick={props.onAgree}>
    //     Agree
    //   </Link>
    // </div>
  // <div id="modal-delete" className="modal">
  //   <div className="modal-content">
  //     <h4></h4>
  //   </div>
  //
  // </div>
);

const OffsetButton = styled(Button)`
  margin-left: 2.5em;
`;

const ActionButton = props => {
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
    this.state["showDeleteModal"] = false
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTimeAdd = this.handleTimeAdd.bind(this);
    this.handleTimeDelete = this.handleTimeDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSave(tea);
  }

  componentDidMount() {
    M.AutoInit();
    $('.modal').modal(); // eslint-disable-line no-undef
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
    this.props.history.push("/");
  }

  handleToggleModal() {
    let modalValue = !this.state.showDeleteModal
    this.setState({showDeleteModal: modalValue});
  }

  handleSave() {
    // Validate
    TeaRepository.set(this.state);
  }

  render() {

    const deleteButton = (
      <div>
        <DeleteModal
          onOkay={this.handleDelete.bind(this)}
          onToggle={this.handleToggleModal.bind(this)}
          open={this.state.showDeleteModal}
          text={'Delete ' + this.state.name + '?'}/>
      </div>
    );
    return (
      <div>
        <Helmet title={this.state.name.length > 0 ? 'Editing ' + this.state.name : 'Edit'} />
        <BackLink to={'/timer/' + this.state.key}/>

        <NameInput value={this.state.name} onChange={this.handleNameChange}/>

        { this.state.key !== undefined ? deleteButton : null }

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

        <Link to={'/timer/' + this.state.key}>
          <Button large className="green" waves="light" onClick={this.handleSave}>
            Save <Icon right>send</Icon>
          </Button>
        </Link>
      </div>
    );
  }
};

export default Edit;
