import React, { Component } from 'react';
import Dashboard from '../dashBoard/dashboard';
import Archive from '../dashBoard/archive'

export default class getArchive extends Component {
    render() {
        return (
            <div>
               <Dashboard/> 
               <Archive/>
            </div>
        )
    }
}
