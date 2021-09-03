import React from 'react';
import { shallow } from 'enzyme';
import { PostComponent } from './Post';


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
  posts: [],
  fetchPublishedPosts: () => {
    console.log('Function');
  },
  linkId: 'test',
};

describe('Component Post', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostComponent {...mockProps}/>);
    expect(component).toBeTruthy();
  });
});
