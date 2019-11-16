import React, { Component } from 'react'
import Dashboard from '../dashBoard/dashboard'
import Trash from '../dashBoard/trash'
export default class getTrash extends Component {
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
                 <Trash/>
            </div>
        )
    }
}

