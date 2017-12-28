import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Input from 'antd/lib/input';
import Tree from 'antd/lib/tree';
import uniq from 'lodash.uniq';
import difference from 'lodash.difference';
import './style.less';
const TreeNode = Tree.TreeNode;

class TreeTransfer extends Component {
  constructor(props) {
    super(props);
    const { treeNode, listData, leafKeys } = this.init(props);
    this.state = {
      treeNode,
      listData,
      leafKeys,
      treeCheckedKeys: listData.map(({key}) => key),
      listCheckedKeys: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const { treeNode, listData, leafKeys } = this.init(nextProps);
    this.setState({
      treeNode,
      listData,
      leafKeys,
      treeCheckedKeys: listData.map(({key}) => key),
      listCheckedKeys: []
    });
  }

  init = (props) => {
    const { source, target, rowKey, rowTitle, rowChildren } = props;

    const leafKeys = [];  // 叶子节点集合
    const listData = [];  // 列表数据

    const loop = data => data.map(item => {
      const { [rowChildren]: children, [rowKey]: key, [rowTitle]: title, ...otherProps } = item;
      if (children === undefined) {
        leafKeys.push(key);
        if (target.indexOf(key) > -1) {
          listData.push({ key, title });
        }
        return <TreeNode key={key} title={title} isLeaf {...otherProps} />;
      } else {
        return (
          <TreeNode key={key} title={title} {...otherProps}>
            {loop(item.children)}
          </TreeNode>
        );
      }
    });

    return {
      treeNode: loop(source),
      leafKeys,
      listData
    };
  }

  // 点击树的checkbox
  treeOnCheck = (checkedKeys) => {
    this.setState({
      treeCheckedKeys: checkedKeys.filter(key => this.state.leafKeys.indexOf(key) > -1)
    });
  }

  // 点击列表的checkbox
  listOnCheck = (e, checkedKeys) => {
    if (e.target.checked) {
      this.setState({
        listCheckedKeys: uniq([...this.state.listCheckedKeys, ...checkedKeys])
      });
    } else {
      this.setState({
        listCheckedKeys: this.state.listCheckedKeys.filter(key => checkedKeys.indexOf(key) < 0)
      });
    }
  }

  // 点击toLeft button
  onLeftClick = () => {
    
  }

  render() {
    const { className, sourceTitle, targetTitle } = this.props;
    const { treeNode, listData, leafKeys, treeCheckedKeys, listCheckedKeys } = this.state;
    
    const treeTransferClass = classNames({
      'lucio-tree-transfer': true,
      [className]: !!className
    });

    const treeProps = {
      checkable: true,
      checkedKeys: treeCheckedKeys,
      onCheck: this.treeOnCheck
    };

    const listHeaderCheckProps = {
      checked: listCheckedKeys.length > 0 && listCheckedKeys.length === listData.length,
      indeterminate: listCheckedKeys.length > 0 && listCheckedKeys.length < listData.length,
      onChange: (e) => this.listOnCheck(e, listData.map(({key}) => key))
    };

    const operaRightButtonProps = {
      type: 'primary',
      icon: 'right',
      size: 'small',
      disabled: difference(treeCheckedKeys, listData.map(({key}) => key)).length === 0 && difference(listData.map(({key}) => key), treeCheckedKeys).length === 0,
      onClick: () => {
        this.props.onChange && this.props.onChange(this.state.treeCheckedKeys);
      }
    };

    const operaLeftButtonProps = {
      type: 'primary',
      icon: 'left',
      size: 'small',
      disabled: listCheckedKeys.length === 0,
      onClick: () => {
        this.props.onChange && this.props.onChange(this.state.listData.map(({key}) => key).filter(key => this.state.listCheckedKeys.indexOf(key) < 0));
      }
    };

    return (
      <div className={treeTransferClass}>
        <div className="tree-transfer-panel tree-transfer-panel-left">
          <div className="tree-transfer-panel-header">
            <span className="tree-transfer-panel-header-select">{`${treeCheckedKeys.length > 0 ? `${treeCheckedKeys.length}/` : ''}${leafKeys.length}`} 条数据</span>
            <span className="tree-transfer-panel-header-title">{sourceTitle}</span>
          </div>
          <div className="tree-transfer-panel-body">
            <div className="tree-transfer-panel-body-content">
              <Tree {...treeProps}>
                {treeNode}
              </Tree>
            </div>
          </div>
        </div>
        <div className="tree-transfer-operation">
          <Button {...operaRightButtonProps} />
          <Button {...operaLeftButtonProps} />
        </div>
        <div className="tree-transfer-panel tree-transfer-panel-right">
          <div className="tree-transfer-panel-header">
            <Checkbox {...listHeaderCheckProps} />
            <span className="tree-transfer-panel-header-select">{`${listCheckedKeys.length > 0 ? `${listCheckedKeys.length}/` : ''}${listData.length}`} 条数据</span>
            <span className="tree-transfer-panel-header-title">{targetTitle}</span>
          </div>
          <div className="tree-transfer-panel-body">
            <ul className="tree-transfer-panel-body-content">
              {
                listData.map(item => (
                  <li key={item.key}>
                    <Checkbox checked={listCheckedKeys.indexOf(item.key) > -1} onChange={(e) => this.listOnCheck(e, [item.key])} />
                    <span>{item.title}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

TreeTransfer.propTypes = {
  className: PropTypes.string,
  rowKey: PropTypes.string,
  rowTitle: PropTypes.string,
  rowChildren: PropTypes.string,
  source: PropTypes.array,
  target: PropTypes.array,
  sourceTitle: PropTypes.string,
  targetTitle: PropTypes.string,
  onChange: PropTypes.func
};

TreeTransfer.defaultProps = {
  rowKey: 'key',
  rowTitle: 'title',
  rowChildren: 'children',
  source: [],
  target: [],
  sourceTitle: '源数据',
  targetTitle: '目的数据'
};

export default TreeTransfer;