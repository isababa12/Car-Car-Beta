import React from "react";
import { Link } from "react-router-dom";

class TechnicianList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      technicians: [],
    };
  }

  async componentDidMount() {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ technicians: data.technicians });
    }
  }

  render() {
    return (
      <>
        <div className="container p-0">
          <div className="row">
            <div className="col">
              <h2 className="my-3">Technicians</h2>
            </div>
            <div className="col-sm-auto d-flex justify-content-center align-items-center">
              <Link to="/technicians/new">
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
              <th>Technician</th>
              <th>Employee number</th>
            </tr>
          </thead>
          <tbody>
            {this.state.technicians.map((technician) => {
              return (
                <tr key={technician.id}>
                  <td>{technician.name}</td>
                  <td>{technician.employee_number}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default TechnicianList;
