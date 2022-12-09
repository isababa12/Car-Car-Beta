import React from "react";
import { Link } from "react-router-dom";

class CreateAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      vehicle_vin: "",
      time: "",
      technician: "",
      reason: "",
      technicians: [],
      submitted: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ technicians: data.technicians });
    }
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data.customer_name = data.name;
    delete data.technicians;
    delete data.submitted;
    delete data.name;
    let temp = new Date(data.time);
    data.time = temp.toISOString();

    const url = "http://localhost:8080/api/appointments/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const cleared = {
        name: "",
        vehicle_vin: "",
        time: "",
        technician: "",
        reason: "",
        submitted: true,
      };
      this.setState(cleared);
    }
  }

  render() {
    let alertClasses = "alert alert-success w-50 mx-auto mt-3 d-none";
    if (this.state.submitted) {
      alertClasses = "alert alert-success w-50 mx-auto mt-3";
    }
    let today = new Date();
    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a service appointment</h1>
              <form onSubmit={this.handleSubmit} id="create-appointment-form">
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleInputChange}
                    value={this.state.name}
                    placeholder="name"
                    required
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                  />
                  <label htmlFor="name">Owner name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleInputChange}
                    value={this.state.vehicle_vin}
                    placeholder="vehicle_vin"
                    required
                    type="text"
                    name="vehicle_vin"
                    id="vehicle_vin"
                    maxLength={17}
                    className="form-control"
                  />
                  <label htmlFor="vehicle_vin">Vehicle VIN</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleInputChange}
                    value={this.state.time}
                    placeholder="time"
                    required
                    type="datetime-local"
                    name="time"
                    id="time"
                    min={today.toISOString()}
                    step="900"
                    className="form-control"
                  />
                  <label htmlFor="time">Time</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleInputChange}
                    value={this.state.reason}
                    placeholder="reason"
                    required
                    type="text"
                    name="reason"
                    id="reason"
                    className="form-control"
                  />
                  <label htmlFor="reason">Reason</label>
                </div>
                <div className="mb-3">
                  <select
                    onChange={this.handleInputChange}
                    value={this.state.technician}
                    required
                    name="technician"
                    id="technician"
                    className="form-select"
                  >
                    <option value="">Choose a technician</option>
                    {this.state.technicians.map((technician) => {
                      return (
                        <option
                          key={technician.employee_number}
                          value={technician.id}
                        >
                          {technician.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button id="submit" className="btn btn-primary">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className={alertClasses} role="alert">
          Appointment successfully created! Click{" "}
          <Link to="/appointments">here</Link> to go back to appointments.
        </div>
      </div>
    );
  }
}

export default CreateAppointment;
