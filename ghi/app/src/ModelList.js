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
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            {this.state.models.map((model) => {
              return (
                <tr key={model.id}>
                  <td>{model.name}</td>
                  <td>{model.picture_url}</td>
                  <td>{model.manufacturer.name}</td>
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
