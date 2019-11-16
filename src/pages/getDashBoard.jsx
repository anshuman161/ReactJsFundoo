import React, { Component } from 'react'
import Dashboard from '../dashBoard/dashboard';
import Createnote from '../dashBoard/createnote'
import DisplayNotesCard from '../dashBoard/displaynotes'
export default class getDashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            view: true,
            ITEM_HEIGHT : 48,
            anchorEl:'', 
        }
    }
handleView=()=>{
    this.setState({
        view:!this.state.view
    })
}
    render() {
        console.log('22222',this.props.viewprop);
        return (
            <div>
                <Dashboard viewprop={this.handleView}/>
               <Createnote/>
               <DisplayNotesCard viewprop={this.state.view}/>
            </div>
        )
    }
}
