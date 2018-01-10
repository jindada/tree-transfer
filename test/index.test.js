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

  it('should move all selected tree leafs to right list', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<TreeTransfer {...treeTransferProps} onChange={handleChange} />);
    wrapper.find(TreeTransfer).find('.ant-tree').find('.ant-tree-checkbox').at(0).simulate('click');
    wrapper.find(TreeTransfer).find('.tree-transfer-operation').find('button').at(0).simulate('click');
    expect(handleChange).toHaveBeenLastCalledWith(['0-0', '0-1']);
  });

  it('should move unselected tree leafs to right list', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<TreeTransfer {...treeTransferProps} onChange={handleChange} />);
    wrapper.find(TreeTransfer).find('.ant-tree').find('.ant-tree-checkbox').at(2).simulate('click');
    wrapper.find(TreeTransfer).find('.tree-transfer-operation').find('button').at(0).simulate('click');
    expect(handleChange).toHaveBeenLastCalledWith([]);
  });
});
  