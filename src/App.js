import React, { Component } from 'react';
import Modal from './components/Modal/Modal';
import Tasks from "./containers/Tasks/Tasks";

class App extends Component {
  render() {
    return (
      <Modal>
        <Tasks />
      </Modal>
    );
  }
}

export default App;
