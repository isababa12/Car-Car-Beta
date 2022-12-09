import React from "react";
import { Link } from "react-router-dom";

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
        <div className="container p-0">
          <div className="row">
            <div className="col">
              <h2 className="my-3">Automobiles</h2>
            </div>
            <div className="col-sm-auto d-flex justify-content-center align-items-center">
              <Link to="/automobiles/new">
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
                  <td>
                    <img src={automobile.model.picture_url} width="175" />
                  </td>
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
