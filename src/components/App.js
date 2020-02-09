import React from 'react'
import Form from './Form'
import GitSearch from './GitSearch'
var QueryList = require('./QueryList');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : []
    };
    this.normalizeData = (rawData) => {
      return rawData[1].map(function(title, index) {
        return {
          title: title,
          paragraph: rawData[2][index],
          link: rawData[3][index]
        }
      })
    }
    this.addNewResult = (queryResult) => {
      if(queryResult === null) {
        this.setState({data: []})
        return;
      }
      const searchResult = this.normalizeData(queryResult)
      this.setState({ data: searchResult });
    }
  };

  render() {
    return (
      <div className='container'>
        <h1>Iluvatar Search</h1>
        <p>Programmer's Search Engine vicicita</p>
        <a target ="_blank" href="https://en.wikipedia.org/wiki/Special:Random"><i className="fa fa-random" aria-hidden="true"></i></a>
        <Form onInput={this.addNewResult}/>
        <QueryList query={this.state.data} />
        <GitSearch/>
      </div>
    )
  }
}

export default App