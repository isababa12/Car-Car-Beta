import React from "react";

class CreateSalesCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address:"",
            phone: "",
            submitted: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const url = "http://localhost:8090/api/salescustomer/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ sales_customer: data.sales_customer});
        }
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.sales_customer;
        delete data.submitted;
        const url = "http://localhost:8090/api/salescustomer/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const cleared = {
                name: "",
                address: "",
                phone: "",
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
                  <h1>Create a Sales Customer</h1>
                  <form onSubmit={this.handleSubmit} id="create-salescustomer-form">
                    <div className="form-floating mb-3">
                      <input
                        onChange={this.handleInputChange}
                        value={this.state.name}
                        placeholder="name"
                        required
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                      />
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input
                        onChange={this.handleInputChange}
                        value={this.state.address}
                        placeholder="address"
                        required
                        type="text"
                        name="address"
                        id="address"
                        className="form-control"
                      />
                      <label htmlFor="address">Address</label>
                      </div>
                      <div className="form-floating mb-3">
                    <input
                        onChange={this.handleInputChange}
                        value={this.state.phone}
                        placeholder="phone"
                        required
                        type="text"
                        name="phone"
                        id="phone"
                        className="form-control"
                      />
                      <label htmlFor="phone">Phone Number</label>
                      </div>
                    <button id="submit" className="btn btn-primary">
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className={alertClasses} role="alert">
              Sales Customer successfully created!
            </div>
          </div>
        );
      }
}

export default CreateSalesCustomer;
