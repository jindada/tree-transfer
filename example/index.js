import React, { Component } from 'react';
import { render } from 'react-dom';
import TreeTransfer, { AsyncTreeTransfer } from '../src';
import './style.less';
import data from './data.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target1: ["0-1-1", "1-1-1"],
    };
  }

  onChange = (target) => {
    this.setState({
      target
    });
  }

  render() {
    const { target1 } = this.state;
    return (
      <div className="lucio-tree-transfer-example">
        <p className="pkname">lucio-tree-transfer</p>
        {/* <TreeTransfer {...this.state} rowKey="value" rowTitle="label" onChange={this.onChange} />
        <TreeTransfer {...this.state} rowKey="value" rowTitle="label" onChange={this.onChange} showSearch /> */}
        <AsyncTreeTransfer source={data} target={target1} rowKey="value" rowTitle="label" onChange={this.onChange} showSearch />
        <div className="gh-ribbon"><a href="https://github.com/luciojs/tree-transfer" target="_blank">Fork me on GitHub</a></div>
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));