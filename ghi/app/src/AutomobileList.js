import React from "react";

class AutomobileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      automobiles: [],
    };
  }

  async componentDidMount() {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ automobiles: data.autos });
    }
  }

  render() {
    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Manufacturer</th>
              <th>Year</th>
              <th>Model</th>
              <th>Color</th>
              <th>Model Picture</th>
            </tr>
          </thead>
          <tbody>
            {this.state.automobiles.map((automobile) => {
              return (
                <tr key={automobile.id}>
                  <td>{automobile.vin}</td>
                  <td>{automobile.year}</td>
                  <td>{automobile.model.manufacturer.name}</td>
                  <td>{automobile.model.name}</td>
                  <td>{automobile.color}</td>
                  <td><img src={automobile.model.picture_url} width="175"/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default AutomobileList;
