import React from "react";

class CreateSalesRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sale_price: "",
            automobile: "",
            sales_person:"",
            sales_customer: "",
            submitted: false,
        };
        this.handleSalePriceChange = this.handleSalePriceChange.bind(this);
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
        this.handleSalesCustomerChange = this.handleSalesCustomerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const autosUrl = "http://localhost:8100/api/automobiles/";
        const autosResponse = await fetch(autosUrl);
        const salesPersonUrl = "http://localhost:8090/api/salespeople/";
        const salesPersonResponse = await fetch(salesPersonUrl);
        const customerUrl = "http://localhost:8090/api/salescustomer/";
        const customerResponse = await fetch(customerUrl);
        if (autosResponse.ok && salesPersonResponse.ok && customerResponse.ok) {
          const autosData = await autosResponse.json();
          const salesPersonData = await salesPersonResponse.json();
          const customerData = await customerResponse.json();
          this.setState({ automobiles: autosData.autos });
          this.setState({ sales_persons: salesPersonData.sales_person });
          this.setState({ sales_customers: customerData.sales_customer });
        }

    }

    handleSalePriceChange(event) {
        const value = event.target.value;
        this.setState({ sale_price: value});
    }

    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({automobile: value})
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({sales_person: value})
    }
    handleSalesCustomerChange(event) {
        const value = event.target.value;
        this.setState({sales_customer: value})
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.sales_record;
        delete data.automobiles;
        delete data.sales_customers;
        delete data.sales_persons;
        delete data.submitted;
        const url = "http://localhost:8090/api/salesrecord/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, fetchConfig);
        console.log(data)
        if (response.ok) {
            const cleared = {
                sale_price: "",
                automobile: "",
                sales_person: "",
                sales_customer: "",
                submitted: true,
            };
            this.setState(cleared);
            this.componentDidMount();
        }
    }

    render() {
        let alertClasses = "alert alert-success w-50 mx-auto mt-3 d-none";
        if (this.state.submitted) {
          alertClasses = "alert alert-success w-50 mx-auto mt-3";
        }
        return (
          <div className="container">
            <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Create a Sales Record</h1>
                  <form onSubmit={this.handleSubmit} id="create-salesrecord-form">
                  <div className="form-floating mb-3">
                    <input
                        onChange={this.handleSalePriceChange}
                        value={this.state.sale_price}
                        placeholder="sale_price"
                        required
                        type="number"
                        name="sale_price"
                        id="sale_price"
                        className="form-control"
                      />
                      <label htmlFor="sale_price">Sale price</label>
                      </div>
                    <div className="form-floating mb-3">
                      <select
                        onChange={this.handleAutomobileChange}
                        value={this.state.autos}
                        placeholder="automobile"
                        required
                        type="text"
                        name="automobile"
                        id="automobile"
                        className="form-select">
                      <option value="">Choose an automobile</option>
                      {this.state?.automobiles?.map((automobile)=> {
                        return(
                            <option key={automobile.vin} value={automobile.vin}>
                                {automobile.vin}
                            </option>
                        )
                      })}
                      </select>
                    </div>
                    <div className="form-floating mb-3">
                      <select
                        onChange={this.handleSalesPersonChange}
                        value={this.state.sales_person}
                        placeholder="sales_person"
                        required
                        type="text"
                        name="sales_person"
                        id="sales_person"
                        className="form-select">
                      <option value="">Choose a salesperson</option>
                      {this.state?.sales_persons?.map((sales_person)=> {
                        return(
                            <option key={sales_person.id} value={sales_person.id}>
                                {sales_person.name}
                            </option>
                        )
                      })}
                      </select>
                    </div>
                    <div className="form-floating mb-3">
                      <select
                        onChange={this.handleSalesCustomerChange}
                        value={this.state.sales_customer}
                        placeholder="sales_customer"
                        required
                        type="text"
                        name="sales_customer"
                        id="sales_customer"
                        className="form-select">
                      <option value="">Choose a customer</option>
                      {this.state?.sales_customers?.map((customer)=> {
                        return(
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        )
                      })}
                      </select>
                    </div>
                    <button id="submit" className="btn btn-primary">
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className={alertClasses} role="alert">
              Sales Record successfully created!
            </div>
          </div>
        );
      }
}

export default CreateSalesRecord;
