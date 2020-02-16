import React, { Component } from 'react';

export class FileManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
          disk: 'C',
          disks: ['C'],
          path: [],
          data: null
        };
    }
    changePath(name) {
      let newPath = this.state.path.concat(name);
      this.setPath(newPath);
    }

    componentDidMount() {
      this.changePath([]);
      this.getAllDisks();
    }

    crumbsClick(index) {
      this.setPath(this.state.path.slice(0, index));
    }

    setPath(path, disk = this.state.disk) {
      let url = 'FileManager/' + disk + (path.length ? ('/' + path.join('@')) : '');
      console.log(url);
      fetch(url).then(res => {
        res.json().then(data => {
          if(data.success) {
            this.setState({path: path, data: data.result, disk: disk});
          } else {
            alert(data.errorMessage);
          }
        }).catch(err => alert('Некорректный ответ от сервера!'))
      }).catch(err => alert('Ошибка запроса к серверу!'));
    }

    getAllDisks() {
      fetch('FileManager/disks').then(res => res.json().then(data => {
        if(data.success) {
          this.setState({disks: data.result});
        } else {
          alert(data.errorMessage);
        }
      }))
    }

    render() {
        if(!this.state.data) {
          return <h1>Идет загрузка...</h1>
        }
        
        return (
            <div>
              <div>
                {this.state.disks.map(disk => <button className="btn"
                                                      key={disk} 
                                                      ariaPressed={disk === this.state.disk}
                                                      onClick = {() => { 
                                                        if(disk !== this.state.disk) {
                                                          this.setPath([], disk);
                                                        }
                                                      }}>{disk + ':\\'}</button>)}
              </div>
              <div>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                  {
                    [this.state.disk + ':'].concat(this.state.path).map((item, index) =>{
                      return <li className="breadcrumb-item " key={index}>
                              <a style={index === this.state.path.length ? {color:  "black"} : {color:  "blue", cursor: "pointer"}} 
                                onClick={()=>this.crumbsClick.bind(this)(index)}>
                                {item}
                              </a>
                            </li>
                })}
                  </ol>
                </nav>
              </div>
              <div style={{height:"900px", overflow: "scroll"}}>
                <ul className="list-group" style={{heigth:"400px"}}>
                {this.state.data.dirs ? this.state.data.dirs.map((item, index) => {
                return (
                  <li key={index} className="list-group-item" style={{backgroundColor: "rgb(255, 255, 200)"}} onClick={()=>this.changePath.bind(this)(item)}>
                    {item}
                  </li> 
                )}) : null}
                {this.state.data.files ? this.state.data.files.map((item, index) => {
                    return (
                    <li key={index} className="list-group-item" style={{backgroundColor: "rgb(200, 200, 200)"}}>
                    {item}</li>
                )}) : null}
                </ul>
              </div>
            </div>
        )
    }
}




