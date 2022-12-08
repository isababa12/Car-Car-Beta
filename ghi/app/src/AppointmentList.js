import React from "react";

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

  discountCheck(discount) {
    if (discount) {
      return <td>&#10004;</td>;
    } else {
      return <td></td>;
    }
  }

  render() {
    return (
      <>
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
                  {this.discountCheck(appointment.discount)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default AppointmentList;
