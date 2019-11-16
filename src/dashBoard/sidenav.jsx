import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import NotificationsIcon from '@material-ui/icons/Notifications'
import Button from '@material-ui/core/Button';
import { getLables, addLables, deleteLabel, editLabel } from '/home/admin1/fundooreact/src/services/labelservice.jsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import { archiveNote } from '../services/noteservice';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import archive from './archive';
import {withRouter} from 'react-router-dom'
const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: "75px"
            },
            paperAnchorLeft: {
                width: "230px",
                height: 'auto'
            }
        }
    }
})
 class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allLabels: [],
            doescheckfield:false,
            labelName:'',
            open:false,
            labelId:'',
        }
         this.state1 = {
             token: '',
        }
    }
  
     componentDidMount() {
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
    handleLabel =(e)=>{
        this.setState({
          
            labelName:e.target.value
        })
    }
    handleLabelButton =()=>{
        this.setState({
            doescheckfield:!this.state.doescheckfield
        })
    }
    handleLabels = async (labelName, labelId) => {
       
        await this.setState({
            labelName: labelName,
            labelId: labelId,
            open: true,
        })
    }
    handleCancel =()=>{
        this.setState({
            doescheckfield:!this.state.doescheckfield   
        })
    }
    handleAddLabels =()=>{
        if (this.state.labelName !== '' ) {
            let data={
                "labelName":this.state.labelName,  
            }
            addLables(data).then(res=>{
                this.getAlllLabels();
                console.log('check token'+res);  
               }).catch((err) => {
                 console.log('error ' + err);
              })
        }
        this.setState({
            labelName:''
        })
    }
    handleDeleteLabel =(labelId)=>{
        deleteLabel(labelId).then(res=>{
            this.getAlllLabels();
            console.log('check label'+res); 
           }).catch((err) => {
             console.log('error ' + err);
          })
           this.setState({
            labelName:'',
        })
    }
   
    handleNote=()=>{
        this.props.history.push('/dashboard')
    }
    handleReminder=()=>{
        this.props.history.push('/reminder')
    }
    handleArchive =()=>{
        this.props.history.push('/archive')
    }
    handleTrash=()=>{
        this.props.history.push('/trash')
    }
    handleEditLabel = (labelId)=>{
        let data={
            "labelName":this.state.labelName,  
        }
        editLabel( labelId, data).then(res=>{
            console.log('check data----'+data);
            this.getAlllLabels();
            console.log('check label'+res); 
           }).catch((err) => {
             console.log('error ' + err);
          })
           this.setState({
            labelName:'',
        })

    }
    handleAll = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
      }
      handleForLabel=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
      }
      onChange = (data) => {
        let find = {
            "labelName": data.label
        }
    }
    handleEditLabel = (labelId) => {
        let data = {
            "labelName": this.state.labelName
        }
        editLabel(labelId, data).then(res => {
            this.getAllLAbels();
            console.log('label edited ', res);
        }).catch(err => {
            console.log("label not edited  ", err);
        })
    }
   

    render() {
        let displayallLables = this.state.allLabels.map((object,index) => {
            return (
                <Button>
                    <CreateOutlinedIcon className="labelicon" />
                    <span className="labeltext">{object.labelName}</span>
                </Button>
            )
        })  
        let displayallLables1 = this.state.allLabels.map((object,index) => {
            return (
                <div>
                <Button onClick={()=>this.handleDeleteLabel(object.labelId)} style={{marginLeft:'-20px'}} >
                <DeleteOutlineIcon/>
                    </Button>
                  
                    {this.state.open&& object.labelId===this.state.labelId ?
                        <input type="text" value={this.state.labelName} style={{ border: 'none', outline: 'none', fontSize: '15px', width: '120px' }}
                            onChange={this.handleLabel} onClick={() => this.onChange(object)}/>
                        :
                        <input type="text" value={object.labelName} style={{ border: 'none', outline: 'none', fontSize: '15px', width: '120px' }}
                            onChange={() => this.handleLabels(object.labelName, object.labelId)}/>
                    }
                    <Button style={{ marginLeft: '25px' }} onClick={() => this.handleEditLabel(object.labelId)}>
                        <EditOutlinedIcon/>
                    </Button>
                </div>
            )
        })   
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <Drawer variant='persistent' open={this.props.menuSelect} style={{ top: '64px' }} >
                        <div>    
                        <Button className="labelcontent" onClick={this.handleNote}>
                            <EmojiObjectsOutlinedIcon className="labelicon"/>
                            <span className="labeltext">Notes</span></Button>
                        <Button className="labelcontent" onClick={this.handleReminder}>
                            <NotificationsIcon className="labelicon"/>
                            <span className="labeltext">Reminders</span></Button>
                        <Divider/>
                       <div>{displayallLables}</div>
                        <Button className="labelcontent" onClick={this.handleLabelButton}>
                            <CreateOutlinedIcon className="labelicon"/>
                            <span className="labeltext">Edit Labels</span>
                        </Button>            
                        <Divider/>
                        <Button className="labelcontent" onClick={this.handleArchive}>
                            <ArchiveOutlinedIcon className="labelicon"/>
                            
                            <span class="labeltext">Archive</span>
                        </Button>
                        
                        <Button className="labelcontent" onClick={this.handleTrash}>
                            <DeleteTwoToneIcon className="labelicon"/>
                            <span class="labeltext">Trash</span></Button>
                            </div>
                    </Drawer>  
              <div>
            <Dialog open={this.state.doescheckfield} aria-labelledby="form-dialog-title">
            <DialogContent>   
            <div className="labeledit">
                <div style={{border:'none', outline:'none',display:'flex'}}>
                <TextField
                   id="standard-textarea"
                   label="create new label"
                   margin="normal"
                   name="labelName"
                   type="text"
                   value={this.state.labelName}
                   onChange={this.handleAll}
                 />
                 <div style={{marginTop:'41px'}} onClick={this.handleAddLabels}>
                 <CheckIcon/>
                 </div>
                </div >
           <div className="labeledit">
             {displayallLables1 } 
            </div> 
             </div>
           </DialogContent>
          <DialogActions>
         <div >
          <Button onClick={this.handleCancel}>
            Cancel
          </Button>
          </div>
          </DialogActions>
        </Dialog>
              </div>
              </MuiThemeProvider>
            </div>
        )
    }
}
export default withRouter(SideNav);
