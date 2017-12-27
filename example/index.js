import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.less';
import TreeTransfer from '../src';

class App extends Component {
  render() {
    return (
      <div className="lucio-tree-transfer-example">
        <TreeTransfer />
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));