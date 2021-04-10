//just example how to do dropdown
import React from "react";
import ReactDOM from "react-dom";
import Select from "react-select";

class SomeComponent extends React.Component {
  state = {
    caregivers: [
      { idCaregiver: "1", caregiverName: "User1", otherData: "data1" },
      { idCaregiver: "2", caregiverName: "User2", otherData: "data2" },
    ],
    Caregiver_idCaregiver: "",
  };

  saveUser = (e) => {
    e.preventDefault();

    const user = { Caregiver_idCaregiver: this.state.Caregiver_idCaregiver };
    const foundCaregiverObj = this.state.caregivers.find(
      (caregiver) => caregiver.idCaregiver === this.state.Caregiver_idCaregiver
    );

    console.log(user);
    console.log(foundCaregiverObj);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renderOptions = (options) => {
    return options.map((option) => {
      return { value: option.idCaregiver, label: option.caregiverName };
    });
  };
  render() {
    return (
      <div>
        <label>Caregiver:</label>
        <Select
          options={this.renderOptions(this.state.caregivers)}
          name="Caregiver_idCaregiver"
          onChange={(e) =>
            this.onChange({ target: { ...e, name: "Caregiver_idCaregiver" } })
          }
        />
        <button onClick={this.saveUser}>Save</button>
      </div>
    );
  }
}

ReactDOM.render(<SomeComponent />, document.getElementById("root"));
