import React from "react";

class CreateAutomobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      year: "",
      vin: "",
      model_id: "",
      models: [],
      submitted: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ models: data.models });
    }
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.models;
    delete data.submitted;
    const url = "http://localhost:8100/api/automobiles/";
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
        color: "",
        year: "",
        vin: "",
        model_id: "",
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
              <h1>Add an automobile to inventory</h1>
              <form onSubmit={this.handleSubmit} id="create-model-form">
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleInputChange}
                    value={this.state.color}
                    placeholder="color"
                    required
                    type="text"
                    name="color"
                    id="color"
                    maxLength={50}
                    className="form-control"
                  />
                  <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleInputChange}
                    value={this.state.year}
                    placeholder="year"
                    required
                    type="text"
                    name="year"
                    id="year"
                    className="form-control"
                  />
                  <label htmlFor="year">Year</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleInputChange}
                    value={this.state.vin}
                    placeholder="vin"
                    required
                    type="text"
                    name="vin"
                    id="vin"
                    maxLength={17}
                    className="form-control"
                  />
                  <label htmlFor="vin">VIN</label>
                </div>
                <div className="mb-3">
                  <select
                    onChange={this.handleInputChange}
                    value={this.state.model_id}
                    required
                    name="model_id"
                    id="model_id"
                    className="form-select"
                  >
                    <option value="">Choose a model</option>
                    {this.state.models.map((model) => {
                      return (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      );
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
          Automobile successfully created!
        </div>
      </div>
    );
  }
}

export default CreateAutomobile;
