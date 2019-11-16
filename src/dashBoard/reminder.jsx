import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tooltip, Button,createMuiTheme } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';

import Paper from '@material-ui/core/Paper';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import { ThemeProvider } from "@material-ui/styles";


import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { addReminder, getReminderNotes } from '../services/noteservice';
const theme = createMuiTheme({
    overrides: {
        MuiPickersModal: {
            dialogRootWider: {
                minWidth: "360px",
                minHeight:"10px"
            }
        },MuiPickersToolbar:{
            toolbar :{
            backgroundColor:"yellowgreen"
            }
        },MuiPickersDay:{
            isSelected: {
            backgroundColor:"yellowgreen"
            }
        },MuiPickerDTTabs:{
            tabs:{
            backgroundColor:"yellowgreen"
            }
        },MuiPickersClockPointer:{
            pointer:{
            backgroundColor:"yellowgreen"
            },thumb:{
                border:"14px solid yellowgreen"
               } 
        },MuiPickersClock:{
            pin:{
            backgroundColor:"yellowgreen"
            }
        }
    }
})

export default class Reminder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteId:props.noteId,
            openPop: false,
            anchorEl: false,
            selectedDate: new Date(),
            
            // '2014-08-18T21:11:54'
        }
    }
    handleChangeDate = date => {
        this.setState({
            selectedDate: date
        })
    }
 componentDidMount = ()=>{
     this.getAllReminders();
 }
 getAllReminders=()=>{
    getReminderNotes(localStorage.getItem('token')).then(res=>{
             console.log('reminders fetching notes----')
    }).catch((err) => {
        console.log('err in  reminder notes---', err);
    })
 }


    handleOpen = () => {
        this.setState({
            openPop: !this.state.openPop
        })
    }
    handleOpenPopper(e) {
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target
        })
        console.log('inside reminder --------')
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
    render() {
        return (
            <div>
                <ThemeProvider theme={theme} >
                    <Tooltip title="Remind me">
                        <AddAlertOutlinedIcon onClick={(e) => this.handleOpenPopper(e)} />
                    </Tooltip>
                    <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} >
                        <Paper className="reminder-paper">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker value={this.state.selectedDate} onChange={this.handleChangeDate} />
                            </MuiPickersUtilsProvider>
                            <div>
                                <Button onClick={this.handleReminderButton}>Set Reminder</Button>
                            </div>
                        </Paper>
                    </Popper>
                </ThemeProvider>
            </div>
        )
                    }
                }
            