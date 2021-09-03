import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

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
  editPost: () => {
    console.log('Function');
  },
  onePost: [],
};

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostEditComponent {...mockProps}/>);
    expect(component).toBeTruthy();
  });
});
