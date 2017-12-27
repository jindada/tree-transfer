import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Input from 'antd/lib/input';
import Tree from 'antd/lib/tree';
import './style.less';

class TreeTransfer extends Component {
  render() {
    const { className } = this.props;

    const treeTransferClass = classNames({
      'lucio-tree-transfer': true,
      [className]: !!className
    });

    return (
      <div className={treeTransferClass}>
        <div className="tree-transfer-panel tree-transfer-panel-left">
          <div className="tree-transfer-panel-header">
            <Checkbox />
            <span className="tree-transfer-panel-header-select">1/2 条数据</span>
            <span className="tree-transfer-panel-header-title">源数据</span>
          </div>
          <div className="tree-transfer-panel-body">
          </div>
        </div>
        <div className="tree-transfer-operation">
          <Button type="primary" icon="right" size="small" />
          <Button type="primary" icon="left" size="small" />
        </div>
        <div className="tree-transfer-panel tree-transfer-panel-right">
          <div className="tree-transfer-panel-header">
            <Checkbox />
            <span className="tree-transfer-panel-header-select">0 条数据</span>
            <span className="tree-transfer-panel-header-title">源数据</span>
          </div>
          <div className="tree-transfer-panel-body">
          </div>
        </div>
      </div>
    );
  }
}

TreeTransfer.propTypes = {
  className: PropTypes.string,
  dataSource: PropTypes.array,
};

TreeTransfer.defaultProps = {
  dataSource: [],
};

export default TreeTransfer;