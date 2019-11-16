import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { IconButton } from '@material-ui/core';
import { archiveNote, deleteNote, archivefalse, isTrashfalse, isTrashTrue, binNote, fetchTrashNote } from '../services/noteservice';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { TextareaAutosize } from '@material-ui/core';
import DownBar from './downbar';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import { deleteLabelOnNotes } from '../services/labelservice';
export default class trash extends Component {
    constructor(props){
        super(props);
        this.state = {
          allNotes:[],
          noteId:'',
          tittle:'',
          description:'',
          anchorEl:'',
          doescheckfield:false,
        }
    }
    
   
    componentDidMount (){
  this.trashNotes();
    };
    trashNotes=()=>{
        fetchTrashNote(localStorage.getItem('token')).then(res=>{
          
            console.log('all notes are' + res.data);
            this.setState({
             doescheckfield:!this.state.doescheckfield,
             allNotes: res.data,
             tittle:'',
             description:'',
             
            })
        }).catch((err) => {
            console.log('error ' + err);
        })
  }
  handleDelete =(object)=>{
      deleteNote(object.noteId).then(res=>{
        window.location.reload();
         console.log('deleted noteid---'+object.noteId)
      }).catch((err) => {
        console.log('error ' + err);
    })
  }
  handleRestore=(object)=>{
     isTrashfalse(object.noteId).then(res=>{
      window.location.reload();
        console.log('archive noteid false---'+object.noteId)
    }).catch((err) => {
      console.log('error ' + err);
  })
  }

  handleLabelDelete = (labelId,noteId) => 
  { 
  deleteLabelOnNotes(labelId,noteId).then(res => {
      window.location.reload();
    this.getAllNotes();
    console.log('delete label -- labelid' + labelId);
    console.log('delete note -- noteid' + noteId);
  }).catch((err) => {
    console.log('error ' + err);
  })
  }
    render() {
        let displayNotes = this.state.allNotes.map((object, index)=>{

            return (       
                <div className="displaynote" >
                  <div className="archivenotes"> 
              
               <Card style={{backgroundColor:object.color}}>
            <div>
              <CardContent >
                <div>
                  <input style={{ border: 'none', outline: 'none', width: '300px',backgroundColor:object.color }} type="text" value={object.tittle} />
                </div>
                <br />
                <div>
                  <TextareaAutosize style={{ width: '300px', margin: '10px', border: 'none', outline: 'none',backgroundColor:object.color }}
                    value={object.description} />
                </div>
                <br />
                <div className="chiplabel">
                  {object.labelList.map((object1) => {
                    return (
                      <div key={object1.labelId}>
                        {object1 === '' ? null :
                          <Chip
                            label={object1.labelName}
                            variant="outlined"
                            onDelete={() => {this.handleLabelDelete(object1.labelId,object.noteId)}}
                          />
                        }
                      </div>
                    )  
                  }
                  )}
                </div>
                <div key={object.noteId}>
                      {object.remindme === null ? null :
                         <Chip size="small" label={object.remindme} onDelete={this.handleDelete}> </Chip>
                      }  
                      </div>
                <div className="restorecss">
                   <IconButton>
                      <Button onClick={()=>this.handleRestore(object)}>
                       < RestoreFromTrashIcon /> 
                     </Button> 
                     <Button onClick={()=>this.handleDelete(object)} >
                     <DeleteIcon/>
                     </Button>    
                   </IconButton>    
                </div>
              </CardContent>
            </div>
           
          </Card>
              </div>      
                 </div>   
              )
        })
        return (
            <div>
             <div className="note-div">
               {displayNotes}
             </div> 
          </div>
          );
       
    }
}
