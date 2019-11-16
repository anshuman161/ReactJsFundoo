import React, { Component } from 'react'
import Dashboard from '../dashBoard/dashboard'
import Createnote from '../dashBoard/createnote'
import DisplayNotesCard from '../dashBoard/displaynotes'
import AddLabel from '../dashBoard/buttonaddlabel'
export default class getAddLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            view: true,
            ITEM_HEIGHT : 48,
            anchorEl:'',
        }
    }
    render() {
        return (
            <div>
               <Dashboard/>  
               <Createnote/>
               <DisplayNotesCard viewProps={this.state.view}/>
               <AddLabel/>
            </div>
        )
    }
}
