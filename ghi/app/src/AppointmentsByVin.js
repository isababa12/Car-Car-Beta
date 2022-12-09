import React from "react";

class AppointmentsByVin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vin: "",
      appointments: [],
      error: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  async getAppointments(vin) {
    const url = `http://localhost:8080/api/appointments/${vin}/`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ appointments: data, error: false });
    } else {
      this.setState({ error: true });
    }
  }

  truthCheck(value) {
    if (value) {
      return <td>&#10004;</td>;
    } else {
      return <td></td>;
    }
  }

  render() {
    let alertClasses = "alert alert-danger d-none";
    if (this.state.error === true) {
      alertClasses = "alert alert-danger";
    }
    return (
      <>
        <div className="input-group mb-3 mt-3">
          <input
            onChange={this.handleInputChange}
            value={this.state.vin}
            placeholder="Vehicle VIN"
            required
            type="text"
            name="vin"
            id="vin"
            className="form-control input-lg"
          ></input>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={(e) => this.getAppointments(this.state.vin, e)}
            >
              Search
            </button>
          </div>
        </div>
        <h2 className="my-3">Service appointments</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Customer name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Technician</th>
              <th>Reason</th>
              <th>VIP?</th>
              <th align="center">Completed?</th>
            </tr>
          </thead>
          <tbody>
            {this.state.appointments.map((appointment) => {
              const dateObj = new Date(appointment.time);
              const options = { timeStyle: "short" };
              return (
                <tr key={appointment.id}>
                  <td>{appointment.vehicle_vin}</td>
                  <td>{appointment.customer_name}</td>
                  <td>{dateObj.toLocaleDateString()}</td>
                  <td>{dateObj.toLocaleTimeString([], options)}</td>
                  <td>{appointment.technician.name}</td>
                  <td>{appointment.reason}</td>
                  {this.truthCheck(appointment.discount)}
                  {this.truthCheck(appointment.completed)}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={alertClasses} role="alert">
          Vehicle VIN not found! Please re-enter input.
        </div>
      </>
    );
  }
}

export default AppointmentsByVin;
