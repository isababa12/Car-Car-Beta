import React from "react";

class CreateManufacturer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturer: "",
      manufacturers: [],
      submitted: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ manufacturers: data.manufacturers });
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
    data.name = data.manufacturer;
    delete data.manufacturer;
    delete data.manufacturers;
    delete data.submitted;
    const url = "http://localhost:8100/api/manufacturers/";
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
        manufacturer: "",
        submitted: true,
      };
      this.setState(cleared);
      this.componentDidMount();
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new manufacturer</h1>
              <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handleInputChange}
                    value={this.state.manufacturer}
                    placeholder="Manufacturer"
                    required
                    type="text"
                    name="manufacturer"
                    id="manufacturer"
                    className="form-control"
                  />
                  <label htmlFor="manufacturer">Manufacturer</label>
                </div>
                <button id="submit" className="btn btn-primary">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* <div className={alertClasses} role="alert">
          Hat successfully created!
        </div> */}
      </div>
    );
  }
}

export default CreateManufacturer;
