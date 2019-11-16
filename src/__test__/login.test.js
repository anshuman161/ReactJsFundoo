import React from 'react';
import {
    shallow
} from 'enzyme';
import Login from '../components/login';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

let wrapper = shallow(<Login />)

describe('login', () => {
  
    it('should render without throwing an error', () => {
        expect(wrapper.exists()).toBe(true)
    })
    
    it('renders a email input', () => {
        expect(wrapper.find('[name="email"]').length).toEqual(1)
    })
    it('renders a password input', () => {
        expect(wrapper.find('[name="password"]').length).toEqual(1)
    })
 
    describe('email input', () => {
        it('should respond to change event and change the state of the Login Component', () => {
            wrapper.find('[name="email"]').simulate('change', {
                target: {
                    name: 'email',
                    value: "anshumanjoshi161@gmail.com"
                }
            });
            expect(wrapper.state('email')).toEqual('anshumanjoshi161@gmail.com');
        })
    })
    describe('password input', () => {
        it('should respond to change event and change the state of the Login Component', () => {
            wrapper.find('[name="password"]').simulate('change', {
                target: {
                    name: 'password',
                    value: "1234"
                }
            });
            expect(wrapper.state('password')).toEqual('1234');
        })
    })
    
})