// frontend/src/App.js

import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import { DropdownList } from "react-widgets";
import "react-widgets/dist/css/react-widgets.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ActiveTechnologie(props) {
  console.log(props);
  return (
    <div>
      <DropdownList
        data={props.data}
        valueField="id"
        textField="title"
        defaultValue={props.default}
        onChange={props.onChange}
      />
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeTechnologie: {
        title: "",
        description: "",
      },
      activeOperation: {
        technologie: "",
        title: "",
        description: "",
        completed: false,
      },
      technologies: [], //існуючі в базі технології
      operationList: [],
      chosenTechnologie: 1, //вибрана технологія
    };

    /////////all binds here
    this.handleWhatTechnologie = this.handleWhatTechnologie.bind(this);
  } ///end constructor

  /////////////////////////////////////////
  handleWhatTechnologie(value) {
    //console.log("we are heer!!! ");
    //console.log("value.id", value.id);
    //console.log("chosenTechnologie", this.state.chosenTechnologie);
    this.setState({ chosenTechnologie: value.id });
    //console.log("new value=", this.state.chosenTechnologie);
  }

  componentDidMount() {
    this.refreshOperations();
    this.refreshTechnologies();
  }

  refreshTechnologies = () => {
    axios
      .get("http://localhost:8000/api/technologies/")
      .then((res) => this.setState({ technologies: res.data }))
      .catch((err) => console.log(err));
  };

  refreshOperations = () => {
    axios
      .get("http://localhost:8000/api/operations/")
      .then((res) => this.setState({ operationList: res.data }))
      .catch((err) => console.log(err));
  };
  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Операція виконана
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Операція не виконана
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.operationList.filter(
      (item) =>
        item.completed === viewCompleted &&
        item.technologie === this.state.chosenTechnologie //bobik filtering appropriate technologie
    );
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Редагувати
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Видалити
          </button>
        </span>
      </li>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/operations/${item.id}/`, item)
        .then((res) => this.refreshOperations());
      return;
    }
    axios
      .post("http://localhost:8000/api/operations/", item)
      .then((res) => this.refreshOperations());
  };

  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/operations/${item.id}`)
      .then((res) => this.refreshOperations());
  };

  createItem = () => {
    const item = {
      technologie: this.state.chosenTechnologie, //bobik
      title: "",
      description: "",
      completed: false,
    };
    this.setState({ activeOperation: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeOperation: item, modal: !this.state.modal });
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">
          Technoligies app
        </h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Додати технологічну операцію
                </button>
              </div>
              <div className="container">
                <ActiveTechnologie
                  data={this.state.technologies}
                  default={this.state.chosenTechnologie}
                  onChange={(value) => {
                    this.handleWhatTechnologie(value);
                  }}
                />
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeOperation={this.state.activeOperation}
            //technologie={this.state.chosenTechnologie}

            technologie={this.state.technologies.filter(
              (item) => item.id === this.state.chosenTechnologie
            )}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;
