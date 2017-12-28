import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.less';
import TreeTransfer from '../src';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: [
        {
          "key": "0",
          "title": "哈尔滨",
          "children": [
            {
              "key": "0-1",
              "title": "南岗区",
              "children": [
                {
                  "key": "0-1-1",
                  "title": "黑龙江大学"
                },
                {
                  "key": "0-1-2",
                  "title": "哈尔滨理工大学"
                },
                {
                  "key": "0-1-3",
                  "title": "哈尔滨工业大学"
                }
              ]
            },
            {
              "key": "0-2",
              "title": "香坊区",
              "children": [
                {
                  "key": "0-2-1",
                  "title": "东北农业大学"
                },
                {
                  "key": "0-2-2",
                  "title": "东北林业大学"
                }
              ]
            },
            {
              "key": "0-3",
              "title": "松北区",
              "children": [
                {
                  "key": "0-3-1",
                  "title": "哈尔滨师范大学"
                },
                {
                  "key": "0-3-2",
                  "title": "黑龙江科技大学"
                }
              ]
            }
          ]
        },
        {
          "key": "1",
          "title": "齐齐哈尔",
          "children": [
            {
              "key": "1-1",
              "title": "A区",
              "children": [
                {
                  "key": "1-1-1",
                  "title": "齐齐哈尔大学"
                }
              ]
            }
          ]
        },
        {
          "key": "2",
          "title": "佳木斯",
          "children": [
            {
              "key": "2-1",
              "title": "B区",
              "children": [
                {
                  "key": "2-1-1",
                  "title": "佳木斯大学"
                }
              ]
            }
          ]
        }
      ],
      target: ["0-1-1", "1-1-1"],
    };
  }

  render() {
    return (
      <div className="lucio-tree-transfer-example">
        <TreeTransfer {...this.state} />
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));