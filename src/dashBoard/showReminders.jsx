import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { IconButton } from '@material-ui/core';
import { archiveNote, deleteNote, archivefalse, isTrashTrue, addReminder, getReminderNotes, deleteReminderNotes } from '../services/noteservice';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { TextareaAutosize } from '@material-ui/core';
import DownBar from './downbar';
import buttonAddLabel from './buttonaddlabel';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import ColorChange from './colorChange';
import Chip from '@material-ui/core/Chip';
import { deleteLabelOnNotes } from '../services/labelservice';
import Reminder from './reminder';
import ButtonAddLabel from './buttonaddlabel';
export default class ShowReminders extends Component {
    constructor(props){
        super(props);
        this.state = {
          allNotes:[],
          noteId:props.noteId,
          tittle:'',
          description:'',
          anchorEl:'',
          doescheckfield:false,
        }
    }
    handleClick = event => {
        this.setState({
            anchorEl:event.target
        })
    };
    handleClose = () => {
        this.setState({
            anchorEl:null
        })
    };
    componentDidMount (){
        this.reminderNotes();
          }
          reminderNotes=()=>{
            getReminderNotes(localStorage.getItem('token')).then(res => {
              
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

        handleTrash =(object)=>{
            isTrashTrue(object.noteId).then(res=>{
               console.log('trash true noteid ---'+object.noteId)
           }).catch((err) => {
             console.log('error ' + err);
         })
         }

        handleReminderButton = async() => { 
            let data = {
                "remindme":this.state.selectedDate
            }
            console.log("data in reminderCompo is ",data);  
            console.log('noteList : ',this.state.noteId);
            

          addReminder(this.state.noteId,data).then((res) => {
      
               console.log('inside addreminder----------')
            }).catch((err) => {
                console.log('err in  remindercomp', err);
            })
            this.setState({
                anchorEl: this.state.anchorEl
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
         
         handleReminderDelete =(noteId)=>{
          deleteReminderNotes(noteId,(localStorage.getItem('token'))).then(res=>{
            console.log('delete reminder from notes----------')
          }).catch((err) => {
            console.log('error ' + err);
          })
        }
    render() {
        let displayNotes = this.state.allNotes.map((object, index)=>{
            console.log(object);
            
            return (       
                <div className="displaynotes" >
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
                <br/>
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
                <br/>
                <div className="chiplabel">
                  
                   
                      <div key={object.noteId}>
                      {object.remindme === null ? null :
                         <Chip size="small" label={object.remindme}
                         onDelete={()=>this.handleReminderDelete(object.noteId)}
                         /> 
                      }  
                      </div>
                 
                </div>
                <br/>
                <div>
                <DownBar noteId={object.noteId}/>
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
