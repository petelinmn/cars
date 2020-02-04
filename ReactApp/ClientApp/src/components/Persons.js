import React, { Component } from 'react';

export class Persons extends Component {
  static displayName = Persons.name;

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
          {Persons.map((Person, index) =>
            <tr key={index}>
              <td>{Person.name}</td>
              <td>{Person.surname}</td>
              <td>{Person.age}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
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
    const response = await fetch('Persons');
    const data = await response.json();
    this.setState({ persons: data, loading: false });
  }
}
