import React from 'react';
import { shallow } from 'enzyme';
import TreeTransfer from '../src';

describe('TreeTransfer', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <TreeTransfer />
    );
    expect(wrapper.find('.lucio-tree-transfer').exists()).toBeTruthy();
  });
});
  