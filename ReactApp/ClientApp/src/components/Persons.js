import React, { Component } from 'react';


class Editor extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      surname: '',
      age: 0
    }
  }

  render() {
    return <div>
              <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">Имя</span>
              </div>
                <input value={this.state.name} onChange={(e)=>{this.setState({name: e.target.value})}} type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
              </div>


              <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">Фамилия</span>
              </div>
                <input value = {this.state.surname} onChange={(e)=>{this.setState({surname: e.target.value})}} type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
              </div>

              
              <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">Возраст</span>
              </div>
                <input value={this.state.age} onChange={(e)=>{this.setState({age: parseInt(e.target.value)})}} type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
              </div>


              <button type="button" className="btn btn-primary" onClick={() => { 
                
                const person = {
                  name:this.state.name,
                  surname:this.state.surname,
                  age:this.state.age
                };

                //ОТправляем на сервер
                fetch('Person/add', {
                  method: 'POST', // *GET, POST, PUT, DELETE, etc.
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(person) // body data type must match "Content-Type" header
                }).then(res => {
                  this.props.onSave(true);
                })

                
              }}>Сохранить</button>
              <button type="button" className="btn btn-primary" onClick={() => {this.props.onCancel()}}>Отмена</button>
            </div>
  }
}

export class Persons extends Component {
  

  constructor(props) {
    super(props);
    this.state = { persons: [], loading: true };
  }

  componentDidMount() {
    this.updatePersonData();
  }

  static renderPersonsTable(persons, deletePerson) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th colSpan="3">Возраст</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((item, index) =>
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.surname}</td>
              <td>{item.age}</td>
              <td onClick = {() => {deletePerson(item.id)}}>X</td>
              <td><button type="button" className="btn btn-primary" onClick={()=>{console.log(item)}}>Редактировать</button></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  onAdd() {
    this.setState({editMode: true});
  }
  deletePerson (id) {
    fetch('Person/delete/' + id, {
      method: 'DELETE', 
      headers: { 'Content-Type': 'application/json' },
    }).then(() => {
      this.setState({editMode: false});
      this.updatePersonData();
    })
  }

  render() {
    if(this.state.editMode) {
      return <Editor onCancel={()=>{ this.setState({editMode: false}) }} 
                      onSave={updated=>{
                        if(updated) {
                          this.setState({editMode: false});
                          this.updatePersonData();
                        }
                      }}/>
    }


    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Persons.renderPersonsTable(this.state.persons, this.deletePerson.bind(this));

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
        <button type="button" className="btn btn-primary" onClick={this.onAdd.bind(this)}>Добавить</button>
      </div>
    );
  }

  async updatePersonData() {
    const response = await fetch('Person');
    const data = await response.json();
    this.setState({ persons: data, loading: false });
  }
}
