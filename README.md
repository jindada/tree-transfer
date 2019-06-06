## antd-tree-transfer (old: lucio-tree-transfer)
---

React tree transfer Component with antd

<p>

</p>

[![NPM version](https://img.shields.io/npm/v/antd-tree-transfer.svg?style=flat)](https://npmjs.org/package/antd-tree-transfer)
[![NPM downloads](http://img.shields.io/npm/dm/antd-tree-transfer.svg?style=flat)](https://npmjs.org/package/antd-tree-transfer)
[![Test coverage](https://img.shields.io/codecov/c/github/jindada/tree-transfer/master.svg?style=flat-square)](https://codecov.io/gh/luciojs/tree-transfer/branch/master)

## Install

[![rc-rate](https://nodei.co/npm/antd-tree-transfer.png)](https://npmjs.org/package/antd-tree-transfer)


## Development

```
npm install
npm start
```

## Example

http://localhost:9000/

online example: https://jindada.github.io/tree-transfer/


## Usage

```js
import React, { Component } from 'react';
import TreeTransfer from 'antd-tree-transfer';

const source = [
  {
    key: '0',
    title: '0',
    children: [
      {
        key: '0-0',
        title: '0-0',
      },
      {
        key: '0-1',
        title: '0-1',
      }
    ]
  }
],

class App extends Component {
  state = {
    target: ['0-1']
  }

  handleChange = (target) => {
    this.setState({
      target
    });
  }

  render() {
    return <TreeTransfer source={source} target={this.state.target} onChange={this.handleChange}>
  }
}

render(<App />, document.querySelector('#app'));
```


## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 选择器 className | String | - |
| rowKey | 指定数据列的key | String | 'key' |
| rowTitle | 指定数据列的title | String | 'title' |
| rowChildren | 指定数据列的children | String | 'children' |
| source | 数据源，其中的数据将会被渲染到左侧框（Tree）中 | Array | [] |
| target | 显示在右侧框数据的key集合 | Array | [] |
| sourceTitle | 左侧框标题 | String | '源数据' |
| targetTitle | 右侧框标题 | String | '目的数据' |
| treeLoading | 加载状态 | Boolean | false |
| showSearch | 是否显示搜索框 | Boolean | false |
| onLoadData | 异步加载数据 | function(node) | - |
| onTreeSearch | 异步搜索数据 | function(value) | - |

## License

antd-tree-transfer is released under the MIT license.
