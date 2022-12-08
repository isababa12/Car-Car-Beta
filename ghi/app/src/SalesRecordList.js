import React from "react";

class SalesRecordList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sales_record: [],
        };
    }

    async componentDidMount() {
        const url = "http://localhost:8090/api/salesrecord/";
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          this.setState({ sales_record: data.sales_record });
        }
    }

    render() {
        return (
          <>
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
                {this.state.sales_record.map((sales_record) => {
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

    export default SalesRecordList;
