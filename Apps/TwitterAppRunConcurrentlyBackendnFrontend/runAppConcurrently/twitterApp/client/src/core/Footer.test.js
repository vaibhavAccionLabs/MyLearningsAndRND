import React from 'react';
import Footer from './Footer';

import {shallow} from 'enzyme';

describe('Footer component', () => {
  const wrapper = shallow(<Footer />);
  test('Component renders successfully', () => {
    expect(wrapper.exists()).toBe(true);
  });
  test('Footer component conatins-Copyright', () => {
    const footerMessage = <span>&copy; Copyright 2019</span>;
    expect(wrapper.contains(footerMessage)).toEqual(true);
  });
});
