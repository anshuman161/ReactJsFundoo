import React, { Component } from 'react'
import { IconButton } from '@material-ui/core';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { archiveTrue, isTrashTrue } from '../services/noteservice';
import ButtonAddLabel from './buttonaddlabel';
import ColorChange from './colorChange';
import Reminder from './reminder';
import Collabarator from './collaborator';
export default class DownBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ITEM_HEIGHT : 48,
            anchorEl:'',
            noteId:props.noteId,
            allNotes:'',
            
        }
    }
    handleClick = event => {
        this.setState({
            anchorEl:event.target
        })
    };
    handleClose = () => {
        this.setState({
            anchorEl:''
        })
    };
   
    handleAddLabel = () =>{
        this.setState({
            anchorEl:null
        })
    }
    handleArchive = ()=>{
        archiveTrue(this.state.noteId).then(res=>{
            window.location.reload();
            console.log('inside note archived'+this.state.noteId);
                  }).catch((err) => {
                    console.log('error ' + err);
                  })
    }
    handleDelete = () =>{
        isTrashTrue(this.state.noteId).then(res=>{
            console.log('trash true note '+this.state.noteId);
        }).catch((err) => {
          console.log('error ' + err);
        })
    }
    render() {
        return (
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
                    <IconButton style={{padding:'4px', fontSize:'2px',marginRight:'15px'}}>
              <ColorChange noteId={this.props.noteId}/>
                    </IconButton>
                 </div>  
                 <div>
                    {/* <IconButton style={{padding:'4px',marginRight:'15px'}}>
<ImageOutlinedIcon/>
                        </IconButton> */}
                 </div>  
                 <div>
                    <IconButton style={{padding:'4px',marginRight:'15px'}} onClick={this.handleArchive}>
                  <ArchiveOutlinedIcon/>
                        </IconButton>
                 </div>  
                <div>
                <IconButton style={{padding:'4px'}}
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVertOutlinedIcon/>
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
                         <Button onClick={this.handleDelete}>
                              Delete Note
                         </Button>
                    </div>
                    <div>
                        <ButtonAddLabel noteId={this.props.noteId}/>
                    </div>         
                </Menu>
            </div >
             <div>
                 <menu
                 ></menu>
             </div>
         </div>   
          
        ) 
}
}