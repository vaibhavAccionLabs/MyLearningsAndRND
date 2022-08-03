import React from 'react';
import {Spin, Icon} from 'antd';
import Loading from './Loading';

import {shallow} from 'enzyme';
const antIcon = <Icon type="loading" style={{fontSize: 24}} spin />;

describe('Footer component', () => {
  const wrapper = shallow(<Loading />);
  test('Component exists', () => {
    expect(wrapper.exists()).toBe(true);
  });
  test('Loading component contains spinner and loading text', () => {
    const loadingData = (
      <div className="loading">
        <Spin indicator={antIcon} />
        Loading....
      </div>
    );
    expect(wrapper.contains(loadingData)).toEqual(true);
  });
});
