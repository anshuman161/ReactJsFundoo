import React from 'react';
import {
    shallow
} from 'enzyme';
import Registration from '../components/registration';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });

// let wrapper=mount(<RegisterComponent.WrappedComponent/>)
let wrapper = shallow(<Registration />)

/**
 * describe what we are testing 
 **/
describe('Registration', () => {
    /**
     * make our assertion and what we expect to happen 
     **/
    it('should render without throwing an error', () => {
        expect(wrapper.exists()).toBe(true)
    })
    /**
     * within the RegisterComponent components describe function
     **/
    it('renders a username input', () => {
        expect(wrapper.find('[name="username"]').length).toEqual(1)
    })
    
    it('renders a email input', () => {
        expect(wrapper.find('[name="email"]').length).toEqual(1)
    })
    it('renders a password input', () => {
        expect(wrapper.find('[name="password"]').length).toEqual(1)
    })
    it('renders a phoneno input', () => {
        expect(wrapper.find('[name="phoneno"]').length).toEqual(1)
    })
    /**
     * within the RegisterComponent components describe function
     **/
    describe('username input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            wrapper.find('[name="username"]').simulate('change', {
                target: {
                    name: 'username',
                    value: 'om'
                }
            });
            expect(wrapper.state('username')).toEqual('om');
        })
    })
    
    describe('email input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            wrapper.find('[name="email"]').simulate('change', {
                target: {
                    name: 'email',
                    value: "anshumanjoshi161@gmail.com"
                }
            });
            expect(wrapper.state('email')).toEqual('anshumanjoshi161@gmail.com');
        })
    })
    
})