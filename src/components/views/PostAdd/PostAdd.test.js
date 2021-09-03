import React from 'react';
import { shallow } from 'enzyme';
import { PostAddComponent } from './PostAdd';


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

describe('Component PostAdd', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostAddComponent {...mockProps}/>);
    expect(component).toBeTruthy();
  });
});
