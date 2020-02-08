import React, { Component } from 'react';
import { Person } from './Person';
export class Persons extends Component {
  

  constructor(props) {
    super(props);
    this.state = { persons: [], loading: true };
  }

  componentDidMount() {
    this.updatePersonData();
  }

  static renderPersonsTable(persons) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Возраст</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((item, index) =>
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.surname}</td>
              <td>{item.age}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    console.log(this.props);
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Persons.renderPersonsTable(this.state.persons);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async updatePersonData() {
    const response = await fetch('Person');
    const data = await response.json();
    this.setState({ persons: data, loading: false });
  }
}
