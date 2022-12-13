import React from "react";

class SalesPersonSales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
    };
    this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
    this.handleSalesRecordChange = this.handleSalesRecordChange.bind(this);
  }
  handleSalesPersonChange(event) {
    const value = event.target.value;
    this.setState({ sales_person: value });
  }
  async handleSalesRecordChange(event) {
    const value = event.target.value;
    this.setState({ sales_record: value });
    const url = `http://localhost:8090/api/salesrecord/${value}/`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      this.setState({ sales_records: data.sales_record });
    }
  }
  async componentDidMount() {
    const url = "http://localhost:8090/api/salespeople/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ sales_persons: data.sales_person });
    }
  }
  render() {
    return (
      <>
        <div className="container p-0">
          <h2>Sales Person's Sales History</h2>
        </div>
        <div className="mb-3">
          <select
            onChange={this.handleSalesRecordChange}
            value={this.state.sales_person}
            placeholder="sales_person"
            type="text"
            name="sales_person"
            id="sales_person"
            className="form-select"
          >
            <option value="">Choose a salesperson</option>
            {this.state?.sales_persons?.map((sales_person) => {
              return (
                <option key={sales_person.id} value={sales_person.id}>
                  {sales_person.name}
                </option>
              );
            })}
          </select>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Sales Person</th>
              <th>Employee Number</th>
              <th>Customer</th>
              <th>VIN</th>
              <th>Sale Price</th>
            </tr>
          </thead>
          <tbody>
            {this.state?.sales_records?.map((sales_record) => {
              return (
                <tr key={sales_record.id}>
                  <td>{sales_record.sales_person.name}</td>
                  <td>{sales_record.sales_person.number}</td>
                  <td>{sales_record.sales_customer.name}</td>
                  <td>{sales_record.automobile.vin}</td>
                  <td>${sales_record.sale_price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default SalesPersonSales;
