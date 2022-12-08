import React from "react";

class ModelList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [],
    };
  }

  async componentDidMount() {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ models: data.models });
    }
  }

  render() {
    return (
      <>
        <h2 className="my-3">Models</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {this.state.models.map((model) => {
              return (
                <tr key={model.id}>
                  <td>{model.name}</td>
                  <td>{model.manufacturer.name}</td>
                  <td>
                    <img
                      className="img-thumbnail"
                      src={model.picture_url}
                      height={100}
                      width={100}
                      alt="model"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default ModelList;
