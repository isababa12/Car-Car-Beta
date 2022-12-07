import React from "react";

class CreateModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      picture_url: "",
      manufacturer_id: "",
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
    delete data.manufacturers;
    delete data.submitted;
    const url = "http://localhost:8100/api/models/";
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
        picture_url: "",
        manufacturer_id: "",
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
              <h1>Create a vehicle model</h1>
              <form onSubmit={this.handleSubmit} id="create-model-form">
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
                    value={this.state.picture_url}
                    placeholder="picture_url"
                    required
                    type="picture_url"
                    name="picture_url"
                    id="picture_url"
                    className="form-control"
                  />
                  <label htmlFor="picture_url">Picture URL</label>
                </div>
                <div className="mb-3">
                  <select
                    onChange={this.handleInputChange}
                    value={this.state.manufacturer_id}
                    required
                    name="manufacturer_id"
                    id="manufacturer_id"
                    className="form-select"
                  >
                    <option value="">Choose a manufacturer</option>
                    {this.state.manufacturers.map((manufacturer) => {
                      return (
                        <option key={manufacturer.id} value={manufacturer.id}>
                          {manufacturer.name}
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
      </div>
    );
  }
}

export default CreateModel;
