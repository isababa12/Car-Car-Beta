import React from "react";

class SalesCustomerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          sales_customer: [],
        };
    }

    async componentDidMount() {
        const url = "http://localhost:8090/api/salescustomer/";
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          this.setState({ sales_customer: data.sales_customer });
        }
    }

    render() {
        return (
          <>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Sales Customers</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {this.state.sales_customer.map((sales_customer) => {
                  return (
                    <tr key={sales_customer.id}>
                      <td>{sales_customer.name}</td>
                      <td>{sales_customer.address}</td>
                      <td>{sales_customer.phone}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        );
    }
}

    export default SalesCustomerList;
