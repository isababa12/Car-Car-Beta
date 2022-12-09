import React from "react";
import { Link } from "react-router-dom";

class AppointmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
    };
  }

  async componentDidMount() {
    const url = "http://localhost:8080/api/appointments/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ appointments: data.appointments });
    }
  }

  truthCheck(value) {
    if (value) {
      return <td>&#10004;</td>;
    } else {
      return <td></td>;
    }
  }

  async cancelAppointment(id) {
    const url = `http://localhost:8080/api/appointments/${id}/cancel/`;
    const fetchConfig = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      this.componentDidMount();
    }
  }

  async completeAppointment(id) {
    const url = `http://localhost:8080/api/appointments/${id}/complete/`;
    const fetchConfig = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      this.componentDidMount();
    }
  }

  render() {
    return (
      <>
        <div className="container p-0">
          <div className="row">
            <div className="col">
              <h2 className="my-3">Service appointments</h2>
            </div>
            <div className="col-sm-auto d-flex justify-content-center align-items-center">
              <Link to="/appointments/new">
                <button type="button" className="btn btn-primary">
                  Create
                </button>
              </Link>
            </div>
          </div>
        </div>
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
            </tr>
          </thead>
          <tbody>
            {this.state.appointments.map((appointment) => {
              const dateObj = new Date(appointment.time);
              const options = { timeStyle: "short" };
              if (
                appointment.canceled === false &&
                appointment.completed === false
              ) {
                return (
                  <tr key={appointment.id}>
                    <td>{appointment.vehicle_vin}</td>
                    <td>{appointment.customer_name}</td>
                    <td>{dateObj.toLocaleDateString()}</td>
                    <td>{dateObj.toLocaleTimeString([], options)}</td>
                    <td>{appointment.technician.name}</td>
                    <td>{appointment.reason}</td>
                    {this.truthCheck(appointment.discount)}
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={(e) =>
                          this.cancelAppointment(appointment.id, e)
                        }
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={(e) =>
                          this.completeAppointment(appointment.id, e)
                        }
                      >
                        Completed
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default AppointmentList;
