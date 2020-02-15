import React, { Component } from 'react';

export class FileManager extends Component {
    constructor(props) {
        super(props);
        this.state = {path: []};
    }
    changePath(name) {
       
        this.setState ({path: this.state.path.concat(name)})
    }
    crumbsClick(index) {
        this.setState ({path: this.state.path.slice(0, index)})
    }
    componentDidMount() {
      fetch('FileManager/getpath/discD@' + this.state.path.length ? this.state.path.join('@') : ''
      ).then(res => {
        res.json().then(data=>{console.log(data)})
      })

    }
    render() {
        const dir = {}//getDir(data, this.state.path)
        let data = {};
        return (
            <div>
            <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
              {
                [data.name].concat(this.state.path).map((item, index) =>{
                  return <li className="breadcrumb-item" key={index}><a href="#" onClick={()=>this.crumbsClick.bind(this)(index)}>{item}</a></li>
             })}
              </ol>
            </nav>
            </div>
            <ul className="list-group">
            {dir.dirs ? dir.dirs.map((item, index) => {
            return (
            <li key={index} className="list-group-item" onClick={()=>this.changePath.bind(this)(item.name)}>{item.name}</li> 
            )}) : null}
            {dir.files ? dir.files.map((item, index) => {
                return (
                <li key={index} className="list-group-item">
                {item}</li>
            )}) : null}
            </ul>
            </div>
        )
    }
}




