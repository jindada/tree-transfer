import React, { Component } from 'react';
import { render } from 'react-dom';
import TreeTransfer from '../src';
import './style.less';
import async from './async.json';
import data from './data.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: data,
      target: [],
      asyncSource: async,
      asyncTarget: [],
      asyncLoading: false
    };
  }

  onChange = (target) => {
    this.setState({
      target
    });
  }

  onAsyncChange = (target) => {
    this.setState({
      asyncTarget: target
    });
  }

  onLoadData = (node) => new Promise(resolve => {
    if (node.props.children.length > 0) {
      resolve();
      return;
    } else {
      setTimeout(() => {
        this.setState({
          asyncSource: mergeTree(this.state.asyncSource, node.props.eventKey, makeChildren(node.props.eventKey))
        }, () => {
          resolve();
          return;
        });
      }, 2000);
    }
  })

  onTreeSearch = (value) => {
    this.setState({
      asyncLoading: true
    }, () => {
      setTimeout(() => {
        this.setState({
          asyncSource: data,
          asyncLoading: false
        });
      }, 2000);
    });
  }

  render() {
    const { source, target, asyncSource, asyncTarget, asyncLoading } = this.state;

    const treeTransferProps = {
      source,
      target,
      rowKey: "value",
      rowTitle: "label",
      onChange: this.onChange
    };

    return (
      <div className="lucio-tree-transfer-example">
        <p className="pkname">lucio-tree-transfer</p>
        <h4>1.基本用法</h4>
        <TreeTransfer {...treeTransferProps} />
        <h4>2.显示搜索框</h4>
        <TreeTransfer {...treeTransferProps} showSearch />
        <h4>3.异步用法</h4>
        <TreeTransfer {...treeTransferProps} source={asyncSource} target={asyncTarget} onChange={this.onAsyncChange} onLoadData={this.onLoadData} />
        <h4>3.异步用法，显示搜索框</h4>
        <TreeTransfer {...treeTransferProps} source={asyncSource} target={asyncTarget} onChange={this.onAsyncChange} onLoadData={this.onLoadData} showSearch onTreeSearch={this.onTreeSearch} treeLoading={asyncLoading} />
        <div className="gh-ribbon"><a href="https://github.com/luciojs/tree-transfer" target="_blank">Fork me on GitHub</a></div>
      </div>
    );
  }
}

export const mergeTree = (treeData, key, children) => {
  const loop = data => data.forEach((item) => {
    if (item.children) {
      if (item.value === key) {
        item.children = children;
      } else {
        loop(item.children);
      }
    }
  });
  loop(treeData);
  return treeData;
};

const makeChildren = (key) => [
  {
    "value": `${key}-0`,
    "label": "异步叶子"
  },
  {
    "value": `${key}-1`,
    "label": "异步叶子"
  },
];

render(<App />, document.querySelector('#app'));