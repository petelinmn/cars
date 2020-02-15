import React, { Component } from 'react';

function getDir(data, path) {
    //Если путь пустой значит возвращаем эту же папку
    if(path.length === 0)
        return data;
    
    //Название следующей папки
    const next = path[0];
    //Ищем объект следующая папка
    const nextDir = data.dirs.find(item => item.name === next);
    if(!nextDir)
        return null; //Видимо какой то косяк
    
    //Если это был последний элемент пути
    if(path.length === 1) {
        return nextDir; //Возвращаем то что искали
    } else {
        return getDir(nextDir, path.slice(1)) //ищем глубже
    }
}

const data = {
  name: 'diskD',
  files: ['file1.txt', 'file2.txt'],
  dirs: [
      { 
          name: 'documents',
          files: ['phones.txt', 'tickets.doc', 'resume.rtf'],
          dirs: [
              {
                  name: 'Старые документы',
                  files: ['курсовая.pdf']
              },
              {
                  name: 'Новые документы',
                  files: ['Записки рыбака.txt', 'Бухло.jpg']
              }
          ]
      },
      {
          name: 'music',
          dirs: [
              {
                  name: 'Русский рок',
                  dirs: [
                      {
                          name: 'скучное',
                          files: ['хара мамбуру.mp3']
                      }
                  ],
                  files: ['БГ-Аделаида.mp3', 'Сплин-Мое сердце.mp3']
              }
          ]
      }
  ]
}


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
      console.log('componentDidMount');

    }
    render() {
        const dir = getDir(data, this.state.path)
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




