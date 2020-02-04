import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { cars: [], loading: true };
  }

  componentDidMount() {
    this.updateCarData();
  }

  static renderCarsTable(cars) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Марка</th>
            <th>Модель</th>
            <th>Год выпуска</th>
            <th>Возраст</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) =>
            <tr key={index}>
              <td>{car.marka}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.age}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderCarsTable(this.state.cars);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async updateCarData() {
    const response = await fetch('car');
    const data = await response.json();
    this.setState({ cars: data, loading: false });
  }
}
