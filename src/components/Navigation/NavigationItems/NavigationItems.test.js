import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItems from './NavigationItems';

configure({
  adapter: new Adapter()
});

describe('NavigationItems', () => {
  it('should render two <NavigationItem /> elements if not authenticated', () => {
    const wrapper = shallow(<NavigationItems></NavigationItems>);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
});