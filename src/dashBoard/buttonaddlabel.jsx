import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { getLables, addLabelOnNotes } from '../services/labelservice';

export default class buttonAddLabel extends Component {
    constructor(){
        super();
        this.state={
            anchorEl:null,
            setAnchorEl:false,
            allLabels:[],
            labelName:'',
            labelId:'',
            isChecked: true,
        }
    }
    handleClick =(e)=> {
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target
        });
    };
   handleClose = () => {
       this.setState({
        anchorEl:!this.state.anchorEl
       })
  };
componentDidMount(){
  this.getAlllLabels();
}
  getAlllLabels=()=>{
    getLables(localStorage.getItem('token')).then(res => {
        console.log('all lables are' + res.data);
        this.setState({
            allLabels: res.data
        });
console.log("after setting all labels",this.allLabels)
    })
        .catch((err) => {
            console.log('error ' + err);
        })
}

handleInputChange =(labelId)=>{
   console.log('checking labelName----'+labelId)
  this.setState({
    isChecked:!this.state.isChecked,
   })
   console.log('checking labelId----'+labelId)
   console.log('checking noteId---'+this.props.noteId)
   addLabelOnNotes(labelId,this.props.noteId).then(res=>{
    console.log('check '+res); 
   }).catch((err) => {
     console.log('error ' + err)
 })

}


render(){
  let displayallLables = this.state.allLabels.map((object) =>{
    return (
        <Button>
           <input type="checkbox"
          onChange={()=>this.handleInputChange(object.labelId)}
          value={this.state.check}
        />
            <span className="labeltext" >{object.labelName}</span>
        </Button>
    )
})  
  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(e)=>this.handleClick(e)}>
        Add Label
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={this.state.anchorEl}
     style={{zIndex:'9999'}}
        open={Boolean(this.state.anchorEl)}
        onClose={this.handleClose}
      >
        <MenuItem>       
        <div className="labeledit">
         {displayallLables}
                </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
}