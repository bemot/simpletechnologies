// frontend/src/components/Modal.js

import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    //console.log("in modal -> technologie", props.technologie); //bobik
    this.state = {
      activeOperation: this.props.activeOperation,
      technologie: this.props.technologie,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeOperation = { ...this.state.activeOperation, [name]: value };
    this.setState({ activeOperation });
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Операція </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>
                <div>Технологія: {this.state.technologie[0].title}</div>
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="title">Назва опереції</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeOperation.title}
                onChange={this.handleChange}
                placeholder="Введіть назву опереції"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Опис опереції</Label>
              <Input
                type="text"
                name="description"
                value={this.state.activeOperation.description}
                onChange={this.handleChange}
                placeholder="Введіть опис операції"
              />
            </FormGroup>
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeOperation.completed}
                  onChange={this.handleChange}
                />
                Операція виконана
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeOperation)}
          >
            Зберегти
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
