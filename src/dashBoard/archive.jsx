import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { IconButton } from '@material-ui/core';
import { archiveNote, archivefalse, isTrashTrue, deleteReminderNotes } from '../services/noteservice';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { TextareaAutosize } from '@material-ui/core';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import ColorChange from './colorChange';
import Chip from '@material-ui/core/Chip';
import Reminder from './reminder';
import ButtonAddLabel from './buttonaddlabel';
import { deleteLabelOnNotes } from '../services/labelservice';
import Collabarator from './collaborator';
export default class archive extends Component {
    constructor(props){
        super(props);
        this.state = {
          allNotes:[],
          //noteId:'',
          noteId:props.noteId,
          tittle:'',
          description:'',
          anchorEl:'',
          doescheckfield:false,
          deleteNoteId:'',
          coloNoteId:''
        }
    }

    handleClick = (event) => {
        this.setState({
            anchorEl:event.target
        })
    };
    handleClose = () => {
        this.setState({
            anchorEl:null
        })
    };

    componentDidMount=()=>{
        this.handleArchiveNotes();
    }
    handleArchiveNotes=()=>{
        archiveNote(localStorage.getItem('token')).then(res => {
            console.log('all notes are' + res.data);
            this.setState({
              doescheckfield: false,
              allNotes: res.data,
              tittle: '',
              description: '',
            });
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
  handleArchive=(object)=>{
     archivefalse(object.noteId).then(res=>{
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


  handleMenuClick = ( noteid) => {
    this.setState({
        
        deleteNoteId: noteid
    });
    console.log(this.state.anchorEl + " menu open");
    console.log(this.state.deleteNoteId + "");
}
handleColorClick=(noteId)=>{
  this.setState({
    coloNoteId:noteId
  })
  console.log(this.state.coloNoteId+'color note id---------------------')
  console.log(noteId +'color 222 note id---------------------')
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
                  <TextareaAutosize style={{ width: '300px', margin: '10px', border: 'none', outline: 'none' ,backgroundColor:object.color}}
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
                <br/>
                <div key={object.noteId}>
                      {object.remindme === null ? null :
                         <Chip size="small" label={object.remindme} 
                         onDelete={()=>this.handleReminderDelete(object.noteId)}/> 
                      }  
                      </div> 
                      <br/>
                <div className='iconDisplay'>
               
                 <div>
                    <IconButton style={{padding:'4px',marginRight:'15px'}}>
                     <Reminder noteId={this.props.noteId}/>
                    </IconButton>
                 </div>  
                 
                 <div>
                    <IconButton style={{padding:'4px',marginRight:'15px'}}>
                          <Collabarator noteId={this.state.noteId}/>
                        </IconButton>
                 </div>    
                 <div>
                    <IconButton style={{padding:'4px', fontSize:'2px',marginRight:'15px'}} >
              <ColorChange noteId={object.noteId}/>
                    </IconButton>
                 </div>  
                 <div>
                    {/* <IconButton style={{padding:'4px',marginRight:'15px'}}>
<ImageOutlinedIcon/>
                        </IconButton> */}
                 </div>  
                 <div>
                 <IconButton style={{padding:'4px',marginRight:'15px'}} onClick={()=>this.handleArchive(object)}>
                  <UnarchiveIcon/>
                        </IconButton>
                 </div>  
                <div>
                <IconButton style={{padding:'4px'}}
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVertOutlinedIcon onClick={() => this.handleMenuClick( object.noteId)}/>
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={this.state.anchorEl}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: this.state.ITEM_HEIGHT * 5,
                            width: 150,
                        },
                    }}
                >    
                    <div>
                         <Button onClick={()=>this.handleTrash(object)}>
                              Delete Note
                         </Button>
                    </div>
                    <div>
                    <ButtonAddLabel noteId={this.state.deleteNoteId}/>
                    </div>         
                </Menu>
            </div >
             <div>
                 <menu
                 ></menu>
             </div>




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
