import React, { Component } from 'react'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import {
    Dialog,  DialogTitle,  Button, InputBase, Divider,
   MuiThemeProvider, createMuiTheme, Tooltip
} from '@material-ui/core';
import { addCollabarator, getCollabarator } from '../services/collaboratar';

const theme = createMuiTheme({
    overrides: {
        MuiDialogContent: {
            root: {
                padding: "0px 0px"
            }
        }
    }
})

export default class Collabarator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: false,
            noteId: props.noteId,
            colour: '',
            allCollaborators: [],
            email: ' '
        }
    }
    async componentDidMount() {
        this.getCollabaratedOfuser();
    }

    getCollabaratedOfuser = () => {

        getCollabarator(this.props.noteId)
            .then((res) => {
                this.setState({
                    allCollaborators: res.data
                });

            })
            .catch((err) => {
                console.log('err in get all notes update is ', err);
            })
    }

    handleClick(e) {
        console.log(this.state.noteId);

        this.setState({
            anchorEl: this.state.anchorEl ? !this.state.anchorEl : e.target
        });
    };
    handleDialogClose = () => {
        this.setState({
            anchorEl: false 
        });
    }
    onChangeEmail = (e) => {

        var email = e.target.value;
        this.setState({
            email: email
        })
    }

    handleUpdateLabel = () => {

        var data = {
            email: this.state.email,
            noteId: this.props.noteId

        }
        console.log("data at---------- " + data.email);
        addCollabarator(data)
            .then((res) => {
                this.getCollabaratedOfuser();
                // console.log('response in get notes (update)', res)
            })
            .catch((err) => {
                console.log('err in get all notes update is ', err);
            })
    }
    render() {
        return (
            <div>
                <div>
                    <Tooltip>
                        <PersonAddOutlinedIcon onClick={(event) => this.handleClick(event)} />
                    </Tooltip>
                </div>
                <MuiThemeProvider theme={theme}>
                    <div>
                        <Dialog open={this.state.anchorEl} className='createnote2' >
                            <DialogTitle>
                                Collaborators
                                </DialogTitle>
                            <Divider />
                            <div className="collaborator-name-email">
                                <span style={{ fontFamily: "Roboto arial sansSerif", paddingLeft: "10px" }}>
                                    (owner)</span>
                                <br />
                                {localStorage.getItem('email')}
                            </div>
                            <Divider />
                            <div className="secondCollab-secondAvatar">

                                {this.state.allCollaborators.map(col => {
                                    return (
                                        <div className="para-collab" col={col.userId}>
                                            {/* <Tooltip title={col}>
                                                <Avatar style={{
                                                    cursor: "pointer",
                                                    width: "35px", height: "35px"
                                                }}>
                                                    {col.toUpperCase().charAt(0, 5)}
                                                </Avatar>
                                            </Tooltip> */}
                                            {/* <span style={{ fontFamily: 'Roboto', marginLeft: '-175px' }}> */}
                                            <span>    {col.email}
                                            </span>
                                            <Divider/>
                                            {/* <ClearOutlinedIcon
                                                onClick={() => this.handleClear(col)} /> */}
                                        </div>
                                    )
                                })
                                }
                            </div>

                            <div className="edit-label-div">
                                <InputBase className="get-in2"
                                    fullWidth
                                    placeholder="person or email to share with"
                                    id="addperson"
                                    value={this.state.searchText}
                                    onKeyDown={this.handleTrueIcon}
                                    onChange={this.onChangeEmail}
                                // onKeyUp={this.handleSearch}
                                />
                                <div>
                                    <CreateOutlinedIcon onClick={() => this.handleUpdateLabel()} />
                                </div>
                            </div>
                            <Button onClick={() => this.handleDialogClose()}>
                                close
                        </Button>
                        </Dialog>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}
