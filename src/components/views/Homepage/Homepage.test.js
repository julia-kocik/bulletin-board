import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

const mockProps = {
  className: 'className',
  loadedData: {
    posts: {
      singlePost: {},
      loading: {
        active: false,
        error: false,
      },
      logged: false,
    },
  },
  fetchPublishedPosts: () => {
    console.log('Function');
  },
};

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<HomepageComponent {...mockProps}/>);
    expect(component).toBeTruthy();
  });
});
