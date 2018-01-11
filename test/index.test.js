import React from 'react';
import { render, mount } from 'enzyme';
import TreeTransfer from '../src';

const treeTransferProps = {
  source: [
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
  target: ['0-1']
};

describe('TreeTransfer', () => {
  it('renders correctly', () => {
    const wrapper = render(<TreeTransfer {...treeTransferProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support loading', () => {
    const wrapper = render(<TreeTransfer {...treeTransferProps} treeLoading />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support sourceTitle and targetTitle', () => {
    const wrapper = render(<TreeTransfer {...treeTransferProps} sourceTitle="1" targetTitle="2" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should move all selected tree leafs to right list', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<TreeTransfer {...treeTransferProps} onChange={handleChange} />);
    wrapper.find('.ant-tree').find('.ant-tree-checkbox').at(0).simulate('click');
    wrapper.find('.tree-transfer-operation').find('button').at(0).simulate('click');
    expect(handleChange).toHaveBeenLastCalledWith(['0-0', '0-1']);
  });

  it('should move unselected tree leafs to right list', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<TreeTransfer {...treeTransferProps} onChange={handleChange} />);
    wrapper.find('.ant-tree').find('.ant-tree-checkbox').at(2).simulate('click');
    wrapper.find('.tree-transfer-operation').find('button').at(0).simulate('click');
    expect(handleChange).toHaveBeenLastCalledWith([]);
  });

  it('should check all item when click on check all', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<TreeTransfer {...treeTransferProps} onChange={handleChange} />);
    wrapper.find('.tree-transfer-panel-header').find('.ant-checkbox-input').at(0).simulate('change', { target: { checked: true } });
    wrapper.find('.tree-transfer-operation').find('button').at(1).simulate('click');
    expect(handleChange).toHaveBeenLastCalledWith([]);
  });

  it('should move selected list item to left tree', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<TreeTransfer {...treeTransferProps} onChange={handleChange} />);
    wrapper.find('.tree-transfer-panel-right').find('li').find('.ant-checkbox-input').at(0).simulate('change', { target: { checked: true } });
    wrapper.find('.tree-transfer-operation').find('button').at(1).simulate('click');
    expect(handleChange).toHaveBeenLastCalledWith([]);
  });

  it('should move selected list item to left tree', () => {
    const mockFunction = jest.fn();
    const onLoadData = node => new Promise(resolve => {
      mockFunction(node);
      resolve();
    });

    const props = {
      source: [
        {
          key: '0',
          title: '0',
          children: []
        }
      ],
      target: []
    };    
    const wrapper = mount(<TreeTransfer {...props} onLoadData={onLoadData} />);
    wrapper.find('.ant-tree').find('.ant-tree-switcher').at(0).simulate('click');
    expect(mockFunction).toHaveBeenCalled();
  });

  // it('should search result when use Search in tree panel', () => {
  //   const wrapper = mount(<TreeTransfer {...treeTransferProps} showSearch />);
  //   wrapper.find('.tree-transfer-panel-left').find('.ant-input-search').find('input').at(0).simulate('change', { target: { value: '0-1' } });
  //   wrapper.find('.tree-transfer-panel-left').find('.ant-input-search').find('input').at(0).simulate('keyDown', { keyCode: 13 });
  //   expect(wrapper.find('.tree-transfer-panel-left').find('.ant-tree-title').at(2).html()).toBe('');
  // });
});
  