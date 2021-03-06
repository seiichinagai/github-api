import React, { Component } from 'react';
import Form from './components/Form.js';
import Response from './components/Response.js';

class App extends Component {
  render() {
    return (
        <div>
          <h1>Get Number of Commits in Open PRs:</h1>
          <Form />
          <Response ref={
            Response => {
              window.Response = Response
            }
          }/>
        </div>
    );
  }
}

export default App;