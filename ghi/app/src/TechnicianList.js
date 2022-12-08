import React from "react";

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
