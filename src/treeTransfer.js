import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Input from 'antd/lib/input';
import Tree from 'antd/lib/tree';
import Alert from 'antd/lib/alert';
import uniq from 'lodash.uniq';
import difference from 'lodash.difference';
import { hasUnLoadNode } from './utils';
import { ThingLoading } from 'lucio-loading';
import './style.less';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

class TreeTransfer extends Component {
  constructor(props) {
    super(props);
    const { treeNode, listData, leafKeys } = this.generate(props);
    const treeCheckedKeys = listData.map(({key}) => key);
    this.state = {
      treeNode,
      listData,
      leafKeys,
      treeCheckedKeys,
      treeExpandedKeys: treeCheckedKeys,
      treeAutoExpandParent: true, // 自动展开父节点 初始为true 有展开操作的时候为false
      listCheckedKeys: [],
      treeSearchKey: '',
      listSearchKey: '',
      unLoadAlert: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { treeNode, listData, leafKeys } = this.generate(nextProps, this.state);
    const treeCheckedKeys = listData.map(({key}) => key);
    this.setState({
      treeNode,
      listData,
      leafKeys,
      treeCheckedKeys
    });
  }

  generate = (props, state = {}) => {
    const { source, target, rowKey, rowTitle, rowChildren, showSearch } = props;
    const { treeSearchKey } = state;

    const leafKeys = [];  // 叶子节点集合
    const listData = [];  // 列表数据
    const expandedKeys = []; // 搜索时 展开的节点

    const loop = data => data.map(item => {
      const { [rowChildren]: children, [rowKey]: key, [rowTitle]: title, ...otherProps } = item;
      if (children === undefined) {
        leafKeys.push(key);
        let nodeTitle = title;
        if (showSearch && treeSearchKey && treeSearchKey.length > 0) { // if tree searching
          if (title.indexOf(treeSearchKey) > -1) {
            expandedKeys.push(key);
            const idx = title.indexOf(treeSearchKey);
            nodeTitle = (
              <span>
                {title.substr(0, idx)}
                <span style={{ color: '#f50' }}>{treeSearchKey}</span>
                {title.substr(idx + treeSearchKey.length)}
              </span>
            );
          }
        }
        if (target.indexOf(key) > -1) {
          listData.push({ key, title });
        }
        return <TreeNode key={key} title={nodeTitle} isLeaf {...otherProps} />;
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
      listData,
      expandedKeys
    };
  }

  // tree checkbox checked
  treeOnCheck = (checkedKeys, e) => {
    if (e.checked) {
      if (this.props.onLoadData && hasUnLoadNode([e.node])) {
        this.setState({
          unLoadAlert: true
        });
      } else {
        this.setState({
          treeCheckedKeys: checkedKeys.filter(key => this.state.leafKeys.indexOf(key) > -1),
          unLoadAlert: false
        });
      }
    } else {
      this.setState({
        treeCheckedKeys: checkedKeys.filter(key => this.state.leafKeys.indexOf(key) > -1),
        unLoadAlert: false
      });
    }
  }

  // list checkbox checked
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

  // left tree search 
  onTreeSearch = (e) => {
    this.setState({
      treeSearchKey: e.target.value
    }, () => {
      const { treeNode, listData, leafKeys, expandedKeys } = this.generate(this.props, this.state);
      const treeCheckedKeys = listData.map(({key}) => key);
      this.setState({
        treeNode,
        listData,
        leafKeys,
        treeCheckedKeys,
        treeExpandedKeys: uniq([...treeCheckedKeys, ...expandedKeys]),
        treeAutoExpandParent: true, // 搜索的时候 自动展开父节点设为true
      });
    });
  }

  // right list search 
  onListSearch = (e) => {
    this.setState({
      listSearchKey: e.target.value
    });
  }

  render() {
    const { className, loading, sourceTitle, targetTitle, showSearch, onLoadData } = this.props;
    const { treeNode, listData, leafKeys, treeCheckedKeys, listCheckedKeys, treeExpandedKeys, treeAutoExpandParent, listSearchKey, unLoadAlert } = this.state;
    const listNode = listData.filter(item => showSearch ? item.title.indexOf(listSearchKey) > -1 : true);

    const treeTransferClass = classNames({
      'lucio-tree-transfer': true,
      [className]: !!className
    });

    const treeProps = {
      checkable: true,
      checkedKeys: treeCheckedKeys,
      onCheck: this.treeOnCheck,
      expandedKeys: treeExpandedKeys,
      autoExpandParent: treeAutoExpandParent,
      onExpand: (expandedKeys) => {
        this.setState({
          treeAutoExpandParent: false,
          treeExpandedKeys: expandedKeys,
        });
      },
      loadData: onLoadData
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
        this.setState({
          unLoadAlert: false
        });
        this.props.onChange && this.props.onChange(this.state.treeCheckedKeys);
      }
    };

    const operaLeftButtonProps = {
      type: 'primary',
      icon: 'left',
      size: 'small',
      disabled: listCheckedKeys.length === 0,
      onClick: () => {
        this.setState({
          listCheckedKeys: [],
          unLoadAlert: false
        });
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
          <ThingLoading loading={loading} size="small">
            <div className="tree-transfer-panel-body">
              <div className="tree-transfer-panel-body-content">
                {unLoadAlert ? <Alert message="无法选中，原因：子节点未完全加载" banner /> : null}
                {showSearch ? <div className="tree-transfer-panel-body-content-search"><Search placeholder="请输入搜索关键字" onSearch={this.onTreeSearch} /></div> : null}
                <Tree {...treeProps}>
                  {treeNode}
                </Tree>
              </div>
            </div>
          </ThingLoading>
        </div>
        <div className="tree-transfer-operation">
          <Button {...operaRightButtonProps} />
          <Button {...operaLeftButtonProps} />
        </div>
        <div className="tree-transfer-panel tree-transfer-panel-right">
          <div className="tree-transfer-panel-header">
            <Checkbox {...listHeaderCheckProps} />
            <span className="tree-transfer-panel-header-select">{`${listCheckedKeys.length > 0 ? `${listCheckedKeys.length}/` : ''}${listNode.length}`} 条数据</span>
            <span className="tree-transfer-panel-header-title">{targetTitle}</span>
          </div>
          <div className="tree-transfer-panel-body">
            <ul className="tree-transfer-panel-body-content">
              {showSearch ? <div className="tree-transfer-panel-body-content-search"><Search placeholder="请输入搜索关键字" onSearch={this.onListSearch} /></div> : null}
              {
                listNode.map(item => (
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
  loading: PropTypes.bool,
  sourceTitle: PropTypes.string,
  targetTitle: PropTypes.string,
  onChange: PropTypes.func,
  showSearch: PropTypes.bool,
  onLoadData: PropTypes.func,
};

TreeTransfer.defaultProps = {
  rowKey: 'key',
  rowTitle: 'title',
  rowChildren: 'children',
  source: [],
  target: [],
  loading: false,
  sourceTitle: '源数据',
  targetTitle: '目的数据',
  showSearch: false
};

export default TreeTransfer;