import React from "react";
import { Link } from "react-router-dom";

class SalesPersonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales_person: [],
    };
  }

  async componentDidMount() {
    const url = "http://localhost:8090/api/salespeople/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ sales_person: data.sales_person });
    }
  }

  render() {
    return (
      <>
        <div className="container p-0">
          <div className="row">
            <div className="col">
              <h2 className="my-3">Salespeople</h2>
            </div>
            <div className="col-sm-auto d-flex justify-content-center align-items-center">
              <Link to="/salespeople/new">
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
              <th>Salespeople</th>
              <th>Employee Number</th>
            </tr>
          </thead>
          <tbody>
            {this.state.sales_person.map((sales_person) => {
              console.log(sales_person);
              return (
                <tr key={sales_person.id}>
                  <td>{sales_person.name}</td>
                  <td>{sales_person.number}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default SalesPersonList;
