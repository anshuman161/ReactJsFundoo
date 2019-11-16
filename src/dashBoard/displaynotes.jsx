import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { TextareaAutosize } from '@material-ui/core';
import { getNotes, updateNote, deleteReminderNotes, addReminder } from '../services/noteservice';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DownBar from './downbar';
import Chip from '@material-ui/core/Chip';
import { deleteLabel, deleteLabelOnNotes } from '../services/labelservice';
export default class DisplayNote extends Component {
  componentDidMount() {
    this.state1.token = this.props.match.params
    console.log('token', this.state1.token);
  }
  constructor(props) {
    super(props);
    this.state = {
      allNotes: [],
      noteId: '',
      tittle: '',
      description: '',
      doescheckfield: false,
      labelName: '',
      labelcross:false,
      updateNoteId:'',
    }
  }
  // eslint-disable-next-line no-dupe-class-members
  componentDidMount() {
    this.getAllNotes();
  }
  getAllNotes=()=>{
    getNotes(localStorage.getItem('token')).then(res => {
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
  handleTitle = (event) => {
    this.setState({
      tittle: event.target.value
    })
  }
  handleDescription = (event) => {
    this.setState({
      description: event.target.value
    })
  }
  openDialog = (object) => {
    console.log('noteid onclick-------',object.noteId)
    this.setState({
      updateNoteId: object.noteId,
      doescheckfield: !this.state.doescheckfield,
      tittle: object.tittle,
      description: object.description
    })
  };
  closeDialog = (noteId) => {
    console.log('check update noteid---------',noteId)
    this.setState({
      doescheckfield: !this.state.doescheckfield,
    })
    let note = {
      "tittle": this.state.tittle,
      "description": this.state.description,
    }
    updateNote(this.state.updateNoteId, note).then(res => {
      //this.getAllNotes();
      console.log('check noteid---------', noteId);
    }).catch((err) => {
      console.log('error ' + err);
    })
  }
  handleAll = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleLabelDelete = (labelId,noteId) => 
  { 
  deleteLabelOnNotes(labelId,noteId).then(res => {
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
  handleUpdateReminder=()=>{

   
  }
  render() {
    console.log("view porps---", this.props.viewprop);
    const cardView = this.props.viewprop ? "display-card" : "list-view"
    let displayAllNotes = this.state.allNotes.map((object, index) => {
    console.log(object)
      return (

        <div >
          <Card className={cardView} style={{backgroundColor:object.color}} >
            <div onClick={() => this.openDialog(object)}>
              <CardContent >
                <div>
                  <input style={{ border: 'none', outline: 'none', width: '350px',backgroundColor:object.color }} type="text" value={object.tittle} />
                </div>
                <br />
                <div>
                  <input style={{ width: '350px', marginTop: '10px', border: 'none', outline: 'none',backgroundColor:object.color }}
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
                         onDelete={()=>this.handleReminderDelete(object.noteId)}
                         /> 
                }
                      </div>
              </CardContent>
            </div>
            <DownBar noteId={object.noteId}/>
          </Card>
          <Dialog open={this.state.doescheckfield} aria-labelledby="form-dialog-title">
            <DialogContent>
              <div>
                <input style={{ border: 'none', outline: 'none', width: '450px' }} type="text" name="tittle"
                  value={this.state.tittle}
                  onChange={this.handleAll} />
              </div>
              <br />
              <div>
                <input style={{ width: '450px', marginTop: '10px', border: 'none', outline: 'none' }}
                  name="description"
                  value={this.state.description}
                  onChange={this.handleAll}
                />
              </div>
              <br/>
            </DialogContent>
            <DialogActions>
              <div className="display-downbar">
                <DownBar noteId={object.noteId}/>
                <Button color="primary" onClick={() => this.closeDialog(object.noteId)}>
                  Cancel
          </Button>
              </div>
            </DialogActions>
          </Dialog>
        </div>
      )
    })
    return (
      <div>
        <div className="note-div">
          {displayAllNotes}
        </div>
      </div>
    );
  }
}


