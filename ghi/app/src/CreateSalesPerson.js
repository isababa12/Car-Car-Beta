import React from "react";

class CreateSalesPerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            number: "",
            submitted: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const url = "http://localhost:8090/api/salespeople/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ sales_person: data.sales_person});
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
        delete data.sales_person;
        delete data.submitted;
        const url = "http://localhost:8090/api/salespeople/";
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
                number: "",
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
                  <h1>Create a Sales Person</h1>
                  <form onSubmit={this.handleSubmit} id="create-salesperson-form">
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
                        value={this.state.number}
                        placeholder="number"
                        required
                        type="text"
                        name="number"
                        id="number"
                        className="form-control"
                      />
                      <label htmlFor="number">Employee Number (eg: 3 digits)</label>
                      </div>
                    <button id="submit" className="btn btn-primary">
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className={alertClasses} role="alert">
              Sales Person successfully created!
            </div>
          </div>
        );
      }
}

export default CreateSalesPerson;
