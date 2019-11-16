import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import InputAdornment from '@material-ui/core/InputAdornment';
import BrushIcon from '@material-ui/icons/Brush';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { TextareaAutosize } from '@material-ui/core';
import DownBar from '../dashBoard/downbar';
import { saveNotes } from '../services/noteservice';
export default class CreateNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
          doescheckfield:false,
          tittle:'',
         description:'',

        }
    }
handleSubmit =()=>{
   this.setState({
    doescheckfield:!this.state.doescheckfield
   })
   console.log('messege--'+ this.state.doescheckfield);
   if (this.state.tittle !== '' | this.state.description !== '' ) 
   {
   let data={
    "tittle":this.state.tittle,
    "description":this.state.description,  
        }
        saveNotes(data).then(res=>{
          window.location.reload(); 
  console.log('check token'+res);
        }).catch((err) => {
          console.log('error ' + err);
        })
   }
}
handlenotes =()=>{
  this.setState({
   doescheckfield:!this.state.doescheckfield
  })
}
handleAll = (event) => {
  this.setState({
      [event.target.name]: event.target.value
  })
}
    render() {
        if(!this.state.doescheckfield)
        {
        return (
            <div className="createnote" >
             <div ><TextField
              style={{width:'600px'}}
              id="outlined-basic"
              margin="normal"
              variant="outlined"
              placeholder="Take a note..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                   <div ><Button ><CheckBoxIcon/></Button></div> 
                   <div ><Button ><BrushIcon/></Button></div>
                   <div ><Button ><InsertPhotoIcon/></Button></div>  
                  </InputAdornment>
                 )
                }}
               onClick={this.handlenotes}
              />
              </div> 
            </div>
        )
    }
    else{
        return(
            <div className="displaynote" >
            <div>
        <Card style={{width:'600px',marginLeft:'25%',height:'130px'}}>
          <CardContent >
         <div>
         <input style={{border:'none',outline:'none',width:'500px',height:'28px'}}  value={this.state.tittle} onChange={this.handleAll} name="tittle" type="text"  placeholder='Title'/>
         </div>
         <div>
             <TextareaAutosize style={{width:'600px',border:'none',outline:'none',height:'48px'}} value={this.state.description} name="description" onChange={this.handleAll} type="text" placeholder='Description'/>
         </div>
         <div style={{display:'flex'}}>
         <div>
         <DownBar/>
          </div>
          <div>          
           <Button style={{marginLeft:'300%'}} onClick={this.handleSubmit}>Close</Button> 
         </div>
         </div>
          </CardContent>
        </Card>
        </div>
           </div>
        )
    }
}
}
