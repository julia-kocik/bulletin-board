import React from 'react';
import { shallow } from 'enzyme';
import { HeaderComponent } from './Header';


const mockProps = {
  className: 'className',
  state: {
    posts: {
      logged: 'test',
    },
  },
  logIn: () =>{
    console.log('test');
  },
  logOut: () =>{
    console.log('test');
  },
  fetchPublishedPosts: () => {
    console.log('Function');
  },
};

describe('Component Header', () => {
  it('should render without crashing', () => {
    const component = shallow(<HeaderComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});
