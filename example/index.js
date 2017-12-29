import React, { Component } from 'react';
import { render } from 'react-dom';
import TreeTransfer, { AsyncTreeTransfer } from '../src';
import './style.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: [
        {
          "value": "0",
          "label": "哈尔滨",
          "children": [
            {
              "value": "0-1",
              "label": "南岗区",
              "children": [
                {
                  "value": "0-1-1",
                  "label": "黑龙江大学"
                },
                {
                  "value": "0-1-2",
                  "label": "哈尔滨理工大学"
                },
                {
                  "value": "0-1-3",
                  "label": "哈尔滨工业大学"
                }
              ]
            },
            {
              "value": "0-2",
              "label": "香坊区",
              "children": [
                {
                  "value": "0-2-1",
                  "label": "东北农业大学"
                },
                {
                  "value": "0-2-2",
                  "label": "东北林业大学"
                }
              ]
            },
            {
              "value": "0-3",
              "label": "松北区",
              "children": [
                {
                  "value": "0-3-1",
                  "label": "哈尔滨师范大学"
                },
                {
                  "value": "0-3-2",
                  "label": "黑龙江科技大学"
                }
              ]
            }
          ]
        },
        {
          "value": "1",
          "label": "齐齐哈尔",
          "children": [
            {
              "value": "1-1",
              "label": "A区",
              "children": [
                {
                  "value": "1-1-1",
                  "label": "齐齐哈尔大学"
                }
              ]
            }
          ]
        },
        {
          "value": "2",
          "label": "佳木斯",
          "children": [
            {
              "value": "2-1",
              "label": "B区",
              "children": [
                {
                  "value": "2-1-1",
                  "label": "佳木斯大学"
                }
              ]
            }
          ]
        }
      ],
      target: ["0-1-1", "1-1-1"],
    };
  }

  onChange = (target) => {
    this.setState({
      target
    });
  }

  render() {
    return (
      <div className="lucio-tree-transfer-example">
        <p className="pkname">lucio-tree-transfer</p>
        <TreeTransfer {...this.state} rowKey="value" rowTitle="label" onChange={this.onChange} />
        <TreeTransfer {...this.state} rowKey="value" rowTitle="label" onChange={this.onChange} showSearch />
        <AsyncTreeTransfer {...this.state} rowKey="value" rowTitle="label" onChange={this.onChange} showSearch />
        <div className="gh-ribbon"><a href="https://github.com/luciojs/tree-transfer" target="_blank">Fork me on GitHub</a></div>
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));